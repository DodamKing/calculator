import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from 'recharts';

const MortgageLoanCalculator = () => {
    const [loanAmount, setLoanAmount] = useState('');
    const [loanTerm, setLoanTerm] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [gracePeriod, setGracePeriod] = useState('0');
    const [repaymentType, setRepaymentType] = useState('equalPrincipalAndInterest');
    const [propertyValue, setPropertyValue] = useState(''); // 담보물건 가액
    const [interestRateType, setInterestRateType] = useState('fixed'); // 금리 종류
    const [result, setResult] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [showDetailedResults, setShowDetailedResults] = useState(false);
    const [ltvError, setLtvError] = useState('');
    const [maxLoanAmount, setMaxLoanAmount] = useState(0);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // LTV 계산 및 검증
    const calculateLTV = (property, loan) => {
        if (!property || !loan) return 0;
        return (loan / property) * 100;
    };

    const calculateMortgage = () => {
        const principal = parseFloat(loanAmount);
        const baseRate = parseFloat(interestRate);
        const adjustedRate = interestRateType === 'variable' ? baseRate + 0.3 : baseRate;
        const annualRate = adjustedRate / 100;
        const monthlyRate = annualRate / 12;
        const totalMonths = parseFloat(loanTerm) * 12;
        const gracePeriodMonths = parseFloat(gracePeriod) * 12;

        // 입력값 검증
        if (!principal || !annualRate || !totalMonths) {
            setResult(null);
            setLtvError('모든 필수 항목을 입력해주세요.');
            return;
        }

        // LTV 검증 및 경고
        const ltv = calculateLTV(parseFloat(propertyValue), principal);
        if (ltv > 70) {
            setLtvError('LTV가 70%를 초과합니다. 실제 대출이 어려울 수 있습니다.');
            // 계산은 계속 진행
        } else {
            setLtvError('');
        }

        const repaymentMonths = totalMonths - gracePeriodMonths;

        // 상환 방식별 월납입금 계산 함수들
        const calculatePaymentMethods = {
            equalPrincipalAndInterest: () => {
                const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, repaymentMonths)) /
                    (Math.pow(1 + monthlyRate, repaymentMonths) - 1);
                return { monthlyPayment };
            },

            equalPrincipal: () => {
                const fixedPrincipalPayment = principal / repaymentMonths;
                return { fixedPrincipalPayment };
            },

            graduatedPayment: () => {
                const growthRate = 0.02; // 연 2% 증가
                const initialPayment = principal * monthlyRate * Math.pow(1 + growthRate, repaymentMonths) /
                    (Math.pow(1 + growthRate, repaymentMonths) - 1);
                return { monthlyPayment: initialPayment, growthRate };
            }
        };

        // 선택된 상환 방식에 따른 초기값 계산
        const paymentMethod = calculatePaymentMethods[repaymentType]();

        // 월별 납입금 계산
        let payments = [];
        let totalPayment = 0;
        let totalInterest = 0;
        let remainingPrincipal = principal;

        for (let month = 1; month <= totalMonths; month++) {
            let interestPayment = remainingPrincipal * monthlyRate;
            let principalPayment = 0;
            let currentMonthlyPayment = 0;

            if (month <= gracePeriodMonths) {
                // 거치 기간
                currentMonthlyPayment = interestPayment;
                principalPayment = 0;
            } else {
                // 상환 기간
                const monthsSinceGrace = month - gracePeriodMonths;

                switch (repaymentType) {
                    case 'equalPrincipalAndInterest':
                        currentMonthlyPayment = paymentMethod.monthlyPayment;
                        break;
                    case 'equalPrincipal':
                        principalPayment = paymentMethod.fixedPrincipalPayment;
                        currentMonthlyPayment = principalPayment + interestPayment;
                        break;
                    case 'graduatedPayment':
                        const growthFactor = Math.pow(1.02, Math.floor(monthsSinceGrace / 12));
                        currentMonthlyPayment = paymentMethod.monthlyPayment * growthFactor;
                        break;
                }

                principalPayment = currentMonthlyPayment - interestPayment;
            }

            remainingPrincipal = Math.max(0, remainingPrincipal - principalPayment);
            totalPayment += currentMonthlyPayment;
            totalInterest += interestPayment;

            payments.push({
                month,
                monthlyPayment: Math.round(currentMonthlyPayment),
                principalPayment: Math.round(principalPayment),
                interestPayment: Math.round(interestPayment),
                remainingPrincipal: Math.round(remainingPrincipal)
            });

            if (remainingPrincipal === 0) break;
        }

        setResult({
            payments,
            totalPayment: Math.round(totalPayment),
            totalInterest: Math.round(totalInterest),
            principal,
            fixedPrincipalPayment: Math.round(paymentMethod.fixedPrincipalPayment || 0),
            ltv: ltv.toFixed(1)
        });
    };

    const formatNumber = (num) => {
        return num.toLocaleString('ko-KR');
    };

    // 대출금액 변경 핸들러
    const handleLoanAmountChange = (e) => {
        const newLoanAmount = parseFloat(e.target.value);
        const propertyVal = parseFloat(propertyValue);

        setLoanAmount(e.target.value);

        if (propertyVal && newLoanAmount) {
            const ltv = calculateLTV(propertyVal, newLoanAmount);
            if (ltv > 70) {
                setLtvError('LTV가 70%를 초과합니다. 실제 대출이 어려울 수 있습니다.');
            } else {
                setLtvError('');
            }
        } else {
            setLtvError('');
        }
    };

    // 담보물건 가액 변경 핸들러
    const handlePropertyValueChange = (e) => {
        const newPropertyValue = parseFloat(e.target.value);
        setPropertyValue(e.target.value);

        if (newPropertyValue) {
            const newMaxLoan = newPropertyValue * 0.7;
            setMaxLoanAmount(newMaxLoan);

            const currentLoan = parseFloat(loanAmount);
            if (currentLoan > newMaxLoan) {
                setLtvError('LTV가 70%를 초과합니다. 실제 대출이 어려울 수 있습니다.');
                setLoanAmount(newMaxLoan.toString());
            } else {
                setLtvError('');
            }
        }
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
        helperText: {
            fontSize: '12px',
            color: '#666',
            marginTop: '4px',
        },
        errorText: {
            color: '#e74c3c',
            fontWeight: 'bold',
            marginTop: '4px',
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>주댁담보대출 계산기</h2>
            <div style={styles.form}>
                <div>
                    <label style={styles.label}>담보물건 가액 (원)</label>
                    <input
                        type="number"
                        value={propertyValue}
                        onChange={handlePropertyValueChange}
                        style={styles.input}
                        placeholder="예: 500000000"
                    />
                    <div id="ltvHelper" style={styles.helperText}>
                        {maxLoanAmount > 0 && `최대 대출가능금액: ${formatNumber(Math.floor(maxLoanAmount))}원`}
                        {ltvError && <div style={styles.errorText}>{ltvError}</div>}
                    </div>
                </div>
                <div>
                    <label style={styles.label}>대출금액 (원)</label>
                    <input
                        type="number"
                        value={loanAmount}
                        onChange={handleLoanAmountChange}  // 다시 핸들러 함수 사용
                        style={styles.input}
                        placeholder="예: 200000000"
                    />
                </div>
                <div>
                    <label style={styles.label}>금리 종류</label>
                    <select
                        value={interestRateType}
                        onChange={(e) => setInterestRateType(e.target.value)}
                        style={styles.select}
                    >
                        <option value="fixed">고정금리</option>
                        <option value="variable">변동금리</option>
                    </select>
                </div>
                <div>
                    <label style={styles.label}>대출금리 (%)</label>
                    <input
                        type="number"
                        min="0"  // 음수 입력 방지
                        step="0.1"  // 금리 입력시 소수점 입력 용이하게
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        style={styles.input}
                        placeholder="예: 3.5"
                    />
                    {interestRateType === 'variable' && (
                        <div style={styles.helperText}>
                            실제 적용금리: {(parseFloat(interestRate) + 0.3).toFixed(2)}%
                        </div>
                    )}
                </div>
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
                <button onClick={calculateMortgage} style={styles.button}>계산하기</button>
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
                        style={{ ...styles.button, marginTop: '20px' }}
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
                    <p><strong>체증식 상환:</strong> 시간이 지남에 따라 상환액이 증가하는 방식으로, 매년 2%씩 증가합니다.</p>
                    <p><strong>거치기간:</strong> 원금 상환 없이 이자만 납부하는 기간입니다.</p>
                    <hr style={{ margin: '15px 0' }} />
                    <p style={{ color: '#e74c3c', fontSize: '13px' }}>
                        * 본 계산기는 참고용이며, 실제 대출 조건과 상환금액은 다를 수 있습니다.
                        정확한 대출 조건은 은행에 문의해주세요.
                    </p>
                    <p style={{ fontSize: '13px', color: '#666' }}>
                        - 중도상환수수료, 취급수수료 등 부대비용 미포함
                        - 변동금리의 경우 기준금리 변동에 따라 달라질 수 있음
                        - 실제 대출한도는 신용도, 소득 등에 따라 달라질 수 있음
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MortgageLoanCalculator;