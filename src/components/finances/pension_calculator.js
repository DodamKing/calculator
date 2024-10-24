import React, { useState, useEffect } from 'react';
import { PiggyBank, TrendingUp, Calendar, Coins, ShieldCheck, AlertCircle } from 'lucide-react';

const PensionCalculator = () => {
    const [monthlyDeposit, setMonthlyDeposit] = useState('');
    const [expectedReturn, setExpectedReturn] = useState('');
    const [years, setYears] = useState('');
    const [currentAge, setCurrentAge] = useState('');
    const [inflation, setInflation] = useState('2');  // 기본 물가상승률 2%
    const [totalSavings, setTotalSavings] = useState(null);
    const [monthlyPension, setMonthlyPension] = useState(null);
    const [totalDeposit, setTotalDeposit] = useState(null);
    const [realValueSavings, setRealValueSavings] = useState(null);
    const [realMonthlyPension, setRealMonthlyPension] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [showAdvanced, setShowAdvanced] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const calculatePension = () => {
        const deposit = parseFloat(monthlyDeposit);
        const rate = parseFloat(expectedReturn) / 100 / 12;
        const inflationRate = parseFloat(inflation) / 100;
        const totalMonths = parseFloat(years) * 12;

        if (deposit > 0 && rate > 0 && totalMonths > 0) {
            // 명목 금액 계산 (기본 복리 계산)
            const nominalAmount = deposit * ((Math.pow(1 + rate, totalMonths) - 1) / rate) * (1 + rate);
            const totalDeposited = deposit * totalMonths;

            // 실질 금액 계산 (물가상승률 반영)
            const realAmount = nominalAmount / Math.pow(1 + inflationRate, years);

            // 월 연금액 계산 (20년 기준)
            const monthlyNominal = nominalAmount / (20 * 12);
            const monthlyReal = realAmount / (20 * 12);

            setTotalSavings(nominalAmount.toFixed(0));
            setMonthlyPension(monthlyNominal.toFixed(0));
            setTotalDeposit(totalDeposited.toFixed(0));
            setRealValueSavings(realAmount.toFixed(0));
            setRealMonthlyPension(monthlyReal.toFixed(0));
        } else {
            setTotalSavings(null);
            setMonthlyPension(null);
            setTotalDeposit(null);
            setRealValueSavings(null);
            setRealMonthlyPension(null);
        }
    };

    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const explanations = [
        {
            icon: <AlertCircle size={20} />,
            title: "계산 방식 설명",
            text: "이 계산기는 복리 계산의 기본 공식인 FV = PMT × (((1 + r)^n - 1) / r) × (1 + r)을 사용합니다. 여기서 FV는 최종 적립금액, PMT는 월 납입금액, r은 월 수익률, n은 총 납입 개월 수입니다."
        },
        {
            icon: <Coins size={20} />,
            title: "물가상승률 반영",
            text: "실질 가치는 물가상승률을 반영하여 계산됩니다. 현재 가치로 환산된 금액을 보여줌으로써 실제 구매력을 파악할 수 있습니다."
        },
        {
            icon: <TrendingUp size={20} />,
            title: "수익률 가정",
            text: "입력한 예상 수익률은 모든 기간 동안 일정하다고 가정합니다. 실제로는 시장 상황에 따라 변동될 수 있으므로, 보수적인 추정치를 사용하는 것이 좋습니다."
        },
        {
            icon: <ShieldCheck size={20} />,
            title: "세금 효과",
            text: "연금저축의 경우 연 납입금액 중 최대 400만원까지 13.2%~16.5%의 세액공제 혜택이 있습니다. 수령 시에는 연금소득세가 적용되며, 이는 수령 방법과 기간에 따라 달라집니다."
        }
    ];

    const tips = [
        {
            icon: <PiggyBank size={20} />,
            text: "일찍 시작할수록 복리효과가 커집니다. 적은 금액이라도 꾸준히 저축하세요."
        },
        {
            icon: <TrendingUp size={20} />,
            text: "장기 투자의 경우 분산 투자로 안정적인 수익률을 추구하세요."
        },
        {
            icon: <Calendar size={20} />,
            text: "은퇴 후 예상 생활비를 고려하여 저축 목표를 설정하세요."
        },
        {
            icon: <Coins size={20} />,
            text: "연금저축 비용에 대해 세액공제 혜택을 받을 수 있습니다."
        },
        {
            icon: <ShieldCheck size={20} />,
            text: "국민연금, 퇴직연금과 함께 개인연금으로 3층 연금 체계를 구축하세요."
        }
    ];

    const styles = {
        container: {
            margin: '0 auto',
            padding: isMobile ? '15px' : '30px',
            backgroundColor: '#E3F2FD',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Arial, sans-serif',
        },
        title: {
            textAlign: 'center',
            color: '#0277BD',
            marginBottom: '20px',
            fontSize: isMobile ? '24px' : '28px',
        },
        form: {
            display: 'grid',
            gap: '15px',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        },
        fullWidth: {
            gridColumn: '1 / -1',
        },
        label: {
            display: 'block',
            marginBottom: '5px',
            color: '#0277BD',
            fontSize: '14px',
        },
        input: {
            width: '100%',
            padding: '10px',
            border: '1px solid #4FC3F7',
            borderRadius: '5px',
            fontSize: '16px',
            boxSizing: 'border-box',
        },
        button: {
            gridColumn: '1 / -1',
            padding: '12px',
            backgroundColor: '#0277BD',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '18px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
        },
        // 결과 섹션 스타일
        resultContainer: {
            marginTop: '20px',
            padding: '25px',
            backgroundColor: '#FFF',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
        resultGrid: {
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '20px',
            marginTop: '15px',
        },
        resultCard: {
            backgroundColor: '#F5FCFF',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #E1F5FE',
            transition: 'transform 0.2s, box-shadow 0.2s',
        },
        resultLabel: {
            color: '#0277BD',
            fontSize: '14px',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
        },
        resultValue: {
            color: '#0277BD',
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '5px',
        },
        resultCompare: {
            fontSize: '14px',
            color: '#666',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
        },
        resultHeader: {
            color: '#0277BD',
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '15px',
            textAlign: 'center',
        },
        // 정보 섹션 스타일
        infoSection: {
            marginTop: '20px',
        },
        infoItem: {
            backgroundColor: '#FFF',
            borderRadius: '5px',
            padding: '20px',
            marginBottom: '10px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
        infoTitle: {
            fontWeight: 'bold',
            color: '#0277BD',
            marginBottom: '15px',
            fontSize: '18px',
        },
        tipsList: {
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
        },
        tipItem: {
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            padding: '10px',
            backgroundColor: '#F5FCFF',
            borderRadius: '8px',
            transition: 'transform 0.2s',
            cursor: 'pointer',
        },
        tipIcon: {
            color: '#0277BD',
            flexShrink: 0,
            marginTop: '2px',
        },
        tipText: {
            color: '#333',
            fontSize: '14px',
            lineHeight: '1.5',
        },
        // 추가 기능 섹션 스타일
        advancedToggle: {
            color: '#0277BD',
            cursor: 'pointer',
            textDecoration: 'underline',
            marginTop: '10px',
            display: 'inline-block',
        },
        explanationSection: {
            marginTop: '20px',
            backgroundColor: '#FFF',
            padding: '20px',
            borderRadius: '5px',
        },
        explanationTitle: {
            color: '#0277BD',
            fontWeight: 'bold',
            fontSize: '16px',
            marginBottom: '10px',
        },
        explanationItem: {
            display: 'flex',
            gap: '12px',
            marginBottom: '15px',
            padding: '15px',
            backgroundColor: '#F5FCFF',
            borderRadius: '8px',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>연금 계산기</h2>
            <div style={styles.form}>
                <div style={styles.fullWidth}>
                    <label style={styles.label}>월 저축액 (원)</label>
                    <input
                        type="number"
                        value={monthlyDeposit}
                        onChange={(e) => setMonthlyDeposit(e.target.value)}
                        style={styles.input}
                        placeholder="예: 500000"
                    />
                </div>
                <div>
                    <label style={styles.label}>현재 나이</label>
                    <input
                        type="number"
                        value={currentAge}
                        onChange={(e) => setCurrentAge(e.target.value)}
                        style={styles.input}
                        placeholder="예: 30"
                    />
                </div>
                <div>
                    <label style={styles.label}>저축 기간 (년)</label>
                    <input
                        type="number"
                        value={years}
                        onChange={(e) => setYears(e.target.value)}
                        style={styles.input}
                        placeholder="예: 30"
                    />
                </div>
                <div>
                    <label style={styles.label}>예상 연수익률 (%)</label>
                    <input
                        type="number"
                        value={expectedReturn}
                        onChange={(e) => setExpectedReturn(e.target.value)}
                        style={styles.input}
                        placeholder="예: 5"
                    />
                </div>
                {showAdvanced && (
                    <div>
                        <label style={styles.label}>예상 물가상승률 (%)</label>
                        <input
                            type="number"
                            value={inflation}
                            onChange={(e) => setInflation(e.target.value)}
                            style={styles.input}
                            placeholder="예: 2"
                        />
                    </div>
                )}
                <button onClick={calculatePension} style={styles.button}>연금 계산하기</button>
            </div>
            <div style={styles.advancedToggle} onClick={() => setShowAdvanced(!showAdvanced)}>
                {showAdvanced ? '기본 설정 보기' : '고급 설정 보기'}
            </div>
            {totalSavings && (
                <div style={styles.resultContainer}>
                    <div style={styles.resultHeader}>
                        예상 연금 시뮬레이션 결과
                    </div>
                    <div style={styles.resultGrid}>
                        <div
                            style={styles.resultCard}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 6px 12px rgba(2, 119, 189, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={styles.resultLabel}>
                                <Coins size={20} />
                                총 적립금
                            </div>
                            <div style={styles.resultValue}>{formatNumber(totalSavings)}원</div>
                            <div style={styles.resultCompare}>
                                총 납입금 대비 {Math.round((totalSavings / totalDeposit - 1) * 100)}% 수익
                            </div>
                        </div>

                        <div
                            style={styles.resultCard}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 6px 12px rgba(2, 119, 189, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={styles.resultLabel}>
                                <TrendingUp size={20} />
                                실질 가치 적립금
                            </div>
                            <div style={styles.resultValue}>{formatNumber(realValueSavings)}원</div>
                            <div style={styles.resultCompare}>
                                물가상승률 반영 실제 가치
                            </div>
                        </div>

                        <div
                            style={styles.resultCard}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 6px 12px rgba(2, 119, 189, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={styles.resultLabel}>
                                <Calendar size={20} />
                                월 예상 연금
                            </div>
                            <div style={styles.resultValue}>{formatNumber(monthlyPension)}원</div>
                            <div style={styles.resultCompare}>
                                20년 수령 기준
                            </div>
                        </div>

                        <div
                            style={styles.resultCard}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 6px 12px rgba(2, 119, 189, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={styles.resultLabel}>
                                <PiggyBank size={20} />
                                실질 월 연금
                            </div>
                            <div style={styles.resultValue}>{formatNumber(realMonthlyPension)}원</div>
                            <div style={styles.resultCompare}>
                                물가상승률 반영 실제 가치
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div style={styles.explanationSection}>
                <div style={styles.explanationTitle}>계산 방식 설명</div>
                {explanations.map((exp, index) => (
                    <div key={index} style={styles.explanationItem}>
                        <div style={styles.tipIcon}>{exp.icon}</div>
                        <div>
                            <strong>{exp.title}</strong>
                            <p style={styles.tipText}>{exp.text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div style={styles.infoSection}>
                <div style={styles.infoItem}>
                    <div style={styles.infoTitle}>연금 저축 꿀팁</div>
                    <div style={styles.tipsList}>
                        {tips.map((tip, index) => (
                            <div
                                key={index}
                                style={styles.tipItem}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateX(8px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateX(0)';
                                }}
                            >
                                <div style={styles.tipIcon}>{tip.icon}</div>
                                <div style={styles.tipText}>{tip.text}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PensionCalculator;