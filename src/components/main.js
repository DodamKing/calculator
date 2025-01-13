import React, { useState, lazy, Suspense, useEffect, useRef, memo } from "react";
import { Menu, X, ChevronRight  } from 'lucide-react';
import { calculators, categories } from "./calculatorConfig";
import NotImplementedCalculator from "./notImple";

// 계산기 컴포넌트를 별도의 메모이즈된 컴포넌트로 분리
const CalculatorSection = memo(({ currentSection, showWelcome }) => {
    const WelcomeMessage = () => (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>환영합니다!</h2>
            <p>다양한 계산기를 한곳에 모아둔 편리한 서비스입니다.</p>
            <p>건강, 재정, 부동산, 취미까지 필요한 계산기를 위에서 선택해 보세요.</p>
        </div>
    );

    const getCurrentCalculatorName = () => {
        for (let category of categories) {
            for (let item of category.items) {
                if (item.section === currentSection) {
                    return item.name;
                }
            }
        }
        return "Unknown Calculator";
    };

    if (showWelcome) {
        return <WelcomeMessage />;
    }

    if (calculators[currentSection]) {
        const Calculator = lazy(() => calculators[currentSection].component());
        return (
            <Suspense fallback={<div>로딩 중...</div>}>
                <Calculator />
            </Suspense>
        );
    }
    
    return <NotImplementedCalculator name={getCurrentCalculatorName()} />;
});

// 모바일 메뉴 컴포넌트 분리
const MobileMenu = memo(({ 
    isMenuOpen, 
    menuRef, 
    categories, 
    activeDropdown, 
    currentSection,
    closeMenu, 
    toggleDropdown, 
    loadSection 
}) => {
    if (!isMenuOpen) return null;

    return (
        <>
            <div
                className={`mobile-menu-overlay ${isMenuOpen ? 'active' : ''}`}
                onClick={closeMenu}
            />
            
            <div
                ref={menuRef}
                className={`mobile-menu-container ${isMenuOpen ? 'active' : ''}`}
            >
                <div className="mobile-menu-header">
                    <h2>카테고리</h2>
                    <button onClick={closeMenu}>
                        <X size={20} />
                    </button>
                </div>

                <div className="mobile-menu-content">
                    {categories.map((category, index) => (
                        <div key={index} className="mobile-category-item">
                            <div
                                className={`mobile-category-header ${activeDropdown === index ? 'active' : ''}`}
                                onClick={(e) => toggleDropdown(index, e)}
                            >
                                <img
                                    src={category.image}
                                    alt={category.name}
                                />
                                <span>{category.name}</span>
                                <ChevronRight size={18} />
                            </div>
                            
                            <div className={`mobile-dropdown-items ${activeDropdown === index ? 'active' : ''}`}>
                                {category.items.map((item, itemIndex) => (
                                    <a
                                        href="#"
                                        key={itemIndex}
                                        onClick={(e) => loadSection(item.section, e)}
                                        className={`mobile-dropdown-item ${
                                            currentSection === item.section ? 'active' : ''
                                        }`}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
});

function Main() {
    const [currentSection, setCurrentSection] = useState(null);
    const [showWelcome, setShowWelcome] = useState(true);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const dropdownRefs = useRef([]);
    const menuRef = useRef(null);

    const loadSection = (section, e) => {
        if (e) {
            e.preventDefault();
        }

        setCurrentSection(section);
        setShowWelcome(false);
        setActiveDropdown(null);
        setIsMenuOpen(false);
        document.body.classList.remove('menu-open');
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        document.body.classList.remove('menu-open');
    };

    const toggleMenu = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setIsMenuOpen(prev => !prev);
        setActiveDropdown(null);
    };

    const toggleDropdown = (index, event) => {
        event.stopPropagation();
        setActiveDropdown(prevActive => prevActive === index ? null : index);
    };

    const handleMouseEnter = (index) => {
        if (!isMobile) {
            setActiveDropdown(index);
        }
    };

    const handleMouseLeave = (event, index) => {
        if (!isMobile) {
            const relatedTarget = event.relatedTarget;
            const dropdownContent = dropdownRefs.current[index]?.querySelector('.dropdown-content');
            if (dropdownContent && !dropdownContent.contains(relatedTarget)) {
                setActiveDropdown(null);
            }
        }
    };

    const getCurrentCalculatorName = () => {
        for (let category of categories) {
            for (let item of category.items) {
                if (item.section === currentSection) {
                    return item.name;
                }
            }
        }
        return "Unknown Calculator";
    };

    const renderCalculator = () => {
        if (showWelcome) {
            return <WelcomeMessage />;
        }
    
        if (calculators[currentSection]) {
            const Calculator = lazy(() => calculators[currentSection].component());
            return (
                <Suspense fallback={<div>로딩 중...</div>}>
                    <Calculator />
                </Suspense>
            );
        } else {
            return <NotImplementedCalculator name={getCurrentCalculatorName()} />;
        }
    };

    const WelcomeMessage = () => (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>환영합니다!</h2>
            <p>최고의 계산기 모음 사이트에 오신 것을 환영합니다.</p>
            <p>원하시는 계산기를 위의 카테고리에서 선택해주세요.</p>
        </div>
    );

    useEffect(() => {
        const handleResize = () => {
            const newIsMobile = window.innerWidth < 768;
            setIsMobile(newIsMobile);
            if (!newIsMobile) {
                setIsMenuOpen(false);
                document.body.classList.remove('menu-open');
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            document.body.classList.remove('menu-open');
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            // 메뉴 버튼과 오버레이 클릭은 제외
            const isMenuButton = event.target.closest('.mobile-menu-button');
            const isOverlay = event.target.closest('.mobile-menu-overlay');
            
            if (!isMenuButton && !isOverlay && menuRef.current && !menuRef.current.contains(event.target)) {
                closeMenu();
            }
        };
    
        // 메뉴가 열려있을 때만 이벤트 리스너 추가
        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
    
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    useEffect(() => {
        const handlePopState = (event) => {
            if (isMenuOpen) {
                closeMenu();
            }
        };
    
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [isMenuOpen]);

    useEffect(() => {
        if (isMenuOpen) {
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';
        } else {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }
    }, [isMenuOpen]);

    return (
        <div>
            <div className="container">
                <h1>최고의 계산기 모음 사이트</h1>

                <div className="categories-container">
                    {categories.map((category, index) => (
                        <div
                            className="dropdown"
                            key={index}
                            ref={el => dropdownRefs.current[index] = el}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={(e) => handleMouseLeave(e, index)}
                        >
                            <div className="category">
                                <img src={category.image} alt={category.name} />
                                <p>{category.name}</p>
                            </div>
                            {activeDropdown === index && (
                                <div className="dropdown-content">
                                    {category.items.map((item, itemIndex) => (
                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                loadSection(item.section);
                                            }}
                                            key={itemIndex}
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <button
                    className="mobile-menu-button"
                    onClick={toggleMenu}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <div
                    className={`mobile-menu-overlay ${isMenuOpen ? 'active' : ''}`}
                    onClick={closeMenu}
                />

                <MobileMenu 
                    isMenuOpen={isMenuOpen}
                    menuRef={menuRef}
                    categories={categories}
                    activeDropdown={activeDropdown}
                    currentSection={currentSection}
                    closeMenu={closeMenu}
                    toggleDropdown={toggleDropdown}
                    loadSection={loadSection}
                />

                <div id="calculator-section" className="section">
                    <CalculatorSection 
                        currentSection={currentSection}
                        showWelcome={showWelcome}
                    />
                </div>
            </div>
        </div>
    );
}

export default Main;