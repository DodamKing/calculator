import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from 'recharts';

const RentVsBuyCalculator = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [propertyPrice, setPropertyPrice] = useState('');
    const [monthlyRent, setMonthlyRent] = useState('');
    const [deposit, setDeposit] = useState('');
    const [maintenanceFee, setMaintenanceFee] = useState('');
    const [mortgageRate, setMortgageRate] = useState('');
    const [downPayment, setDownPayment] = useState('');
    const [propertyTax, setPropertyTax] = useState('');
    const [annualAppreciation, setAnnualAppreciation] = useState('');
    const [holdingPeriod, setHoldingPeriod] = useState('');
    const [result, setResult] = useState(null);
    const [showDetailedResults, setShowDetailedResults] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const calculateComparison = () => {
        // 기본 값 파싱
        const price = parseFloat(propertyPrice) || 0;
        const rent = (parseFloat(monthlyRent) || 0) * 12;
        const maintenance = (parseFloat(maintenanceFee) || 0) * 12;
        const mortgage = parseFloat(mortgageRate) || 0;
        const down = parseFloat(downPayment) || 0;
        const tax = (parseFloat(propertyTax) || 0) / 100;
        const appreciation = (parseFloat(annualAppreciation) || 0) / 100;
        const period = parseInt(holdingPeriod) || 0;

        // 대출 금액 및 월 상환액 계산
        const loanAmount = price - down;
        const monthlyRate = (mortgage / 100) / 12;
        const numberOfPayments = period * 12;
        const monthlyMortgagePayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
            (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

        let yearlyData = [];
        let rentTotal = 0;
        let buyTotal = 0;
        let propertyValue = price;

        for (let year = 1; year <= period; year++) {
            // 임대 비용
            const yearlyRent = rent + maintenance;
            rentTotal += yearlyRent;
            
            // 구매 비용
            const yearlyMortgage = monthlyMortgagePayment * 12;
            const yearlyTax = propertyValue * tax;
            const yearlyBuyCost = yearlyMortgage + yearlyTax + maintenance;
            buyTotal += yearlyBuyCost;
            
            // 자산 가치 변화
            propertyValue *= (1 + appreciation);

            yearlyData.push({
                year,
                rentCost: Math.round(yearlyRent),
                buyCost: Math.round(yearlyBuyCost),
                propertyValue: Math.round(propertyValue),
                rentAccumulated: Math.round(rentTotal),
                buyAccumulated: Math.round(buyTotal),
                equityGained: Math.round(propertyValue - price),
            });
        }

        const finalEquity = propertyValue - loanAmount;
        
        setResult({
            yearlyData,
            summary: {
                totalRentCost: rentTotal,
                totalBuyCost: buyTotal,
                finalPropertyValue: propertyValue,
                totalEquityGained: finalEquity,
                monthlyMortgagePayment,
                breakevenYear: yearlyData.find(year => 
                    year.buyAccumulated - year.rentAccumulated + year.equityGained > 0
                )?.year || '해당없음'
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
            { name: '총 임대비용', value: summary.totalRentCost },
            { name: '총 구매비용', value: summary.totalBuyCost },
            { name: '최종자산가치', value: summary.finalPropertyValue },
        ];

        return (
            <div style={styles.summaryResultContainer}>
                <h3 style={styles.resultTitle}>분석 결과 요약</h3>
                <div style={styles.chartContainer}>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <XAxis dataKey="name" />
                            <YAxis tickFormatter={(value) => formatNumber(Math.round(value / 10000)) + '만'} />
                            <Tooltip formatter={(value) => formatNumber(Math.round(value)) + '원'} />
                            <Bar dataKey="value" fill="#5C6BC0" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div style={styles.summaryContainer}>
                    <div style={styles.summaryItem}>
                        <span style={styles.summaryLabel}>월 대출상환금:</span>
                        <span style={styles.summaryValue}>{formatNumber(Math.round(summary.monthlyMortgagePayment))}원</span>
                    </div>
                    <div style={styles.summaryItem}>
                        <span style={styles.summaryLabel}>손익분기 시점:</span>
                        <span style={styles.summaryValue}>{summary.breakevenYear}년</span>
                    </div>
                    <div style={styles.summaryItem}>
                        <span style={styles.summaryLabel}>총 자산가치 증가:</span>
                        <span style={styles.summaryValue}>{formatNumber(Math.round(summary.totalEquityGained))}원</span>
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
                            <th style={styles.th}>연차 (년)</th>
                            <th style={styles.th}>연간 임대비용 (원)</th>
                            <th style={styles.th}>연간 구매비용 (원)</th>
                            <th style={styles.th}>부동산 가치 (원)</th>
                            <th style={styles.th}>누적 자산가치 상승 (원)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.yearlyData.map((data, index) => (
                            <tr key={index}>
                                <td style={styles.td}>{data.year}</td>
                                <td style={styles.td}>{formatNumber(data.rentCost)}</td>
                                <td style={styles.td}>{formatNumber(data.buyCost)}</td>
                                <td style={styles.td}>{formatNumber(data.propertyValue)}</td>
                                <td style={styles.td}>{formatNumber(data.equityGained)}</td>
                            </tr>
                        ))}
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
            backgroundColor: '#ECEFF1', // 투자/분석 느낌의 차분한 청회색
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Arial, sans-serif',
        },
        title: {
            textAlign: 'center',
            color: '#263238',
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
            color: '#37474F',
            fontSize: '14px',
            fontWeight: 'bold',
        },
        input: {
            width: '100%',
            padding: '10px',
            border: '1px solid #B0BEC5',
            borderRadius: '5px',
            fontSize: '16px',
            boxSizing: 'border-box',
        },
        button: {
            gridColumn: '1 / -1',
            padding: '12px',
            backgroundColor: '#5C6BC0', // 인디고 컬러로 변경
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
            color: '#263238',
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
            borderBottom: '1px solid #CFD8DC',
        },
        summaryLabel: {
            fontWeight: 'bold',
            color: '#37474F',
        },
        summaryValue: {
            color: '#5C6BC0',
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
            backgroundColor: '#5C6BC0',
            color: 'white',
            padding: isMobile ? '8px 4px' : '12px 8px',
            textAlign: 'left',
            position: 'sticky',
            top: 0,
            zIndex: 10,
        },
        td: {
            border: '1px solid #CFD8DC',
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
            color: '#263238',
            marginBottom: '10px',
            fontSize: '18px',
        },
        infoContent: {
            color: '#37474F',
            fontSize: '14px',
            lineHeight: '1.6',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>임대 vs 구매 분석 계산기</h2>
            <div style={styles.form}>
                <div>
                    <label style={styles.label}>매매가격 (원)</label>
                    <input
                        type="number"
                        value={propertyPrice}
                        onChange={(e) => setPropertyPrice(e.target.value)}
                        style={styles.input}
                        placeholder="예: 500000000"
                    />
                </div>
                <div>
                    <label style={styles.label}>월세 (원)</label>
                    <input
                        type="number"
                        value={monthlyRent}
                        onChange={(e) => setMonthlyRent(e.target.value)}
                        style={styles.input}
                        placeholder="예: 1000000"
                    />
                </div>
                <div>
                    <label style={styles.label}>보증금 (원)</label>
                    <input
                        type="number"
                        value={deposit}
                        onChange={(e) => setDeposit(e.target.value)}
                        style={styles.input}
                        placeholder="예: 50000000"
                    />
                </div>
                <div>
                    <label style={styles.label}>월 관리비 (원)</label>
                    <input
                        type="number"
                        value={maintenanceFee}
                        onChange={(e) => setMaintenanceFee(e.target.value)}
                        style={styles.input}
                        placeholder="예: 150000"
                    />
                </div>
                <div>
                    <label style={styles.label}>대출금리 (%)</label>
                    <input
                        type="number"
                        value={mortgageRate}
                        onChange={(e) => setMortgageRate(e.target.value)}
                        style={styles.input}
                        placeholder="예: 4.5"
                    />
                </div>
                <div>
                <label style={styles.label}>계획 보유기간 (년)</label>
                        <input
                            type="number"
                            value={holdingPeriod}
                            onChange={(e) => setHoldingPeriod(e.target.value)}
                            style={styles.input}
                            placeholder="예: 10"
                        />
                    </div>
                    <div>
                        <label style={styles.label}>자기자본 (원)</label>
                        <input
                            type="number"
                            value={downPayment}
                            onChange={(e) => setDownPayment(e.target.value)}
                            style={styles.input}
                            placeholder="예: 100000000"
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
                        <label style={styles.label}>연간 부동산 가치 상승률 (%)</label>
                        <input
                            type="number"
                            value={annualAppreciation}
                            onChange={(e) => setAnnualAppreciation(e.target.value)}
                            style={styles.input}
                            placeholder="예: 3"
                        />
                    </div>
                    <button onClick={calculateComparison} style={styles.button}>분석하기</button>
                </div>
                {renderSummaryResults()}
                {result && (
                    <div style={styles.resultContainer}>
                        <h3 style={styles.resultTitle}>연도별 비교 분석</h3>
                        <div style={styles.chartContainer}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={result.yearlyData}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="year" />
                                    <YAxis tickFormatter={(value) => formatNumber(Math.round(value / 10000)) + '만'} />
                                    <Tooltip formatter={(value) => formatNumber(value) + '원'} />
                                    <Legend />
                                    <Line type="monotone" dataKey="rentAccumulated" name="누적 임대비용" stroke="#FF7043" />
                                    <Line type="monotone" dataKey="buyAccumulated" name="누적 구매비용" stroke="#5C6BC0" />
                                    <Line type="monotone" dataKey="propertyValue" name="부동산 가치" stroke="#66BB6A" />
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
                    <h3 style={styles.infoTitle}>분석 지표 설명</h3>
                    <div style={styles.infoContent}>
                        <p><strong>손익분기점:</strong> 구매의 누적 비용이 임대의 누적 비용과 같아지는 시점입니다.</p>
                        <p><strong>자산가치 상승:</strong> 시간 경과에 따른 부동산 가치의 변화를 나타냅니다.</p>
                        <p><strong>총 비용 분석:</strong> 대출이자, 재산세, 관리비 등 모든 비용을 포함한 실질적인 주거비용을 비교합니다.</p>
                        <hr style={{ margin: '15px 0' }} />
                        <p style={{ color: '#e74c3c', fontSize: '13px' }}>
                            * 본 계산기는 참고용이며, 실제 비용과 수익은 시장 상황과 조건에 따라 달라질 수 있습니다.
                        </p>
                        <p style={{ fontSize: '13px', color: '#666' }}>
                            - 취득세, 양도세 등 거래 관련 세금 미포함
                            - 인플레이션, 금리 변동 등 거시경제 요인 미반영
                            - 개별 부동산의 특성과 입지에 따른 가치 변화 미반영
                        </p>
                    </div>
                </div>
            </div>
        );
};

export default RentVsBuyCalculator;