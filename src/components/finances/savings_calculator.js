import React, { useState, useEffect } from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip as RechartsTooltip } from 'recharts';
import { Info } from 'lucide-react';

const SavingsCalculator = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [activeTab, setActiveTab] = useState('calculator'); // calculator, guide
    const [calculationType, setCalculationType] = useState('savings');
    const [principal, setPrincipal] = useState('');
    const [monthlyDeposit, setMonthlyDeposit] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [term, setTerm] = useState('');
    const [termUnit, setTermUnit] = useState('year');
    const [taxRate, setTaxRate] = useState('15.4');
    const [result, setResult] = useState(null);

    // 모바일 감지
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const Notice = ({ children }) => (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2">
            <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-700">{children}</p>
        </div>
    );

    const calculateInterest = () => {
        if (!validateInputs()) return;

        const amount = parseFloat(principal) || 0;
        const monthly = parseFloat(monthlyDeposit) || 0;
        const rate = parseFloat(interestRate) || 0;
        const tax = parseFloat(taxRate) || 15.4;
        
        let months = parseInt(term) || 0;
        if (termUnit === 'year') {
            months *= 12;
        }

        let totalDeposit = amount;
        let totalInterest = 0;
        let monthlyRate = rate / 12 / 100;
        let monthlyResults = [];

        if (calculationType === 'savings') {
            // 적금 계산 (매월 납입) - 단리 계산
            for (let i = 0; i < months; i++) {
                const monthInterest = totalDeposit * monthlyRate;
                totalInterest += monthInterest;
                totalDeposit += monthly;
                
                monthlyResults.push({
                    month: i + 1,
                    deposit: totalDeposit,
                    interest: monthInterest,
                    accumulated: totalDeposit + totalInterest
                });
            }
        } else {
            // 예금 계산 (한번에 예치) - 단리 계산
            totalInterest = amount * (rate / 100) * (months / 12);
            monthlyResults = [{
                month: months,
                deposit: amount,
                interest: totalInterest,
                accumulated: amount + totalInterest
            }];
        }

        // 세후 이자 계산
        const taxAmount = totalInterest * (tax / 100);
        const afterTaxInterest = totalInterest - taxAmount;

        setResult({
            totalDeposit,
            totalInterest,
            taxAmount,
            afterTaxInterest,
            totalAmount: totalDeposit + afterTaxInterest,
            interestRate: rate,
            monthlyRate,
            effectiveRate: (afterTaxInterest / totalDeposit * 100 * (12 / months)).toFixed(2),
            monthlyResults
        });
    };

    const validateInputs = () => {
        if (!principal || !interestRate || !term) {
            alert('필수 입력값을 모두 입력해주세요.');
            return false;
        }
        if (calculationType === 'savings' && !monthlyDeposit) {
            alert('월 납입금을 입력해주세요.');
            return false;
        }
        return true;
    };

    const formatNumber = (num) => {
        return num.toLocaleString('ko-KR');
    };

    const renderResults = () => {
        if (!result) return null;

        const chartData = [
            { name: '원금', value: result.totalDeposit, fill: '#4CAF50' },
            { name: '세후이자', value: result.afterTaxInterest, fill: '#2196F3' }
        ];

        return (
            <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-green-800 mb-6">수익 분석</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="h-64 md:h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={isMobile ? 40 : 60}
                                    outerRadius={isMobile ? 60 : 80}
                                    label
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <RechartsTooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="space-y-4">
                        <ResultItem 
                            label="총 수령액" 
                            value={`${formatNumber(result.totalAmount)}원`}
                            description="원금과 세후이자를 합한 최종 수령금액"
                        />
                        <ResultItem 
                            label="총 납입금액" 
                            value={`${formatNumber(result.totalDeposit)}원`}
                            description="납입한 원금의 총액"
                        />
                        <ResultItem 
                            label="세전이자" 
                            value={`${formatNumber(result.totalInterest)}원`}
                            description="과세 전 총 이자금액"
                        />
                        <ResultItem 
                            label="세금" 
                            value={`${formatNumber(result.taxAmount)}원`}
                            description="이자소득세 + 지방소득세"
                        />
                        <ResultItem 
                            label="세후이자" 
                            value={`${formatNumber(result.afterTaxInterest)}원`}
                            description="실제 수령하는 이자금액"
                        />
                        <ResultItem 
                            label="실효수익률" 
                            value={`${result.effectiveRate}%`}
                            description="세후 연간 수익률"
                        />
                    </div>
                </div>

                <Notice>
                    본 계산기는 단리 방식으로 계산되며, 실제 금융상품과는 차이가 있을 수 있습니다.
                </Notice>
            </div>
        );
    };

    const ResultItem = ({ label, value, description }) => (
        <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-green-800">{label}</span>
                <span className="font-bold text-green-900">{value}</span>
            </div>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    );

    const renderGuide = () => (
        <div className="mt-8 space-y-6">
            <section className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-green-800 mb-4">금융상품 용어 설명</h3>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-green-700 mb-2">적금과 예금의 차이</h4>
                        <p className="text-gray-700">적금은 매월 일정액을 납입하는 방식이고, 예금은 목돈을 한 번에 맡기는 방식입니다.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-green-700 mb-2">단리와 복리</h4>
                        <p className="text-gray-700">단리는 원금에 대해서만 이자가 붙고, 복리는 이자에 대해서도 이자가 붙는 방식입니다.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-green-700 mb-2">이자소득세</h4>
                        <p className="text-gray-700">이자소득세 14% + 지방소득세 1.4%로 총 15.4%가 적용됩니다.</p>
                    </div>
                </div>
            </section>

            <section className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-green-800 mb-4">금융상품 선택 팁</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>목적과 기간에 맞는 상품을 선택하세요.</li>
                    <li>중도해지 시 이율이 크게 떨어질 수 있으니 만기 유지가 가능한 기간을 선택하세요.</li>
                    <li>비과세 상품 자격이 되는지 확인하세요.</li>
                    <li>특판 상품이나 우대금리 조건을 잘 확인하세요.</li>
                    <li>자동이체 등 금리우대 조건을 적극 활용하세요.</li>
                </ul>
            </section>
        </div>
    );

    const styles = {
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: isMobile ? '15px' : '30px',
            backgroundColor: '#F1F8E9',  // 연한 녹색 배경
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Arial, sans-serif',
        },
        title: {
            textAlign: 'center',
            color: '#2E7D32',  // 진한 녹색
            marginBottom: '20px',
            fontSize: isMobile ? '24px' : '28px',
        },
        form: {
            display: 'grid',
            gap: '15px',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
        },
        inputGroup: {
            marginBottom: '15px',
        },
        label: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '5px',
            color: '#2E7D32',
            fontSize: '14px',
            fontWeight: 'bold',
        },
        input: {
            width: '100%',
            padding: '10px',
            border: '1px solid #81C784',
            borderRadius: '5px',
            fontSize: '16px',
            boxSizing: 'border-box',
            '&:focus': {
                borderColor: '#2E7D32',
                outline: 'none',
            },
        },
        radioGroup: {
            display: 'flex',
            gap: '20px',
            marginTop: '5px',
        },
        radioLabel: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#2E7D32',
            fontSize: '14px',
            cursor: 'pointer',
        },
        termContainer: {
            display: 'flex',
            gap: '10px',
        },
        termInput: {
            flex: 2,
            padding: '10px',
            border: '1px solid #81C784',
            borderRadius: '5px',
            fontSize: '16px',
        },
        termSelect: {
            flex: 1,
            padding: '10px',
            border: '1px solid #81C784',
            borderRadius: '5px',
            fontSize: '16px',
            backgroundColor: 'white',
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
            '&:hover': {
                backgroundColor: '#1B5E20',
            },
        },
        summaryResultContainer: {
            marginTop: '20px',
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
        chartContainer: {
            height: isMobile ? '250px' : '350px',
            marginBottom: '20px',
        },
        summaryContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
        },
        summaryItem: {
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '16px',
            padding: '10px 0',
            borderBottom: '1px solid #E8F5E9',
        },
        summaryLabel: {
            fontWeight: 'bold',
            color: '#2E7D32',
        },
        summaryValue: {
            color: '#1B5E20',
            fontWeight: 'bold',
        },
        tooltipContainer: {
            position: 'relative',
            display: 'inline-block',
            marginLeft: '4px',
            zIndex: 1000,
        },
        tooltipIcon: {
            cursor: 'pointer',
            fontSize: '16px',
        },
        tooltipText: {
            visibility: 'hidden',
            backgroundColor: '#2E7D32',
            color: 'white',
            textAlign: 'center',
            padding: '8px 12px',
            borderRadius: '6px',
            position: 'absolute',
            zIndex: 1000,
            width: isMobile ? '200px' : '250px',
            bottom: 'calc(100% + 5px)',
            right: 0,
            fontSize: '12px',
            opacity: 0,
            transition: 'opacity 0.3s',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            whiteSpace: 'normal',
            pointerEvents: 'none',
        },
        infoSection: {
            marginTop: '20px',
            padding: '15px',
            backgroundColor: 'white',
            borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
        infoTitle: {
            color: '#2E7D32',
            fontSize: '16px',
            marginBottom: '10px',
            fontWeight: 'bold',
        },
        infoContent: {
            fontSize: '14px',
            lineHeight: '1.6',
            color: '#1B5E20',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>적금/예금 이자 계산기</h2>
    
            <div style={styles.radioGroup}>
                <button
                    onClick={() => setActiveTab('calculator')}
                    style={{
                        ...styles.button,
                        backgroundColor: activeTab === 'calculator' ? '#2E7D32' : 'white',
                        color: activeTab === 'calculator' ? 'white' : '#2E7D32',
                    }}
                >
                    계산기
                </button>
                <button
                    onClick={() => setActiveTab('guide')}
                    style={{
                        ...styles.button,
                        backgroundColor: activeTab === 'guide' ? '#2E7D32' : 'white',
                        color: activeTab === 'guide' ? 'white' : '#2E7D32',
                    }}
                >
                    가이드
                </button>
            </div>
    
            {activeTab === 'calculator' ? (
                <div style={styles.summaryResultContainer}>
                    <div style={styles.form}>
                        <div style={styles.inputGroup}>
                            <div>
                                <label style={styles.label}>상품 유형</label>
                                <div style={styles.radioGroup}>
                                    <label style={styles.radioLabel}>
                                        <input
                                            type="radio"
                                            value="savings"
                                            checked={calculationType === 'savings'}
                                            onChange={(e) => setCalculationType(e.target.value)}
                                        />
                                        <span>적금</span>
                                    </label>
                                    <label style={styles.radioLabel}>
                                        <input
                                            type="radio"
                                            value="deposit"
                                            checked={calculationType === 'deposit'}
                                            onChange={(e) => setCalculationType(e.target.value)}
                                        />
                                        <span>예금</span>
                                    </label>
                                </div>
                            </div>
    
                            <div>
                                <label style={styles.label}>
                                    {calculationType === 'savings' ? '초기 납입금' : '예치금액'} (원)
                                </label>
                                <input
                                    type="number"
                                    style={styles.input}
                                    value={principal}
                                    onChange={(e) => setPrincipal(e.target.value)}
                                    placeholder="예: 1000000"
                                />
                            </div>
    
                            {calculationType === 'savings' && (
                                <div>
                                    <label style={styles.label}>월 납입금 (원)</label>
                                    <input
                                        type="number"
                                        style={styles.input}
                                        value={monthlyDeposit}
                                        onChange={(e) => setMonthlyDeposit(e.target.value)}
                                        placeholder="예: 100000"
                                    />
                                </div>
                            )}
                        </div>
    
                        <div style={styles.inputGroup}>
                            <div>
                                <label style={styles.label}>연이율 (%)</label>
                                <input
                                    type="number"
                                    style={styles.input}
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(e.target.value)}
                                    placeholder="예: 3.5"
                                />
                            </div>
    
                            <div>
                                <label style={styles.label}>기간</label>
                                <div style={styles.termContainer}>
                                    <input
                                        type="number"
                                        style={styles.termInput}
                                        value={term}
                                        onChange={(e) => setTerm(e.target.value)}
                                        placeholder="예: 1"
                                    />
                                    <select
                                        value={termUnit}
                                        onChange={(e) => setTermUnit(e.target.value)}
                                        style={styles.termSelect}
                                    >
                                        <option value="year">년</option>
                                        <option value="month">개월</option>
                                    </select>
                                </div>
                            </div>
    
                            <div>
                                <label style={styles.label}>이자소득세율 (%)</label>
                                <input
                                    type="number"
                                    style={styles.input}
                                    value={taxRate}
                                    onChange={(e) => setTaxRate(e.target.value)}
                                    placeholder="예: 15.4"
                                />
                            </div>
                        </div>
                    </div>
    
                    <button onClick={calculateInterest} style={styles.button}>
                        계산하기
                    </button>
    
                    {result && renderResults()}
                </div>
            ) : (
                <div style={styles.infoSection}>
                    <h3 style={styles.infoTitle}>금융상품 용어 설명</h3>
                    <div style={styles.infoContent}>
                        <div>
                            <h4 style={styles.infoTitle}>적금과 예금의 차이</h4>
                            <p>적금은 매월 일정액을 납입하는 방식이고, 예금은 목돈을 한 번에 맡기는 방식입니다.</p>
                        </div>
                        <div>
                            <h4 style={styles.infoTitle}>단리와 복리</h4>
                            <p>단리는 원금에 대해서만 이자가 붙고, 복리는 이자에 대해서도 이자가 붙는 방식입니다.</p>
                        </div>
                        <div>
                            <h4 style={styles.infoTitle}>이자소득세</h4>
                            <p>이자소득세 14% + 지방소득세 1.4%로 총 15.4%가 적용됩니다.</p>
                        </div>
                    </div>
    
                    <h3 style={styles.infoTitle}>금융상품 선택 팁</h3>
                    <ul style={{...styles.infoContent, paddingLeft: '20px'}}>
                        <li>목적과 기간에 맞는 상품을 선택하세요.</li>
                        <li>중도해지 시 이율이 크게 떨어질 수 있으니 만기 유지가 가능한 기간을 선택하세요.</li>
                        <li>비과세 상품 자격이 되는지 확인하세요.</li>
                        <li>특판 상품이나 우대금리 조건을 잘 확인하세요.</li>
                        <li>자동이체 등 금리우대 조건을 적극 활용하세요.</li>
                    </ul>
                </div>
            )}
    
            <div style={styles.infoSection}>
                <h3 style={styles.infoTitle}>알아두면 좋은 정보</h3>
                <div style={styles.infoContent}>
                    <section>
                        <h4 style={styles.infoTitle}>계산 방식에 대한 안내</h4>
                        <ul style={{paddingLeft: '20px'}}>
                            <li>본 계산기는 단리 방식으로 계산됩니다. 실제 금융상품은 복리로 계산될 수 있습니다.</li>
                            <li>중도해지나 중도인출은 고려하지 않은 만기시점 기준 계산입니다.</li>
                            <li>우대금리나 특별금리는 포함되지 않은 기본금리 기준입니다.</li>
                        </ul>
                    </section>
    
                    <Notice>
                        본 계산기의 결과는 참고용이며, 실제 금융상품의 수익과는 차이가 있을 수 있습니다.
                        정확한 상품 조건은 해당 금융기관에 문의하시기 바랍니다.
                    </Notice>
                </div>
            </div>
        </div>
    );
};

export default SavingsCalculator;