import React, { useState } from 'react';

const LoanRepaymentCalculator = () => {
    const [loanAmount, setLoanAmount] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [loanTerm, setLoanTerm] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState(null);
    const [totalPayment, setTotalPayment] = useState(null);
    const [totalInterest, setTotalInterest] = useState(null);

    const calculateMonthlyPayment = () => {
        const principal = parseFloat(loanAmount);
        const rate = parseFloat(interestRate) / 100 / 12; // 월 이자율
        const term = parseFloat(loanTerm) * 12; // 개월 수

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
            maxWidth: '500px',
            margin: '0 auto',
            padding: '30px',
            backgroundColor: '#f8f9fa',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Arial, sans-serif',
        },
        title: {
            textAlign: 'center',
            color: '#2c3e50',
            marginBottom: '20px',
        },
        inputGroup: {
            marginBottom: '20px',
            width: '100%',
        },
        label: {
            display: 'block',
            marginBottom: '5px',
            color: '#34495e',
        },
        input: {
            width: 'calc(100% - 22px)',
            padding: '10px',
            border: '1px solid #bdc3c7',
            borderRadius: '5px',
            fontSize: '16px',
        },
        button: {
            width: '100%',
            padding: '12px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
        },
        resultContainer: {
            marginTop: '30px',
            textAlign: 'center',
            padding: '20px',
            backgroundColor: '#ecf0f1',
            borderRadius: '5px',
        },
        resultItem: {
            margin: '10px 0',
        },
        resultValue: {
            fontWeight: 'bold',
            color: '#2980b9',
            fontSize: '18px',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>대출 상환 계산기</h2>
            <div style={styles.inputGroup}>
                <label style={styles.label}>
                    대출 금액 (원):
                    <input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        style={styles.input}
                        placeholder="예: 100000000"
                    />
                </label>
            </div>
            <div style={styles.inputGroup}>
                <label style={styles.label}>
                    연 이자율 (%):
                    <input
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        style={styles.input}
                        placeholder="예: 3.5"
                    />
                </label>
            </div>
            <div style={styles.inputGroup}>
                <label style={styles.label}>
                    대출 기간 (년):
                    <input
                        type="number"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(e.target.value)}
                        style={styles.input}
                        placeholder="예: 30"
                    />
                </label>
            </div>
            <button onClick={calculateMonthlyPayment} style={styles.button}>상환 계획 계산</button>
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
        </div>
    );
};

export default LoanRepaymentCalculator;