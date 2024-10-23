import React, { useState, useEffect } from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';

const PropertyTaxCalculator = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [propertyValue, setPropertyValue] = useState('');
    const [householdCount, setHouseholdCount] = useState('1');
    const [isFirstHome, setIsFirstHome] = useState(false);
    const [hasOtherProperties, setHasOtherProperties] = useState(false);
    const [result, setResult] = useState(null);
    const [showHelp, setShowHelp] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleHouseholdCountChange = (e) => {
        const count = e.target.value;
        setHouseholdCount(count);
        // 다주택자 선택시 1세대 1주택 해제
        if (count !== '1') {
            setIsFirstHome(false);
            setHasOtherProperties(false); // 다주택자는 다른 부동산 여부 불필요
        }
    };

    const handleFirstHomeChange = (e) => {
        const isChecked = e.target.checked;
        setIsFirstHome(isChecked);
        if (isChecked) {
            setHouseholdCount('1'); // 1주택으로 변경
            setHasOtherProperties(false); // 다른 부동산 없음으로 변경
        }
    };

    const handleOtherPropertiesChange = (e) => {
        const isChecked = e.target.checked;
        setHasOtherProperties(isChecked);
        if (isChecked) {
            setIsFirstHome(false); // 다른 부동산 있으면 1세대 1주택 해제
            setHouseholdCount('1'); // 1주택으로 유지
        }
    };

    const calculateTax = () => {
        const value = parseFloat(propertyValue) || 0;
        let propertyTax = 0;
        let comprehensiveTax = 0;
        const isEligibleForFirstHomeReduction = isFirstHome && householdCount === '1' && !hasOtherProperties;
    
        // 1. 재산세 기본세율 계산
        if (value <= 60000000) {
            propertyTax = value * 0.001;
        } else if (value <= 150000000) {
            propertyTax = 60000 + (value - 60000000) * 0.0015;
        } else if (value <= 300000000) {
            propertyTax = 195000 + (value - 150000000) * 0.002;
        } else {
            propertyTax = 495000 + (value - 300000000) * 0.004;
        }
    
        // 2. 다주택자 중과세율과 1세대 1주택 감면 적용
        if (householdCount === '2') {
            propertyTax *= 1.2; // 2주택자 20% 중과
        } else if (householdCount === '3') {
            propertyTax *= 1.4; // 3주택 이상 40% 중과
        } else if (isEligibleForFirstHomeReduction) {
            propertyTax *= 0.5; // 1세대 1주택 50% 감면
        }
    
        // 3. 종합부동산세 계산
        let taxBase;
        if (isEligibleForFirstHomeReduction) {
            taxBase = 1100000000; // 11억원 (1세대 1주택)
        } else if (householdCount === '1') {
            taxBase = 900000000;  // 9억원 (일반 1주택)
        } else {
            taxBase = 600000000;  // 6억원 (다주택자)
        }
    
        if (value > taxBase) {
            let taxableValue = value - taxBase;
    
            // 구간별 누진세율 적용
            if (taxableValue <= 300000000) {
                comprehensiveTax = taxableValue * 0.006;
            } else if (taxableValue <= 600000000) {
                comprehensiveTax = 1800000 + (taxableValue - 300000000) * 0.008;
            } else if (taxableValue <= 1200000000) {
                comprehensiveTax = 4200000 + (taxableValue - 600000000) * 0.012;
            } else if (taxableValue <= 2500000000) {
                comprehensiveTax = 11400000 + (taxableValue - 1200000000) * 0.016;
            } else if (taxableValue <= 5000000000) {
                comprehensiveTax = 32200000 + (taxableValue - 2500000000) * 0.02;
            } else {
                comprehensiveTax = 82200000 + (taxableValue - 5000000000) * 0.025;
            }
    
            // 다주택자 중과세율과 1세대 1주택 감면 적용
            if (householdCount === '2') {
                comprehensiveTax *= 1.2; // 2주택자 20% 중과
            } else if (householdCount === '3') {
                comprehensiveTax *= 1.4; // 3주택 이상 40% 중과
            } else if (isEligibleForFirstHomeReduction) {
                comprehensiveTax *= 0.8; // 1세대 1주택 20% 감면
            }
        }
    
        // 4. 지방교육세와 도시지역분
        const localEducationTax = propertyTax * 0.2;
        const cityTax = propertyTax * 0.0014;
    
        const totalTax = propertyTax + comprehensiveTax + localEducationTax + cityTax;
    
        setResult({
            details: {
                propertyTax: Math.round(propertyTax),
                comprehensiveTax: Math.round(comprehensiveTax),
                localEducationTax: Math.round(localEducationTax),
                cityTax: Math.round(cityTax),
                totalTax: Math.round(totalTax)
            },
            taxRates: {
                propertyTaxRate: (propertyTax / value * 100).toFixed(3),
                comprehensiveTaxRate: (comprehensiveTax / value * 100).toFixed(3),
                effectiveTaxRate: (totalTax / value * 100).toFixed(3)
            }
        });
    };

    const formatNumber = (num) => {
        return num.toLocaleString('ko-KR');
    };

    const renderSummaryResults = () => {
        if (!result) return null;
    
        const { details } = result;
        const chartData = [
            { name: '재산세', value: details.propertyTax, fill: '#4CAF50' },
            { name: '종합부동산세', value: details.comprehensiveTax, fill: '#2196F3' },
            { name: '지방교육세', value: details.localEducationTax, fill: '#FFC107' },
            { name: '도시지역분', value: details.cityTax, fill: '#FF5722' }
        ].filter(item => item.value > 0);

        // 커스텀 라벨 렌더링
        const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
            const CHART_CONFIG = {
                mobile: {
                    height: 250,
                    innerRadius: 40,
                    outerRadius: 60,
                    labelRadius: 1.2
                },
                desktop: {
                    height: 350,
                    innerRadius: 60,
                    outerRadius: 80,
                    labelRadius: 1.35
                }
            };
            
            const RADIAN = Math.PI / 180;
            const radius = outerRadius * (isMobile ? CHART_CONFIG.mobile.labelRadius : CHART_CONFIG.desktop.labelRadius);
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);
            const name = chartData[index].name;

            const label = isMobile 
                        ? `${(percent * 100).toFixed(1)}%`
                        : `${name} (${(percent * 100).toFixed(1)}%)`;

            return (
                <text 
                    x={x} 
                    y={y} 
                    textAnchor={x > cx ? 'start' : 'end'} 
                    dominantBaseline="middle"
                    fill="#1A237E"
                    fontSize="12"
                >
                    {label}
                </text>
            );
        };
    
        return (
            <div style={styles.summaryResultContainer}>
                <h3 style={styles.resultTitle}>보유세 분석 요약</h3>
                <div style={styles.chartContainer}>
                    <ResponsiveContainer width="100%" height={ 300 }>
                        <PieChart>
                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={60}  // 도넛 차트 스타일
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={5}
                                labelLine={true}
                                label={renderCustomizedLabel}
                            >
                                {chartData.map((entry, index) => (
                                    <Cell 
                                        key={`cell-${index}`} 
                                        fill={entry.fill}
                                        stroke="#fff"
                                        strokeWidth={2}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div style={styles.summaryContainer}>
                    <div style={styles.taxBreakdown}>
                        {chartData.map((item, index) => (
                            <div key={index} style={styles.taxItem}>
                                <div style={styles.taxLegend}>
                                    <div style={{
                                        width: 12,
                                        height: 12,
                                        backgroundColor: item.fill,
                                        marginRight: 8,
                                        borderRadius: 2
                                    }} />
                                    <span>{item.name}</span>
                                </div>
                                <span style={styles.taxValue}>{formatNumber(item.value)}원</span>
                            </div>
                        ))}
                    </div>
                    <hr style={styles.divider} />
                    <div style={styles.summaryItem}>
                        <span style={styles.summaryLabel}>총 보유세액:</span>
                        <span style={styles.summaryValue}>{formatNumber(details.totalTax)}원</span>
                    </div>
                    <div style={styles.summaryItem}>
                        <span style={styles.summaryLabel}>실효세율:</span>
                        <span style={styles.summaryValue}>{result.taxRates.effectiveTaxRate}%</span>
                    </div>
                    <div style={styles.summaryItem}>
                        <span style={styles.summaryLabel}>재산세율:</span>
                        <span style={styles.summaryValue}>{result.taxRates.propertyTaxRate}%</span>
                    </div>
                    <div style={styles.summaryItem}>
                        <span style={styles.summaryLabel}>종부세율:</span>
                        <span style={styles.summaryValue}>{result.taxRates.comprehensiveTaxRate}%</span>
                    </div>
                </div>
            </div>
        );
    };

    const Tooltip = ({ text }) => {
        const [isVisible, setIsVisible] = useState(false);
    
        const handleTooltipClick = (e) => {
            e.preventDefault();  // 라벨 클릭 이벤트 전파 방지
            e.stopPropagation();  // 이벤트 버블링 방지
            setIsVisible(!isVisible);
        };
    
        return (
            <div 
                style={styles.tooltipContainer}
                onClick={handleTooltipClick}
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
            >
                <span style={styles.tooltipIcon}>ℹ️</span>
                <span style={{
                    ...styles.tooltipText,
                    visibility: isVisible ? 'visible' : 'hidden',
                    opacity: isVisible ? 1 : 0,
                }}>
                    {text}
                </span>
            </div>
        );
    };

    const styles = {
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: isMobile ? '15px' : '30px',
            backgroundColor: '#F0F7FF', // 세금 계산기에 맞는 차분한 블루
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Arial, sans-serif',
        },
        title: {
            textAlign: 'center',
            color: '#1A237E',
            marginBottom: '20px',
            fontSize: isMobile ? '24px' : '28px',
        },
        form: {
            display: 'grid',
            gap: '15px',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
        },
        label: {
            display: 'block',
            marginBottom: '5px',
            color: '#1A237E',
            fontSize: '14px',
            fontWeight: 'bold',
        },
        input: {
            width: '100%',
            padding: '10px',
            border: '1px solid #C5CAE9',
            borderRadius: '5px',
            fontSize: '16px',
            boxSizing: 'border-box',
        },
        select: {
            width: '100%',
            padding: '10px',
            border: '1px solid #C5CAE9',
            borderRadius: '5px',
            fontSize: '16px',
            backgroundColor: 'white',
            boxSizing: 'border-box',
        },
        checkboxGroup: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
        },
        checkbox: {
            marginRight: '5px',
        },
        button: {
            gridColumn: '1 / -1',
            padding: '12px',
            backgroundColor: '#3F51B5',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '18px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
        },
        resultContainer: {
            marginTop: '20px',
            padding: '15px',
            backgroundColor: 'white',
            borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
        summaryResultContainer: {
            marginTop: '20px',
            padding: '15px',
            backgroundColor: 'white',
            borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
        resultTitle: {
            color: '#1A237E',
            fontSize: '20px',
            marginBottom: '15px',
        },
        chartContainer: {
            height: isMobile ? '300px' : '400px',
            marginBottom: '20px',
        },
        summaryContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
        },
        summaryItem: {
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '16px',
            padding: '10px 0',
            borderBottom: '1px solid #C5CAE9',
        },
        summaryLabel: {
            fontWeight: 'bold',
            color: '#1A237E',
        },
        summaryValue: {
            color: '#3F51B5',
            fontWeight: 'bold',
        },
        infoSection: {
            marginTop: '20px',
            padding: '15px',
            backgroundColor: 'white',
            borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
        infoTitle: {
            fontWeight: 'bold',
            color: '#1A237E',
            marginBottom: '10px',
            fontSize: '18px',
        },
        infoContent: {
            color: '#1A237E',
            fontSize: '14px',
            lineHeight: '1.6',
        },
        helpToggle: {
            marginBottom: '20px',
            textAlign: 'right',
        },
        helpButton: {
            padding: '8px 16px',
            backgroundColor: 'transparent',
            border: '1px solid #3F51B5',
            color: '#3F51B5',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px',
        },
        helpSection: {
            backgroundColor: '#F8F9FE',
            padding: '20px',
            marginBottom: '20px',
            borderRadius: '5px',
            border: '1px solid #E8EAF6',
        },
        helpTitle: {
            color: '#1A237E',
            fontSize: '16px',
            marginBottom: '10px',
        },
        tooltip: {
            display: 'inline-block',
            marginLeft: '5px',
            position: 'relative',
            cursor: 'help',
        },
        tooltipText: {
            visibility: 'hidden',
            backgroundColor: '#1A237E',
            color: 'white',
            textAlign: 'center',
            padding: '8px 12px',
            borderRadius: '6px',
            position: 'absolute',
            width: '250px', // 모든 툴팁 너비 통일
            bottom: '125%',
            left: '50%',
            transform: 'translateX(-50%)', // 중앙 정렬을 위한 transform 추가
            fontSize: '12px',
            opacity: 0,
            transition: 'opacity 0.3s', // 부드러운 표시/숨김 효과
        },
        tooltipContainer: {
            position: 'relative',
            display: 'inline-block',
            '&:hover > span': {
                visibility: 'visible',
                opacity: 1,
            },
        },
        checkboxContainer: {
            gridColumn: '1 / -1',  // 체크박스는 항상 전체 너비 사용
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            marginTop: '10px',
        },
        helperText: {
            fontSize: '12px',
            color: '#666',
            marginTop: '5px',
            paddingLeft: '24px',
        },
        inputGroup: {
            marginBottom: '15px',
        },
        checkboxLabel: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            color: '#1A237E',
        },
        tooltipWrapper: {
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
        },
        disabledText: {
            color: '#999',
            fontSize: '12px',
            marginLeft: '8px',
        },
        checkboxSection: {
            marginBottom: '10px',
        },
        checkboxWrapper: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
        },
        taxBreakdown: {
            marginBottom: 20,
        },
        taxItem: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 0',
        },
        taxLegend: {
            display: 'flex',
            alignItems: 'center',
            fontSize: 14,
        },
        taxValue: {
            fontWeight: 'bold',
            color: '#1A237E',
        },
        divider: {
            margin: '20px 0',
            border: 'none',
            borderTop: '1px solid #E0E0E0',
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>부동산 보유세 계산기</h2>
            <div style={styles.helpToggle}>
                <button
                    onClick={() => setShowHelp(!showHelp)}
                    style={styles.helpButton}
                >
                    계산기 사용 안내
                </button>
            </div>

            {showHelp && (
                <div style={styles.helpSection}>
                    <h3 style={styles.helpTitle}>보유세 계산 안내</h3>
                    <div style={styles.helpContent}>
                        <h4>주요 개념</h4>
                        <ul>
                            <li><strong>1세대 1주택:</strong> 세대 구성원이 주택을 1채만 보유한 경우입니다. 상가나 토지 등 다른 부동산을 보유해도 1주택자이지만, 1세대 1주택 감면 혜택은 받을 수 없습니다.</li>
                            <li><strong>다주택자:</strong> 2주택 이상 보유 시 중과세율이 적용됩니다. (2주택 20%, 3주택 이상 40%)</li>
                            <li><strong>종부세 기준금액:</strong> 1세대 1주택 11억원, 일반 1주택 9억원, 다주택자 6억원</li>
                        </ul>
                    </div>
                </div>
            )}

            <div style={styles.form}>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>
                        주택 공시가격 (원)
                        <Tooltip text="국토교통부에서 공시한 주택가격을 입력해주세요." />
                    </label>
                    <input
                        type="number"
                        value={propertyValue}
                        onChange={(e) => setPropertyValue(e.target.value)}
                        style={styles.input}
                        placeholder="예: 900000000"
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>
                        보유 주택 수
                        <Tooltip text="세대 구성원이 보유한 총 주택 수" />
                    </label>
                    <select
                        value={householdCount}
                        onChange={handleHouseholdCountChange}
                        style={styles.select}
                    >
                        <option value="1">1주택</option>
                        <option value="2">2주택</option>
                        <option value="3">3주택 이상</option>
                    </select>
                </div>

                <div style={styles.checkboxContainer}>
                    <div style={styles.checkboxSection}>
                        <div style={styles.checkboxWrapper}>
                            <input
                                type="checkbox"
                                checked={isFirstHome}
                                onChange={handleFirstHomeChange}
                                disabled={householdCount !== '1' || hasOtherProperties}
                                style={styles.checkbox}
                                id="firstHome"
                            />
                            <label htmlFor="firstHome" style={styles.checkboxLabel}>
                                1세대 1주택
                                <Tooltip text="세대 구성원 전체가 이 주택만을 소유한 경우 선택" />
                            </label>
                        </div>
                        {householdCount !== '1' && (
                            <div style={styles.disabledText}>* 1주택자만 선택 가능</div>
                        )}
                    </div>

                    <div style={styles.checkboxSection}>
                        <div style={styles.checkboxWrapper}>
                            <input
                                type="checkbox"
                                checked={hasOtherProperties}
                                onChange={handleOtherPropertiesChange}
                                disabled={householdCount !== '1'}
                                style={styles.checkbox}
                                id="otherProperties"
                            />
                            <label htmlFor="otherProperties" style={styles.checkboxLabel}>
                                다른 부동산 보유
                                <Tooltip text="주택 외 상가, 토지 등을 보유한 경우 선택" />
                            </label>
                        </div>
                        {householdCount !== '1' && (
                            <div style={styles.disabledText}>* 1주택자만 선택 가능</div>
                        )}
                    </div>
                </div>

                <button onClick={calculateTax} style={styles.button}>세금 계산하기</button>
            </div>
            {renderSummaryResults()}
            <div style={styles.infoSection}>
                <h3 style={styles.infoTitle}>보유세 안내</h3>
                <div style={styles.infoContent}>
                    <div style={styles.infoBlock}>
                        <h4 style={styles.subTitle}>보유세의 구성</h4>
                        <p><strong>재산세:</strong> 부동산 보유에 대해 지방자치단체가 부과하는 기본 세금입니다.</p>
                        <p><strong>종합부동산세:</strong> 고액의 부동산 보유자에게 부과되는 국세입니다.</p>
                        <p><strong>지방교육세:</strong> 재산세액의 20%가 부과됩니다.</p>
                        <p><strong>도시지역분:</strong> 도시지역 내 부동산에 대해 재산세액의 0.14%가 부과됩니다.</p>
                    </div>

                    <div style={styles.infoBlock}>
                        <h4 style={styles.subTitle}>과세 기준</h4>
                        <p><strong>재산세 기준:</strong></p>
                        <ul style={styles.taxRateList}>
                            <li>6천만원 이하: 0.1%</li>
                            <li>6천만원 초과 1.5억원 이하: 0.15%</li>
                            <li>1.5억원 초과 3억원 이하: 0.2%</li>
                            <li>3억원 초과: 0.4%</li>
                        </ul>

                        <p><strong>종합부동산세 기준:</strong></p>
                        <ul style={styles.taxRateList}>
                            <li>과세기준금액 초과 ~ 3억원: 0.6%</li>
                            <li>3억원 초과 6억원 이하: 0.8%</li>
                            <li>6억원 초과 12억원 이하: 1.2%</li>
                            <li>12억원 초과 25억원 이하: 1.6%</li>
                            <li>25억원 초과 50억원 이하: 2.0%</li>
                            <li>50억원 초과: 2.5%</li>
                        </ul>
                    </div>

                    <div style={styles.infoBlock}>
                        <h4 style={styles.subTitle}>주요 감면 제도</h4>
                        <ul style={styles.considerationList}>
                            <li><strong>1세대 1주택 공제:</strong> 재산세 50% 감면, 종부세 과세기준액 상향(11억원)</li>
                            <li><strong>장기보유 공제:</strong> 보유기간에 따라 재산세 최대 50% 감면</li>
                            <li><strong>고령자 공제:</strong> 연령에 따른 재산세 감면</li>
                            <li><strong>일시적 2주택자:</strong> 종전 주택 처분조건부 1주택 혜택</li>
                        </ul>
                    </div>

                    <div style={styles.infoBlock}>
                        <h4 style={styles.subTitle}>과세 특징</h4>
                        <ul style={styles.considerationList}>
                            <li>과세기준일: 매년 6월 1일 기준</li>
                            <li>재산세 납부: 7월(1/2), 9월(1/2) 분할납부</li>
                            <li>종부세 납부: 12월(연 1회)</li>
                            <li>공시가격: 매년 변동될 수 있으며, 세금 계산의 기준이 됨</li>
                        </ul>
                    </div>

                    <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #C5CAE9' }} />

                    <div style={styles.cautionBlock}>
                        <p style={{ color: '#e74c3c', fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>
                            * 유의사항
                        </p>
                        <ul style={styles.cautionList}>
                            <li>본 계산기는 참고용이며, 실제 세금은 과세관청의 산정 기준에 따라 달라질 수 있습니다.</li>
                            <li>세율과 과세기준은 정부 정책에 따라 변경될 수 있습니다.</li>
                            <li>지역별로 적용되는 세율과 감면 제도가 다를 수 있습니다.</li>
                            <li>정확한 세금 산정을 위해서는 관할 세무서나 전문가와 상담하시기를 권장합니다.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyTaxCalculator;