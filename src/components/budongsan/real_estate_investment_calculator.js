import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend, Cell } from 'recharts';

const RealEstateROICalculator = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [purchasePrice, setPurchasePrice] = useState('');
    const [downPayment, setDownPayment] = useState('');
    const [loanAmount, setLoanAmount] = useState('');
    const [loanRate, setLoanRate] = useState('');
    const [loanTerm, setLoanTerm] = useState('');
    const [monthlyRent, setMonthlyRent] = useState('');
    const [deposit, setDeposit] = useState('');
    const [vacancy, setVacancy] = useState('');
    const [propertyTax, setPropertyTax] = useState('');
    const [insuranceCost, setInsuranceCost] = useState('');
    const [maintenanceCost, setMaintenanceCost] = useState('');
    const [propertyManagementFee, setPropertyManagementFee] = useState('');
    const [holdingPeriod, setHoldingPeriod] = useState('');
    const [annualAppreciation, setAnnualAppreciation] = useState('');
    const [result, setResult] = useState(null);
    const [showDetailedResults, setShowDetailedResults] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const calculateROI = () => {
        // 기본 입력값 파싱
        const purchase = parseFloat(purchasePrice) || 0;
        const down = parseFloat(downPayment) || 0;
        const loan = parseFloat(loanAmount) || 0;
        const rate = parseFloat(loanRate) || 0;
        const term = parseInt(loanTerm) || 0;
        const rent = parseFloat(monthlyRent) || 0;
        const depositAmount = parseFloat(deposit) || 0;
        const vacancyRate = parseFloat(vacancy) || 0;
        const tax = parseFloat(propertyTax) || 0;
        const insurance = parseFloat(insuranceCost) || 0;
        const maintenance = parseFloat(maintenanceCost) || 0;
        const managementFee = parseFloat(propertyManagementFee) || 0;
        const period = parseInt(holdingPeriod) || 0;
        const appreciation = parseFloat(annualAppreciation) || 0;
        const depositYield = 0.02;
        

        // 월 대출 상환금 계산
        const monthlyRate = (rate / 100) / 12;
        const numberOfPayments = term * 12;
        const monthlyMortgagePayment = loan * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
            (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

        let yearlyData = [];
        let propertyValue = purchase;
        let totalInvestment = down + depositAmount;
        let cumulativeCashflow = 0;
        let totalRentalIncome = 0;
        let totalExpenses = 0;
        let totalEquityGained = 0;
        let remainingLoan = loan;

        for (let year = 1; year <= period; year++) {
            // 연간 임대 수입 계산 (보증금 운용 수익 포함)
            const yearlyRent = rent * 12;
            const depositIncome = depositAmount * depositYield;
            const effectiveIncome = (yearlyRent * (1 - vacancyRate / 100)) + depositIncome;
            
            // 연간 비용 계산
            const yearlyMortgage = monthlyMortgagePayment * 12;
            const yearlyTax = (tax / 100) * propertyValue;
            const yearlyExpenses = yearlyMortgage + yearlyTax + insurance + maintenance + 
                                 (managementFee / 100 * effectiveIncome);

            // 대출 원금 상환액 계산 (정확한 원리금 분리)
            const yearlyInterest = remainingLoan * rate / 100;
            const principalPayment = yearlyMortgage - yearlyInterest;
            remainingLoan -= principalPayment;

            // 자산 가치 변화 계산
            const previousValue = propertyValue;
            propertyValue *= (1 + appreciation / 100);
            const yearlyAppreciation = propertyValue - previousValue;

            // 현금흐름 및 수익률 계산
            const cashflow = effectiveIncome - yearlyExpenses;
            cumulativeCashflow += cashflow;
            totalRentalIncome += effectiveIncome;
            totalExpenses += yearlyExpenses;
            totalEquityGained += yearlyAppreciation + principalPayment;

            // 수익률 계산
            const cashROI = (cashflow / totalInvestment) * 100;
            const equityROI = ((cashflow + yearlyAppreciation + principalPayment) / totalInvestment) * 100;
            const cumulativeROI = ((cumulativeCashflow + totalEquityGained) / totalInvestment) * 100;

            yearlyData.push({
                year,
                rentalIncome: Math.round(effectiveIncome),
                expenses: Math.round(yearlyExpenses),
                cashflow: Math.round(cashflow),
                cumulativeCashflow: Math.round(cumulativeCashflow),
                propertyValue: Math.round(propertyValue),
                appreciation: Math.round(yearlyAppreciation),
                equityGained: Math.round(totalEquityGained),
                principalPayment: Math.round(principalPayment),
                remainingLoan: Math.round(remainingLoan),
                cashROI: cashROI.toFixed(2),
                equityROI: equityROI.toFixed(2),
                cumulativeROI: cumulativeROI.toFixed(2)
            });
        }

        // 최종 수익률 계산
        const totalReturn = totalRentalIncome - totalExpenses + totalEquityGained;
        const totalROI = (totalReturn / totalInvestment) * 100;
        const averageAnnualROI = totalROI / period;
        const capitalGrowth = ((propertyValue - purchase) / purchase) * 100;

        setResult({
            yearlyData,
            summary: {
                totalInvestment,
                totalRentalIncome,
                totalExpenses,
                totalEquityGained,
                totalReturn,
                totalROI,
                averageAnnualROI,
                capitalGrowth,
                monthlyMortgagePayment
            }
        });
    };

    const formatNumber = (num) => {
        return num.toLocaleString('ko-KR');
    };

    const renderSummaryResults = () => {
        if (!result) return null;

        const { summary } = result;
        const chartData = [
            { name: '총 투자금액', value: summary.totalInvestment },
            { name: '총 임대수익', value: summary.totalRentalIncome },
            { name: '총 비용', value: summary.totalExpenses },
            { name: '자산가치 상승', value: summary.totalEquityGained }
        ];

        return (
            <div style={styles.summaryResultContainer}>
                <h3 style={styles.resultTitle}>투자 수익 분석 요약</h3>
                <div style={styles.chartContainer}>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <XAxis dataKey="name" />
                            <YAxis tickFormatter={(value) => formatNumber(Math.round(value / 10000)) + '만'} />
                            <Tooltip 
                                formatter={(value) => formatNumber(Math.round(value)) + '원'} 
                                labelStyle={{ color: '#1A2B6D' }}
                            />
                            <Bar dataKey="value" fill="#2E5BFF">
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div style={styles.summaryContainer}>
                    <div style={styles.summaryItem}>
                        <span style={styles.summaryLabel}>총 투자수익률:</span>
                        <span style={styles.summaryValue}>{summary.totalROI.toFixed(2)}%</span>
                    </div>
                    <div style={styles.summaryItem}>
                        <span style={styles.summaryLabel}>연평균 수익률:</span>
                        <span style={styles.summaryValue}>{summary.averageAnnualROI.toFixed(2)}%</span>
                    </div>
                    <div style={styles.summaryItem}>
                        <span style={styles.summaryLabel}>자본이득률:</span>
                        <span style={styles.summaryValue}>{summary.capitalGrowth.toFixed(2)}%</span>
                    </div>
                    <div style={styles.summaryItem}>
                        <span style={styles.summaryLabel}>월 대출상환금:</span>
                        <span style={styles.summaryValue}>{formatNumber(Math.round(summary.monthlyMortgagePayment))}원</span>
                    </div>
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
                            <th style={styles.th}>연차</th>
                            <th style={styles.th}>임대수익 (원)</th>
                            <th style={styles.th}>운영비용 (원)</th>
                            <th style={styles.th}>현금흐름 (원)</th>
                            <th style={styles.th}>부동산가치 (원)</th>
                            <th style={styles.th}>단순현금수익률 (%)</th>
                            <th style={styles.th}>연간총수익률 (%)</th>
                            <th style={styles.th}>누적총수익률 (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.yearlyData.map((data, index) => (
                            <tr key={index}>
                                <td style={styles.td}>{data.year}</td>
                                <td style={styles.td}>{formatNumber(data.rentalIncome)}</td>
                                <td style={styles.td}>{formatNumber(data.expenses)}</td>
                                <td style={styles.td}>{formatNumber(data.cashflow)}</td>
                                <td style={styles.td}>{formatNumber(data.propertyValue)}</td>
                                <td style={styles.td}>{data.cashROI}</td>
                                <td style={styles.td}>{data.equityROI}</td>
                                <td style={styles.td}>{data.cumulativeROI}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={styles.tableInfo}>
                    <p><strong>단순현금수익률:</strong> 해당 연도의 현금흐름 ÷ 초기투자금액</p>
                    <p><strong>연간총수익률:</strong> (현금흐름 + 자산가치상승 + 원금상환액) ÷ 초기투자금액</p>
                    <p><strong>누적총수익률:</strong> (누적현금흐름 + 총자산가치상승) ÷ 초기투자금액</p>
                </div>
            </div>
        );
    };

    const styles = {
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: isMobile ? '15px' : '30px',
            backgroundColor: '#F5F7FF', // 투자/금융 느낌의 옅은 블루
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Arial, sans-serif',
        },
        title: {
            textAlign: 'center',
            color: '#1A2B6D',
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
            color: '#1A2B6D',
            fontSize: '14px',
            fontWeight: 'bold',
        },
        input: {
            width: '100%',
            padding: '10px',
            border: '1px solid #D1D9FF',
            borderRadius: '5px',
            fontSize: '16px',
            boxSizing: 'border-box',
        },
        button: {
            gridColumn: '1 / -1',
            padding: '12px',
            backgroundColor: '#2E5BFF',
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
            color: '#1A2B6D',
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
            borderBottom: '1px solid #D1D9FF',
        },
        summaryLabel: {
            fontWeight: 'bold',
            color: '#1A2B6D',
        },
        summaryValue: {
            color: '#2E5BFF',
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
            backgroundColor: '#2E5BFF',
            color: 'white',
            padding: isMobile ? '8px 4px' : '12px 8px',
            textAlign: 'left',
            position: 'sticky',
            top: 0,
            zIndex: 10,
        },
        td: {
            border: '1px solid #D1D9FF',
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
            color: '#1A2B6D',
            marginBottom: '10px',
            fontSize: '18px',
        },
        infoContent: {
            color: '#1A2B6D',
            fontSize: '14px',
            lineHeight: '1.6',
        },
        tableInfo: {
            marginTop: '15px',
            padding: '10px',
            backgroundColor: '#f8f9fa',
            borderRadius: '5px',
            fontSize: '13px',
            lineHeight: '1.5',
            color: '#1A2B6D'
        },
        infoBlock: {
            marginBottom: '20px',
        },
        subTitle: {
            color: '#2E5BFF',
            fontSize: '16px',
            marginBottom: '10px',
            fontWeight: 'bold',
        },
        considerationList: {
            listStyle: 'none',
            padding: '0',
            margin: '0',
            '& li': {
                padding: '5px 0',
                paddingLeft: '20px',
                position: 'relative',
                '&:before': {
                    content: '"•"',
                    position: 'absolute',
                    left: '0',
                    color: '#2E5BFF',
                }
            }
        },
        cautionList: {
            listStyle: 'none',
            padding: '0',
            margin: '0',
            fontSize: '13px',
            color: '#666',
            '& li': {
                padding: '3px 0',
                paddingLeft: '15px',
                position: 'relative',
                '&:before': {
                    content: '"-"',
                    position: 'absolute',
                    left: '0',
                }
            }
        },
        cautionBlock: {
            backgroundColor: '#FFF5F5',
            padding: '15px',
            borderRadius: '5px',
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>부동산 투자 수익률 계산기</h2>
            <div style={styles.form}>
                <div>
                    <label style={styles.label}>매입가격 (원)</label>
                    <input
                        type="number"
                        value={purchasePrice}
                        onChange={(e) => setPurchasePrice(e.target.value)}
                        style={styles.input}
                        placeholder="예: 500000000"
                    />
                </div>
                <div>
                    <label style={styles.label}>자기자본 (원)</label>
                    <input
                        type="number"
                        value={downPayment}
                        onChange={(e) => setDownPayment(e.target.value)}
                        style={styles.input}
                        placeholder="예: 200000000"
                    />
                </div>
                <div>
                    <label style={styles.label}>대출금액 (원)</label>
                    <input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        style={styles.input}
                        placeholder="예: 300000000"
                    />
                </div>
                <div>
                    <label style={styles.label}>대출금리 (%)</label>
                    <input
                        type="number"
                        value={loanRate}
                        onChange={(e) => setLoanRate(e.target.value)}
                        style={styles.input}
                        placeholder="예: 4.5"
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
                    <label style={styles.label}>월 임대료 (원)</label>
                    <input
                        type="number"
                        value={monthlyRent}
                        onChange={(e) => setMonthlyRent(e.target.value)}
                        style={styles.input}
                        placeholder="예: 1500000"
                    />
                </div>
                <div>
                    <label style={styles.label}>임대 보증금 (원)</label>
                    <input
                        type="number"
                        value={deposit}
                        onChange={(e) => setDeposit(e.target.value)}
                        style={styles.input}
                        placeholder="예: 50000000"
                    />
                </div>
                <div>
                    <label style={styles.label}>공실률 (%)</label>
                    <input
                        type="number"
                        value={vacancy}
                        onChange={(e) => setVacancy(e.target.value)}
                        style={styles.input}
                        placeholder="예: 5"
                    />
                </div>
                <div>
                    <label style={styles.label}>재산세율 (%)</label>
                    <input
                        type="number"
                        value={propertyTax}
                        onChange={(e) => setPropertyTax(e.target.value)}
                        style={styles.input}
                        placeholder="예: 0.3"
                    />
                </div>
                <div>
                    <label style={styles.label}>보험료 (연간/원)</label>
                    <input
                        type="number"
                        value={insuranceCost}
                        onChange={(e) => setInsuranceCost(e.target.value)}
                        style={styles.input}
                        placeholder="예: 500000"
                    />
                </div>
                <div>
                    <label style={styles.label}>유지보수비 (연간/원)</label>
                    <input
                        type="number"
                        value={maintenanceCost}
                        onChange={(e) => setMaintenanceCost(e.target.value)}
                        style={styles.input}
                        placeholder="예: 1200000"
                    />
                </div>
                <div>
                    <label style={styles.label}>위탁관리수수료 (%)</label>
                    <input
                        type="number"
                        value={propertyManagementFee}
                        onChange={(e) => setPropertyManagementFee(e.target.value)}
                        style={styles.input}
                        placeholder="예: 5"
                    />
                </div>
                <div>
                    <label style={styles.label}>예상 보유기간 (년)</label>
                    <input
                        type="number"
                        value={holdingPeriod}
                        onChange={(e) => setHoldingPeriod(e.target.value)}
                        style={styles.input}
                        placeholder="예: 10"
                    />
                </div>
                <div>
                    <label style={styles.label}>연간 가치상승률 (%)</label>
                    <input
                        type="number"
                        value={annualAppreciation}
                        onChange={(e) => setAnnualAppreciation(e.target.value)}
                        style={styles.input}
                        placeholder="예: 3"
                    />
                </div>
                <button onClick={calculateROI} style={styles.button}>수익률 분석하기</button>
            </div>
            {renderSummaryResults()}
            {result && (
                <div style={styles.resultContainer}>
                    <h3 style={styles.resultTitle}>연도별 수익 분석</h3>
                    <div style={styles.chartContainer}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={result.yearlyData}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" label={{ position: 'bottom' }} />
                                <YAxis 
                                    yAxisId="left"
                                    tickFormatter={(value) => formatNumber(Math.round(value / 10000)) + '만'} 
                                />
                                <Tooltip formatter={(value) => formatNumber(Math.round(value)) + '원'} />
                                <Legend />
                                <Line 
                                    yAxisId="left"
                                    type="monotone" 
                                    dataKey="propertyValue" 
                                    name="부동산 가치" 
                                    stroke="#4CAF50" 
                                    strokeWidth={2}
                                />
                                <Line 
                                    yAxisId="left"
                                    type="monotone" 
                                    dataKey="cumulativeCashflow" 
                                    name="누적 현금흐름" 
                                    stroke="#2196F3" 
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <h3 style={styles.resultTitle}>연도별 수익률 분석</h3>
                    <div style={styles.chartContainer}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={result.yearlyData}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" label={{ position: 'bottom' }} />
                                <YAxis 
                                    domain={[0, 'auto']}
                                    tickFormatter={(value) => value + '%'} 
                                />
                                <Tooltip formatter={(value) => value + '%'} />
                                <Legend />
                                <Line 
                                    type="monotone" 
                                    dataKey="cashROI" 
                                    name="현금수익률" 
                                    stroke="#FFC107" 
                                    strokeWidth={2}
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="equityROI" 
                                    name="총수익률" 
                                    stroke="#F44336" 
                                    strokeWidth={2}
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="cumulativeROI" 
                                    name="누적수익률" 
                                    stroke="#9C27B0" 
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <button
                        onClick={() => setShowDetailedResults(!showDetailedResults)}
                        style={{ ...styles.button, marginTop: '20px' }}
                    >
                        {showDetailedResults ? '상세 내역 숨기기' : '상세 내역 보기'}
                    </button>
                    {renderDetailedResults()}
                </div>
            )}
            <div style={styles.infoSection}>
                <h3 style={styles.infoTitle}>투자 수익률 지표 설명</h3>
                <div style={styles.infoContent}>
                <div style={styles.infoBlock}>
                        <h4 style={styles.subTitle}>핵심 수익률 지표</h4>
                        <p><strong>단순현금수익률:</strong> 연간 순현금흐름(임대수익 - 운영비용)을 초기 투자금액으로 나눈 비율입니다. 
                        실질적인 현금창출 능력을 보여주는 지표입니다.</p>
                        <p><strong>연간총수익률:</strong> 현금흐름, 자산가치 상승, 대출 원금상환액을 모두 고려한 해당 연도의 총 수익률입니다. 
                        투자 성과를 종합적으로 판단할 수 있는 지표입니다.</p>
                        <p><strong>누적총수익률:</strong> 투자 시작부터 현재까지의 모든 수익(누적 현금흐름 + 자산가치 상승)을 
                        고려한 총 투자성과를 나타냅니다.</p>
                    </div>

                    <div style={styles.infoBlock}>
                        <h4 style={styles.subTitle}>주요 현금흐름 항목</h4>
                        <p><strong>임대수익:</strong> 월세 수입과 보증금 운용수익(연 2% 가정)을 포함합니다.</p>
                        <p><strong>운영비용:</strong> 대출이자, 관리비, 보험료, 재산세, 수선유지비 등이 포함됩니다.</p>
                        <p><strong>자본이득:</strong> 부동산 가치 상승으로 인한 수익으로, 시장 상황에 따라 변동될 수 있습니다.</p>
                    </div>

                    <div style={styles.infoBlock}>
                        <h4 style={styles.subTitle}>투자 시 고려사항</h4>
                        <ul style={styles.considerationList}>
                            <li>레버리지(대출) 효과: 대출을 활용하면 수익률을 높일 수 있지만, 그만큼 리스크도 증가합니다.</li>
                            <li>공실 위험: 임대수요 변화나 경기침체로 인한 공실 발생 가능성을 고려해야 합니다.</li>
                            <li>유지보수: 건물 노후화에 따른 대규모 수선 필요성을 고려해야 합니다.</li>
                            <li>시장 변동성: 부동산 가격과 임대료는 시장 상황에 따라 변동될 수 있습니다.</li>
                        </ul>
                    </div>

                    <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #D1D9FF' }} />

                    <div style={styles.cautionBlock}>
                        <p style={{ color: '#e74c3c', fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>
                            * 투자 유의사항
                        </p>
                        <ul style={styles.cautionList}>
                            <li>본 계산기는 참고용이며, 실제 투자 수익은 다양한 요인에 따라 달라질 수 있습니다.</li>
                            <li>취득세, 양도소득세 등 거래 관련 세금이 미포함되어 있습니다.</li>
                            <li>금리 변동, 정부 정책 변화, 시장 상황 등 외부 요인이 반영되지 않았습니다.</li>
                            <li>정확한 투자 판단을 위해 전문가와 상담하시기를 권장합니다.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RealEstateROICalculator;