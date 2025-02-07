import React, { useState, useEffect } from 'react';
import { Info, Calculator, TrendingUp, Calendar, PiggyBank, AlertCircle, DollarSign } from 'lucide-react';

const LoanRepaymentCalculator = () => {
    const [loanAmount, setLoanAmount] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [loanTerm, setLoanTerm] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState(null);
    const [totalPayment, setTotalPayment] = useState(null);
    const [totalInterest, setTotalInterest] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const calculateMonthlyPayment = () => {
        const principal = parseFloat(loanAmount);
        const rate = parseFloat(interestRate) / 100 / 12;
        const term = parseFloat(loanTerm) * 12;

        if (principal > 0 && rate > 0 && term > 0) {
            const payment = (principal * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
            const totalPay = payment * term;
            setMonthlyPayment(payment.toFixed(0));
            setTotalPayment(totalPay.toFixed(0));
            setTotalInterest((totalPay - principal).toFixed(0));
        } else {
            setMonthlyPayment(null);
            setTotalPayment(null);
            setTotalInterest(null);
        }
    };

    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const tips = [
        {
            icon: <Calculator size={20} />,
            text: "대출 금액, 이자율, 기간을 정확히 입력하세요."
        },
        {
            icon: <AlertCircle size={20} />,
            text: "결과는 예상치이며 실제 대출 조건에 따라 다를 수 있습니다."
        },
        {
            icon: <TrendingUp size={20} />,
            text: "추가 상환 옵션을 고려하면 총 이자를 줄일 수 있습니다."
        },
        {
            icon: <Info size={20} />,
            text: "다양한 시나리오를 비교해보면 최적의 대출 계획을 세울 수 있습니다."
        },
        {
            icon: <DollarSign size={20} />,
            text: "금융 전문가와 상담하여 개인 상황에 맞는 조언을 받는 것도 좋습니다."
        }
    ];

    const styles = {
        container: {
            margin: '0 auto',
            padding: isMobile ? '15px' : '30px',
            backgroundColor: '#FFF3E0',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Arial, sans-serif',
        },
        title: {
            textAlign: 'center',
            color: '#E65100',
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
            color: '#E65100',
            fontSize: '14px',
        },
        input: {
            width: '100%',
            padding: '10px',
            border: '1px solid #FFB74D',
            borderRadius: '5px',
            fontSize: '16px',
            boxSizing: 'border-box',
        },
        button: {
            gridColumn: '1 / -1',
            padding: '12px',
            backgroundColor: '#E65100',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '18px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
        },
        resultItem: {
            margin: '10px 0',
            fontSize: '16px',
            color: '#E65100',
        },
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
            color: '#E65100',
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
            backgroundColor: '#FFF9F0',
            borderRadius: '8px',
            transition: 'transform 0.2s',
            cursor: 'pointer',
        },
        tipIcon: {
            color: '#E65100',
            flexShrink: 0,
            marginTop: '2px',
        },
        tipText: {
            color: '#333',
            fontSize: '14px',
            lineHeight: '1.5',
        },
        resultContainer: {
            marginTop: '20px',
            padding: '25px',
            backgroundColor: '#FFF',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(230, 81, 0, 0.1)',
        },
        resultGrid: {
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '20px',
            marginTop: '15px',
        },
        resultCard: {
            backgroundColor: '#FFF9F0',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #FFB74D',
            transition: 'transform 0.2s, box-shadow 0.2s',
        },
        resultLabel: {
            color: '#E65100',
            fontSize: '14px',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
        },
        resultValue: {
            color: '#E65100',
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
            color: '#E65100',
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '15px',
            textAlign: 'center',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>대출 상환 계산기</h2>
            <div style={styles.form}>
                <div style={styles.fullWidth}>
                    <label style={styles.label}>대출 금액 (원)</label>
                    <input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        style={styles.input}
                        placeholder="예: 100000000"
                    />
                </div>
                <div>
                    <label style={styles.label}>연 이자율 (%)</label>
                    <input
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        style={styles.input}
                        placeholder="예: 3.5"
                    />
                </div>
                <div>
                    <label style={styles.label}>대출 기간 (년)</label>
                    <input
                        type="number"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(e.target.value)}
                        style={styles.input}
                        placeholder="예: 30"
                    />
                </div>
                <button onClick={calculateMonthlyPayment} style={styles.button}>상환 계획 계산</button>
            </div>
            {monthlyPayment && (
                <div style={styles.resultContainer}>
                    <div style={styles.resultHeader}>
                        대출 상환 시뮬레이션 결과
                    </div>
                    <div style={styles.resultGrid}>
                        <div 
                            style={styles.resultCard}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 6px 12px rgba(230, 81, 0, 0.1)';  // 주황색 그림자로 변경
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={styles.resultLabel}>
                                <Calendar size={20} />
                                월 상환금
                            </div>
                            <div style={styles.resultValue}>{formatNumber(monthlyPayment)}원</div>
                            <div style={styles.resultCompare}>
                                매월 납부해야 할 금액
                            </div>
                        </div>

                        <div 
                            style={styles.resultCard}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 6px 12px rgba(230, 81, 0, 0.1)';  // 주황색 그림자로 변경
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={styles.resultLabel}>
                                <DollarSign size={20} />
                                총 상환금액
                            </div>
                            <div style={styles.resultValue}>{formatNumber(totalPayment)}원</div>
                            <div style={styles.resultCompare}>
                                원금 + 이자 총액
                            </div>
                        </div>

                        <div 
                            style={styles.resultCard}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 6px 12px rgba(230, 81, 0, 0.1)';  // 주황색 그림자로 변경
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={styles.resultLabel}>
                                <TrendingUp size={20} />
                                총 이자
                            </div>
                            <div style={styles.resultValue}>{formatNumber(totalInterest)}원</div>
                            <div style={styles.resultCompare}>
                                전체 이자 비용
                            </div>
                        </div>

                        <div 
                            style={styles.resultCard}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 6px 12px rgba(230, 81, 0, 0.1)';  // 주황색 그림자로 변경
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={styles.resultLabel}>
                                <PiggyBank size={20} />
                                이자 비율
                            </div>
                            <div style={styles.resultValue}>
                                {((totalInterest / totalPayment) * 100).toFixed(1)}%
                            </div>
                            <div style={styles.resultCompare}>
                                전체 상환금액 중 이자 비중
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div style={styles.infoSection}>
                <div style={styles.infoItem}>
                    <div style={styles.infoTitle}>대출 상환 계산기 사용 팁</div>
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

export default LoanRepaymentCalculator;