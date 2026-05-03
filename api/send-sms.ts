// SMS verification handler - Updated for redeployment
import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  const { phone } = request.body;

  if (!phone) {
    return response.status(400).json({ error: 'Phone number is required' });
  }

  // 1. 6자리 인증번호 생성
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

  // 2. CoolSMS 설정 (Vercel 환경 변수에서 가져옴)
  const apiKey = process.env.COOLSMS_API_KEY;
  const apiSecret = process.env.COOLSMS_API_SECRET;
  const rawFromNumber = process.env.COOLSMS_FROM_NUMBER; // 인증된 발신 번호

  const missingKeys = [];
  if (!apiKey) missingKeys.push('COOLSMS_API_KEY');
  if (!apiSecret) missingKeys.push('COOLSMS_API_SECRET');
  if (!rawFromNumber) missingKeys.push('COOLSMS_FROM_NUMBER');

  if (missingKeys.length > 0) {
    return response.status(400).json({ 
      error: `환경 변수 누락: ${missingKeys.join(', ')}를 Vercel에 추가해야 합니다.` 
    });
  }

  // 번호에서 하이픈 등 제거 (숫자만 남김)
  const to = phone.replace(/[^0-9]/g, '');
  const from = rawFromNumber!.replace(/[^0-9]/g, '');

  // 3. CoolSMS API 인증 시그니처 생성
  const date = new Date().toISOString();
  const salt = crypto.randomBytes(16).toString('hex');
  const signature = crypto
    .createHmac('sha256', apiSecret!)
    .update(date + salt)
    .digest('hex');

  const authHeader = `HMAC-SHA256 apiKey=${apiKey}, date=${date}, salt=${salt}, signature=${signature}`;

  try {
    // 4. CoolSMS 메시지 전송 요청
    const res = await fetch('https://api.coolsms.co.kr/messages/v4/send', {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: {
          to: to,
          from: from,
          text: `[모로서기] 인증번호 [${verificationCode}]를 입력해주세요.`,
          type: 'SMS'
        },
      }),
    });

    const result = await res.json();

    if (res.ok) {
      return response.status(200).json({ 
        success: true, 
        code: verificationCode 
      });
    } else {
      return response.status(500).json({ 
        error: 'SMS 발송 실패', 
        details: result 
      });
    }
  } catch (error) {
    return response.status(500).json({ error: 'Internal Server Error' });
  }
}
