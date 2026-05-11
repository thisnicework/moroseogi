import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HTMLFlipBook from 'react-pageflip';

const MAGAZINE_DATA = [
  {
    category: "Executive Producer & Project Manager",
    images: ["기획_1.jpg", "기획_2.jpg", "기획_3.jpg"]
  },
  {
    category: "Lighting Designer & Operator",
    images: ["조명_1.jpg", "조명_2.jpg"]
  },
  {
    category: "Music",
    images: ["음악_1.jpg", "음악_2.jpg"]
  },
  {
    category: "Photography",
    images: ["사진_1.jpg", "사진_2.jpg"]
  },
  {
    category: "Scenographer",
    images: ["시노_1.jpg", "시노_2.jpg", "시노_3.jpg"]
  },
  {
    category: "Software Developer",
    images: ["개발_1.jpg", "개발_2.jpg"]
  },
  {
    category: "Sound Designer & Operator",
    images: ["음향_1.jpg", "음향_2.jpg"]
  },
  {
    category: "Stage Manager",
    images: ["무감_1.jpg", "무감_2.jpg"]
  },
  {
    category: "Video Grapher",
    images: ["홍영_1.jpg", "홍영_2.jpg"]
  },
  {
    category: "Visual Creative",
    images: ["디자인_1.jpg", "디자인_2.jpg"]
  }
];

const Page = React.forwardRef<HTMLDivElement, any>((props, ref) => {
  return (
    <div className="page-element" ref={ref}>
      <div className="page-content">
        <div
          className={`page-image-split ${props.side}`}
          style={{ backgroundImage: `url("${encodeURI(props.image)}")` }}
        />
      </div>
    </div>
  );
});

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobile;
}

export default function MagazinePage() {
  const [selectedCategory, setSelectedCategory] = useState(MAGAZINE_DATA[0]);
  const [flipKey, setFlipKey] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const bookRef = useRef<any>(null);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleCategoryChange = (category: typeof MAGAZINE_DATA[0]) => {
    setSelectedCategory(category);
    setFlipKey(prev => prev + 1);
    setCurrentPage(0);
    setDropdownOpen(false);
  };

  const images = useMemo(() => {
    return selectedCategory.images.map(img => `/magazine/${selectedCategory.category}/${img}`);
  }, [selectedCategory]);

  const totalPages = images.length * 2;

  const onFlip = useCallback((e: any) => {
    setCurrentPage(e.data);
  }, []);

  const flipPrev = useCallback(() => {
    if (isMobile) {
      setCurrentPage(prev => Math.max(0, prev - 1));
    } else {
      bookRef.current?.pageFlip()?.flipPrev();
    }
  }, [isMobile]);

  const flipNext = useCallback(() => {
    if (isMobile) {
      setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
    } else {
      bookRef.current?.pageFlip()?.flipNext();
    }
  }, [isMobile, totalPages]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        flipPrev();
      } else if (e.key === 'ArrowRight') {
        flipNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [flipPrev, flipNext]);

  const isFirstSpread = isMobile ? currentPage <= 0 : currentPage <= 1;
  const isLastSpread = isMobile ? currentPage >= totalPages - 1 : currentPage >= totalPages - 2;

  return (
    <main className="page magazine-page">
      <div style={{ width: '100%', maxWidth: '75rem', margin: '0 auto' }}>
        <div className="mb-4">
          <button onClick={() => navigate(-1)} className="btn btn-outline">&larr; 돌아가기</button>
        </div>
      </div>
      <section className="hero" style={{ marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: 'none' }}>
        <h1>MAGAZINE</h1>
      </section>

      <div className="magazine-container">
        {/* Mobile: dropdown selector, Desktop: button grid */}
        {isMobile ? (
          <div className="category-dropdown-wrapper">
            <button
              className="category-dropdown-trigger"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span>{selectedCategory.category}</span>
              <span className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`}>▾</span>
            </button>
            {dropdownOpen && (
              <div className="category-dropdown-menu">
                {MAGAZINE_DATA.map((item) => (
                  <button
                    key={item.category}
                    className={`category-dropdown-item ${selectedCategory.category === item.category ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(item)}
                  >
                    {item.category}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="category-selector">
            {MAGAZINE_DATA.map((item) => (
              <button
                key={item.category}
                className={`category-btn ${selectedCategory.category === item.category ? 'active' : ''}`}
                onClick={() => handleCategoryChange(item)}
              >
                {item.category}
              </button>
            ))}
          </div>
        )}

        <div className="book-area">
          {!isMobile && (
            <button
              className={`book-nav-btn book-nav-prev ${isFirstSpread ? 'disabled' : ''}`}
              onClick={flipPrev}
              disabled={isFirstSpread}
              aria-label="이전 페이지"
            >
              ‹
            </button>
          )}

          <div className="book-wrapper">
            {isMobile ? (
              <div className="mobile-single-page-viewer" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <div
                  className={`page-image-split ${currentPage % 2 === 0 ? 'left' : 'right'}`}
                  style={{
                    backgroundImage: `url("${encodeURI(images[Math.floor(currentPage / 2)])}")`,
                    width: '100%',
                    aspectRatio: '4961 / 7016',
                    maxWidth: '500px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                />
              </div>
            ) : (
              <HTMLFlipBook
                key={flipKey}
                ref={bookRef}
                width={500}
                height={700}
                size="stretch"
                minWidth={150}
                maxWidth={1000}
                minHeight={210}
                maxHeight={1400}
                maxShadowOpacity={0.5}
                showCover={false}
                startPage={1}
                mobileScrollSupport={true}
                onFlip={onFlip}
                flippingTime={600}
                useMouseEvents={true}
                swipeDistance={20}
                showPageCorners={true}
                usePortrait={true}
                className="magazine-book"
              >
                {images.flatMap((image, index) => [
                  <Page key={`${index}-left`} image={image} side="left" number={index * 2 + 1} />,
                  <Page key={`${index}-right`} image={image} side="right" number={index * 2 + 2} />
                ])}
              </HTMLFlipBook>
            )}
          </div>

          {!isMobile && (
            <button
              className={`book-nav-btn book-nav-next ${isLastSpread ? 'disabled' : ''}`}
              onClick={flipNext}
              disabled={isLastSpread}
              aria-label="다음 페이지"
            >
              ›
            </button>
          )}
        </div>

        {isMobile && (
          <div className="mobile-nav-bar">
            <button
              className={`book-nav-btn book-nav-prev ${isFirstSpread ? 'disabled' : ''}`}
              onClick={flipPrev}
              disabled={isFirstSpread}
              aria-label="이전 페이지"
            >
              ‹
            </button>
            <div style={{ 
              fontSize: '1rem', 
              fontWeight: '600', 
              color: 'var(--purple)', 
              minWidth: '3.5rem', 
              textAlign: 'center' 
            }}>
              {currentPage + 1} / {totalPages}
            </div>
            <button
              className={`book-nav-btn book-nav-next ${isLastSpread ? 'disabled' : ''}`}
              onClick={flipNext}
              disabled={isLastSpread}
              aria-label="다음 페이지"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
