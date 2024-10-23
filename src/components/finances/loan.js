import React, { useState, useEffect } from 'react';

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

    const styles = {
        container: {
            maxWidth: isMobile ? '100%' : '600px',
            margin: '0 auto',
            padding: isMobile ? '15px' : '30px',
            backgroundColor: '#FFF3E0', // 밝은 주황색 배경
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Arial, sans-serif',
        },
        title: {
            textAlign: 'center',
            color: '#E65100', // 진한 주황색
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
            color: '#E65100', // 진한 주황색
            fontSize: '14px',
        },
        input: {
            width: '100%',
            padding: '10px',
            border: '1px solid #FFB74D', // 중간 톤의 주황색
            borderRadius: '5px',
            fontSize: '16px',
            boxSizing: 'border-box',
        },
        button: {
            gridColumn: '1 / -1',
            padding: '12px',
            backgroundColor: '#E65100', // 진한 주황색
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
            backgroundColor: '#FFE0B2', // 매우 밝은 주황색
            borderRadius: '5px',
        },
        resultItem: {
            margin: '10px 0',
            fontSize: '16px',
            color: '#E65100', // 진한 주황색
        },
        resultValue: {
            fontWeight: 'bold',
            color: '#E65100', // 진한 주황색
            fontSize: '18px',
        },
        infoSection: {
            marginTop: '20px',
        },
        infoItem: {
            backgroundColor: '#FFF',
            borderRadius: '5px',
            padding: '15px',
            marginBottom: '10px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
        infoTitle: {
            fontWeight: 'bold',
            color: '#E65100', // 진한 주황색
            marginBottom: '20px',
            fontSize: '16px',
        },
        infoContent: {
            color: '#333',
            fontSize: '14px',
            whiteSpace: 'pre-line',
            lineHeight: '1.5',
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
                    <div style={styles.resultItem}>
                        <p>월 상환금: <span style={styles.resultValue}>{formatNumber(monthlyPayment)}원</span></p>
                    </div>
                    <div style={styles.resultItem}>
                        <p>총 상환금액: <span style={styles.resultValue}>{formatNumber(totalPayment)}원</span></p>
                    </div>
                    <div style={styles.resultItem}>
                        <p>총 이자: <span style={styles.resultValue}>{formatNumber(totalInterest)}원</span></p>
                    </div>
                </div>
            )}
            <div style={styles.infoSection}>
                <div style={styles.infoItem}>
                    <div style={styles.infoTitle}>대출 상환 계산기 사용 팁</div>
                    <div style={styles.infoContent}>
                        <p>• 대출 금액, 이자율, 기간을 정확히 입력하세요.</p>
                        <p>• 결과는 예상치이며 실제 대출 조건에 따라 다를 수 있습니다.</p>
                        <p>• 추가 상환 옵션을 고려하면 총 이자를 줄일 수 있습니다.</p>
                        <p>• 다양한 시나리오를 비교해보면 최적의 대출 계획을 세울 수 있습니다.</p>
                        <p>• 금융 전문가와 상담하여 개인 상황에 맞는 조언을 받는 것도 좋습니다.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoanRepaymentCalculator;