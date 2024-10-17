import React, { useState, lazy, Suspense, useEffect, useRef } from "react";
import { calculators, categories } from "./calculatorConfig";
import NotImplementedCalculator from "./notImple";

function Main() {
    const [currentSection, setCurrentSection] = useState(null);
    const [showWelcome, setShowWelcome] = useState(true);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const dropdownRefs = useRef([]);

    const loadSection = (section) => {
        setCurrentSection(section);
        setShowWelcome(false);
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
            const Calculator = lazy(calculators[currentSection].component);
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
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            dropdownRefs.current.forEach((ref, index) => {
                if (ref && !ref.contains(event.target)) {
                    setActiveDropdown(prevActive => prevActive === index ? null : prevActive);
                }
            });
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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
                            <div 
                                className="category"
                                onClick={(e) => isMobile ? toggleDropdown(index, e) : null}
                            >
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
                                                e.stopPropagation();
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

                <div id="calculator-section" className="section">
                    {renderCalculator()}
                </div>
            </div>
        </div>
    );
}

export default Main;