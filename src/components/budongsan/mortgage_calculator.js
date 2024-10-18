import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const MortgageLoanCalculator = () => {
    const [propertyValue, setPropertyValue] = useState('');
    const [loanAmount, setLoanAmount] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [loanTerm, setLoanTerm] = useState('');
    const [gracePeriod, setGracePeriod] = useState('0');
    const [repaymentType, setRepaymentType] = useState('equalPrincipalAndInterest');
    const [result, setResult] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const calculateMortgage = () => {
        const principal = parseFloat(loanAmount);
        const annualRate = parseFloat(interestRate) / 100;
        const monthlyRate = annualRate / 12;
        const totalMonths = parseFloat(loanTerm) * 12;
        const graceMonths = parseFloat(gracePeriod) * 12;
        const propertyVal = parseFloat(propertyValue);

        if (principal > 0 && annualRate > 0 && totalMonths > 0 && propertyVal > 0) {
            let monthlyPayment, totalPayment, totalInterest;

            if (repaymentType === 'equalPrincipalAndInterest') {
                // 원리금균등상환
                monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths - graceMonths)) / (Math.pow(1 + monthlyRate, totalMonths - graceMonths) - 1);
                totalPayment = monthlyPayment * (totalMonths - graceMonths) + (principal * monthlyRate * graceMonths);
            } else if (repaymentType === 'equalPrincipal') {
                // 원금균등상환
                const monthlyPrincipal = principal / (totalMonths - graceMonths);
                totalPayment = 0;
                for (let i = 1; i <= totalMonths; i++) {
                    if (i <= graceMonths) {
                        totalPayment += principal * monthlyRate;
                    } else {
                        totalPayment += monthlyPrincipal + (principal - monthlyPrincipal * (i - graceMonths - 1)) * monthlyRate;
                    }
                }
                monthlyPayment = totalPayment / totalMonths; // 평균 월 상환금
            } else if (repaymentType === 'bulletPayment') {
                // 만기일시상환
                monthlyPayment = principal * monthlyRate;
                totalPayment = monthlyPayment * totalMonths + principal;
            } else if (repaymentType === 'interestOnlyThenAmortizing') {
                // 거치식 (이자만 납부 후 원리금 균등)
                const interestOnlyPayment = principal * monthlyRate;
                const amortizingMonths = totalMonths - graceMonths;
                const amortizingPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, amortizingMonths)) / (Math.pow(1 + monthlyRate, amortizingMonths) - 1);
                totalPayment = (interestOnlyPayment * graceMonths) + (amortizingPayment * amortizingMonths);
                monthlyPayment = totalPayment / totalMonths; // 평균 월 상환금
            }

            totalInterest = totalPayment - principal;
            const ltvRatio = (principal / propertyVal) * 100;

            setResult({
                monthlyPayment: monthlyPayment.toFixed(0),
                totalPayment: totalPayment.toFixed(0),
                totalInterest: totalInterest.toFixed(0),
                ltvRatio: ltvRatio.toFixed(2),
                principal: principal.toFixed(0)
            });
        } else {
            setResult(null);
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
            backgroundColor: '#E8F5E9',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Arial, sans-serif',
        },
        title: {
            textAlign: 'center',
            color: '#2E7D32',
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
            color: '#2E7D32',
            fontSize: '14px',
        },
        input: {
            width: '100%',
            padding: '10px',
            border: '1px solid #81C784',
            borderRadius: '5px',
            fontSize: '16px',
            boxSizing: 'border-box',
        },
        select: {
            width: '100%',
            padding: '10px',
            border: '1px solid #81C784',
            borderRadius: '5px',
            fontSize: '16px',
            backgroundColor: 'white',
            boxSizing: 'border-box',
        },
        button: {
            gridColumn: '1 / -1',
            padding: '12px',
            backgroundColor: '#2E7D32',
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
            backgroundColor: '#C8E6C9',
            borderRadius: '5px',
        },
        resultItem: {
            margin: '10px 0',
            fontSize: '16px',
            color: '#2E7D32',
        },
        resultValue: {
            fontWeight: 'bold',
            color: '#2E7D32',
            fontSize: '18px',
        },
        chartContainer: {
            height: '300px',
            marginTop: '20px',
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
            color: '#2E7D32',
            marginBottom: '10px',
            fontSize: '16px',
        },
        infoContent: {
            color: '#333',
            fontSize: '14px',
            whiteSpace: 'pre-line',
            lineHeight: '1.5',
        },
    };

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>상세 주택담보대출 계산기</h2>
            <div style={styles.form}>
                <div>
                    <label style={styles.label}>주택 가치 (원)</label>
                    <input
                        type="number"
                        value={propertyValue}
                        onChange={(e) => setPropertyValue(e.target.value)}
                        style={styles.input}
                        placeholder="예: 300000000"
                    />
                </div>
                <div>
                    <label style={styles.label}>대출 금액 (원)</label>
                    <input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        style={styles.input}
                        placeholder="예: 200000000"
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
                <div>
                    <label style={styles.label}>거치 기간 (년)</label>
                    <input
                        type="number"
                        value={gracePeriod}
                        onChange={(e) => setGracePeriod(e.target.value)}
                        style={styles.input}
                        placeholder="예: 1"
                    />
                </div>
                <div style={styles.fullWidth}>
                    <label style={styles.label}>상환 방식</label>
                    <select
                        value={repaymentType}
                        onChange={(e) => setRepaymentType(e.target.value)}
                        style={styles.select}
                    >
                        <option value="equalPrincipalAndInterest">원리금균등상환</option>
                        <option value="equalPrincipal">원금균등상환</option>
                        <option value="bulletPayment">만기일시상환</option>
                        <option value="interestOnlyThenAmortizing">거치식 (이자만 납부 후 원리금 균등)</option>
                    </select>
                </div>
                <button onClick={calculateMortgage} style={styles.button}>대출 계산하기</button>
            </div>
            {result && (
                <div style={styles.resultContainer}>
                    <div style={styles.resultItem}>
                        <p>월 상환금 (평균): <span style={styles.resultValue}>{formatNumber(result.monthlyPayment)}원</span></p>
                    </div>
                    <div style={styles.resultItem}>
                        <p>총 상환금액: <span style={styles.resultValue}>{formatNumber(result.totalPayment)}원</span></p>
                    </div>
                    <div style={styles.resultItem}>
                        <p>총 이자: <span style={styles.resultValue}>{formatNumber(result.totalInterest)}원</span></p>
                    </div>
                    <div style={styles.resultItem}>
                        <p>LTV (담보인정비율): <span style={styles.resultValue}>{result.ltvRatio}%</span></p>
                    </div>
                    <div style={styles.chartContainer}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={[
                                        { name: '원금', value: parseFloat(result.principal) },
                                        { name: '이자', value: parseFloat(result.totalInterest) },
                                    ]}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {[0, 1].map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
            <div style={styles.infoSection}>
                <div style={styles.infoItem}>
                    <div style={styles.infoTitle}>주택담보대출 계산기 사용 팁</div>
                    <div style={styles.infoContent}>
                        {`• LTV(담보인정비율)는 대출 금액을 주택 가치로 나눈 비율입니다. 일반적으로 LTV가 낮을수록 대출 조건이 유리합니다.

• 거치 기간 동안은 이자만 납부하고 원금 상환은 하지 않습니다.

• 원리금균등상환: 매월 동일한 금액을 상환합니다. 초기에는 이자 비중이 높고, 나중에는 원금 비중이 높아집니다.

• 원금균등상환: 매월 동일한 원금과 잔액에 대한 이자를 상환합니다. 초기 상환 부담이 크지만, 총 이자 부담이 적습니다.

• 만기일시상환: 대출 기간 동안 이자만 납부하고, 만기에 원금을 일시 상환합니다.

• 거치식 (이자만 납부): 일정 기간 동안 이자만 납부하고, 이후 원리금을 상환합니다.

• 실제 대출 조건은 개인의 신용도, 소득, 기타 요인에 따라 달라질 수 있으므로, 정확한 조건은 은행 상담을 통해 확인하세요.`}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MortgageLoanCalculator;