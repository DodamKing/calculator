import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from 'recharts';

const MortgageLoanCalculator = () => {
    const [loanAmount, setLoanAmount] = useState('');
    const [loanTerm, setLoanTerm] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [gracePeriod, setGracePeriod] = useState('0');
    const [repaymentType, setRepaymentType] = useState('equalPrincipalAndInterest');
    const [result, setResult] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [showDetailedResults, setShowDetailedResults] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const calculateMortgage = () => {
        const principal = parseFloat(loanAmount);
        const annualRate = parseFloat(interestRate) / 100;
        const monthlyRate = annualRate / 12;
        const totalMonths = parseFloat(loanTerm) * 12;
        const gracePeriodMonths = parseFloat(gracePeriod) * 12;

        if (principal > 0 && annualRate >= 0 && totalMonths > 0) {
            let payments = [];
            let totalPayment = 0;
            let totalInterest = 0;
            let remainingPrincipal = principal;

            // 상환 기간 (거치 기간 제외)
            const repaymentMonths = totalMonths - gracePeriodMonths;

            // 초기 원금 상환액과 증가율 계산
            const calculateInitialPaymentAndGrowthRate = () => {
                let lowRate = 0;
                let highRate = 1;
                let initialPayment, growthRate;

                while (highRate - lowRate > 0.0000001) {
                    growthRate = (lowRate + highRate) / 2;
                    initialPayment = principal * growthRate / ((1 + growthRate) ** repaymentMonths - 1);

                    let totalPrincipalPaid = 0;
                    for (let i = 0; i < repaymentMonths; i++) {
                        let payment = initialPayment * (1 + growthRate) ** i;
                        let interestPart = (principal - totalPrincipalPaid) * monthlyRate;
                        let principalPart = payment - interestPart;
                        totalPrincipalPaid += principalPart;
                    }

                    if (Math.abs(totalPrincipalPaid - principal) < 0.01) {
                        break;
                    } else if (totalPrincipalPaid > principal) {
                        highRate = growthRate;
                    } else {
                        lowRate = growthRate;
                    }
                }

                return { initialPayment, growthRate };
            };

            const { initialPayment, growthRate } = calculateInitialPaymentAndGrowthRate();

            for (let month = 1; month <= totalMonths; month++) {
                let monthlyPayment, interestPayment, principalPayment;

                interestPayment = remainingPrincipal * monthlyRate;

                if (month <= gracePeriodMonths) {
                    // 거치 기간 동안 이자만 납부
                    principalPayment = 0;
                    monthlyPayment = interestPayment;
                } else {
                    // 상환 기간 동안 체증식 상환
                    monthlyPayment = initialPayment * (1 + growthRate) ** (month - gracePeriodMonths - 1);
                    principalPayment = monthlyPayment - interestPayment;
                }

                remainingPrincipal = Math.max(0, remainingPrincipal - principalPayment);
                totalPayment += monthlyPayment;
                totalInterest += interestPayment;

                payments.push({
                    month,
                    monthlyPayment: Math.round(monthlyPayment),
                    principalPayment: Math.round(principalPayment),
                    interestPayment: Math.round(interestPayment),
                    remainingPrincipal: Math.round(remainingPrincipal),
                });

                if (remainingPrincipal === 0) break;
            }

            setResult({
                payments,
                totalPayment: Math.round(totalPayment),
                totalInterest: Math.round(totalInterest),
                principal,
                initialPayment: Math.round(initialPayment),
                growthRate: growthRate * 100 // 퍼센트로 변환
            });
        } else {
            setResult(null);
        }
    };

    const formatNumber = (num) => {
        return num.toLocaleString('ko-KR');
    };

    const renderSummaryResults = () => {
        if (!result) return null;

        const monthlyAverage = result.totalPayment / (parseFloat(loanTerm) * 12);
        const chartData = [
            { name: '대출원금', value: result.principal },
            { name: '총이자액', value: result.totalInterest },
            { name: '월평균상환금', value: monthlyAverage }
        ];

        return (
            <div style={styles.summaryResultContainer}>
                <h3 style={styles.resultTitle}>대출 상환 요약</h3>
                <div style={styles.chartContainer}>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <XAxis dataKey="name" />
                            <YAxis tickFormatter={(value) => formatNumber(Math.round(value / 10000)) + '만'} />
                            <Tooltip formatter={(value) => formatNumber(Math.round(value)) + '원'} />
                            <Bar dataKey="value" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div style={styles.summaryContainer}>
                    {[
                        { label: '원금 및 총이자액 합계', value: result.totalPayment },
                        { label: '총이자액', value: result.totalInterest },
                        { label: '월평균상환금', value: monthlyAverage },
                        ...(repaymentType === 'equalPrincipal' ? [{ label: '고정 원금 상환액', value: result.fixedPrincipalPayment }] : [])
                    ].map((item, index) => (
                        <div key={index} style={styles.summaryItem}>
                            <span style={styles.summaryLabel}>{item.label}:</span>
                            <span style={styles.summaryValue}>{formatNumber(Math.round(item.value))}원</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderDetailedResults = () => {
        if (!result || !showDetailedResults) return null;

        return (
            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            {['회차', '상환금(원금+이자,원)', '납입원금(원)', '이자(원)', '납입원금누계(원)', '잔금(원)'].map((header, index) => (
                                <th key={index} style={styles.th}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {result.payments.map((payment, index) => {
                            const totalPrincipalPaid = result.payments
                                .slice(0, index + 1)
                                .reduce((sum, p) => sum + p.principalPayment, 0);
                            return (
                                <tr key={index}>
                                    <td style={styles.td}>{payment.month}</td>
                                    <td style={styles.td}>{formatNumber(payment.monthlyPayment)}</td>
                                    <td style={styles.td}>{formatNumber(payment.principalPayment)}</td>
                                    <td style={styles.td}>{formatNumber(payment.interestPayment)}</td>
                                    <td style={styles.td}>{formatNumber(totalPrincipalPaid)}</td>
                                    <td style={styles.td}>{formatNumber(payment.remainingPrincipal)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    };

    const styles = {
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: isMobile ? '15px' : '30px',
            backgroundColor: '#F0F4F8',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Arial, sans-serif',
        },
        title: {
            textAlign: 'center',
            color: '#2C3E50',
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
            color: '#34495E',
            fontSize: '14px',
            fontWeight: 'bold',
        },
        input: {
            width: '100%',
            padding: '10px',
            border: '1px solid #BDC3C7',
            borderRadius: '5px',
            fontSize: '16px',
            boxSizing: 'border-box',
        },
        select: {
            width: '100%',
            padding: '10px',
            border: '1px solid #BDC3C7',
            borderRadius: '5px',
            fontSize: '16px',
            backgroundColor: 'white',
            boxSizing: 'border-box',
        },
        button: {
            gridColumn: '1 / -1',
            padding: '12px',
            backgroundColor: '#3498DB',
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
            color: '#2C3E50',
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
            borderBottom: '1px solid #ECF0F1',
        },
        summaryLabel: {
            fontWeight: 'bold',
            color: '#34495E',
        },
        summaryValue: {
            color: '#2980B9',
        },
        tableContainer: {
            overflowX: 'auto',
            marginTop: '20px',
            maxHeight: isMobile ? '300px' : '400px',
            overflowY: 'auto',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: isMobile ? '12px' : '14px',
        },
        th: {
            backgroundColor: '#3498DB',
            color: 'white',
            padding: isMobile ? '8px 4px' : '12px 8px',
            textAlign: 'left',
            position: 'sticky',
            top: 0,
            zIndex: 10,
        },
        td: {
            border: '1px solid #ECF0F1',
            padding: isMobile ? '6px 4px' : '8px',
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
            color: '#2C3E50',
            marginBottom: '10px',
            fontSize: '18px',
        },
        infoContent: {
            color: '#34495E',
            fontSize: '14px',
            lineHeight: '1.6',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>대출상환원리금 조회</h2>
            <div style={styles.form}>
                <div>
                    <label style={styles.label}>상환 방식</label>
                    <select
                        value={repaymentType}
                        onChange={(e) => setRepaymentType(e.target.value)}
                        style={styles.select}
                    >
                        <option value="equalPrincipalAndInterest">원리금균등상환</option>
                        <option value="equalPrincipal">원금균등상환</option>
                        <option value="graduatedPayment">체증식 상환</option>
                    </select>
                </div>
                <div>
                    <label style={styles.label}>대출금액 (원)</label>
                    <input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        style={styles.input}
                        placeholder="예: 200000000"
                    />
                </div>
                <div>
                    <label style={styles.label}>대출기간 (년)</label>
                    <input
                        type="number"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(e.target.value)}
                        style={styles.input}
                        placeholder="예: 30"
                    />
                </div>
                <div>
                    <label style={styles.label}>거치기간 (년)</label>
                    <input
                        type="number"
                        value={gracePeriod}
                        onChange={(e) => setGracePeriod(e.target.value)}
                        style={styles.input}
                        placeholder="예: 1"
                    />
                </div>
                <div>
                    <label style={styles.label}>대출금리 (%)</label>
                    <input
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        style={styles.input}
                        placeholder="예: 3.5"
                    />
                </div>
                <button onClick={calculateMortgage} style={styles.button}>조회하기</button>
            </div>
            {renderSummaryResults()}
            {result && (
                <div style={styles.resultContainer}>
                    <h3 style={styles.resultTitle}>상환 상세 내역</h3>
                    <div style={styles.chartContainer}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={result.payments}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis tickFormatter={(value) => formatNumber(Math.round(value / 10000)) + '만'} />
                                <Tooltip formatter={(value) => formatNumber(value) + '원'} />
                                <Legend />
                                <Line type="monotone" dataKey="monthlyPayment" name="월 상환금" stroke="#8884d8" activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="principalPayment" name="원금 상환" stroke="#82ca9d" />
                                <Line type="monotone" dataKey="interestPayment" name="이자 상환" stroke="#ffc658" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <button 
                        onClick={() => setShowDetailedResults(!showDetailedResults)}
                        style={{...styles.button, marginTop: '20px'}}
                    >
                        {showDetailedResults ? '상세 결과 숨기기' : '상세 결과 보기'}
                    </button>
                    {renderDetailedResults()}
                </div>
            )}
            <div style={styles.infoSection}>
                <h3 style={styles.infoTitle}>용어 설명</h3>
                <div style={styles.infoContent}>
                    <p><strong>원리금균등상환:</strong> 매월 동일한 금액(원금+이자)을 상환하는 방식입니다.</p>
                    <p><strong>원금균등상환:</strong> 매월 동일한 원금을 상환하고, 이자는 잔액에 따라 계산되어 총 상환액이 점차 감소하는 방식입니다.</p>
                    <p><strong>체증식 상환:</strong> 시간이 지남에 따라 상환액이 증가하는 방식으로, 5년마다 10%씩 증가합니다.</p>
                    <p><strong>거치기간:</strong> 원금 상환 없이 이자만 납부하는 기간입니다.</p>
                </div>
            </div>
        </div>
    );
};

export default MortgageLoanCalculator;