import React, { useState, useEffect } from 'react';
import { Wallet, Calculator, BadgePercent, Users, Heart, ArrowRight, PiggyBank, MinusCircle } from 'lucide-react';

const IncomeTaxCalculator = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [incomeType, setIncomeType] = useState('monthly'); // 'monthly' or 'yearly'
    const [income, setIncome] = useState('');
    const [dependents, setDependents] = useState('');
    const [children, setChildren] = useState('');
    const [taxAmount, setTaxAmount] = useState(null);
    const [localTaxAmount, setLocalTaxAmount] = useState(null);
    const [insurance, setInsurance] = useState(null);
    const [finalIncome, setFinalIncome] = useState(null);
    const [monthlyFinalIncome, setMonthlyFinalIncome] = useState(null);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const calculateTax = () => {
        const inputIncome = parseFloat(income) || 0;
        const dependentCount = parseFloat(dependents) || 0;
        const childrenCount = parseFloat(children) || 0;

        // 연간 소득으로 변환
        const annualIncome = incomeType === 'monthly' ? inputIncome * 12 : inputIncome;
        const monthlyIncome = incomeType === 'monthly' ? inputIncome : inputIncome / 12;

        // 기본 공제 및 인적공제 적용 (월 기준)
        const monthlyDeduction = 1500000 + (dependentCount * 150000) + (childrenCount * 200000);
        const monthlyTaxableIncome = Math.max(0, monthlyIncome - monthlyDeduction);

        // 세율 적용 (연간 소득 기준)
        let taxRate;
        if (annualIncome <= 12000000) {
            taxRate = 0.06;
        } else if (annualIncome <= 46000000) {
            taxRate = 0.15;
        } else if (annualIncome <= 88000000) {
            taxRate = 0.24;
        } else if (annualIncome <= 150000000) {
            taxRate = 0.35;
        } else {
            taxRate = 0.42;
        }

        // 월간 세금 계산
        const monthlyTax = monthlyTaxableIncome * taxRate;
        const monthlyLocalTax = monthlyTax * 0.1;
        const monthlyInsurance = monthlyIncome * 0.0899;

        // 월간 실수령액 계산
        const monthlyNet = monthlyIncome - monthlyTax - monthlyLocalTax - monthlyInsurance;

        // 연간 금액 설정 (표시용)
        setTaxAmount(Math.floor(monthlyTax));
        setLocalTaxAmount(Math.floor(monthlyLocalTax));
        setInsurance(Math.floor(monthlyInsurance));
        setFinalIncome(Math.floor(monthlyNet * 12));
        setMonthlyFinalIncome(Math.floor(monthlyNet));
    };

    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const tips = [
        {
            icon: <Users size={20} />,
            text: "부양가족 1인당 연 150,000원의 기본 공제가 적용됩니다."
        },
        {
            icon: <Heart size={20} />,
            text: "20세 이하 자녀는 추가 공제가 적용됩니다."
        },
        {
            icon: <BadgePercent size={20} />,
            text: "4대보험료는 급여의 약 9% 정도입니다."
        },
        {
            icon: <Calculator size={20} />,
            text: "정확한 세금 계산을 위해서는 국세청 홈택스를 이용하세요."
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
            color: '#1565C0',
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
            color: '#1565C0',
            fontSize: '14px',
        },
        input: {
            width: '100%',
            padding: '10px',
            border: '1px solid #64B5F6',
            borderRadius: '5px',
            fontSize: '16px',
            boxSizing: 'border-box',
        },
        select: {
            width: '100%',
            padding: '10px',
            border: '1px solid #64B5F6',
            borderRadius: '5px',
            fontSize: '16px',
            backgroundColor: 'white',
            cursor: 'pointer',
        },
        button: {
            gridColumn: '1 / -1',
            padding: '12px',
            backgroundColor: '#1565C0',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '18px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
        },
        resultContainer: {
            marginTop: '20px',
            padding: '25px',
            backgroundColor: '#FFF',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(21, 101, 192, 0.1)',
        },
        resultGrid: {
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '20px',
            marginTop: '15px',
        },
        resultCard: {
            backgroundColor: '#F5F9FF',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #BBDEFB',
            transition: 'transform 0.2s, box-shadow 0.2s',
        },
        resultLabel: {
            color: '#1565C0',
            fontSize: '14px',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
        },
        resultValue: {
            color: '#1565C0',
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
            color: '#1565C0',
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '15px',
            textAlign: 'center',
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
            color: '#1565C0',
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
            backgroundColor: '#F5F9FF',
            borderRadius: '8px',
            transition: 'transform 0.2s',
            cursor: 'pointer',
        },
        tipIcon: {
            color: '#1565C0',
            flexShrink: 0,
            marginTop: '2px',
        },
        tipText: {
            color: '#333',
            fontSize: '14px',
            lineHeight: '1.5',
        },
        finalIncomeCard: {
            gridColumn: '1 / -1',
            backgroundColor: '#E8F5E9',
            border: '1px solid #81C784',
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>월급 실수령액 계산기</h2>
            <div style={styles.form}>
                <div style={styles.fullWidth}>
                    <label style={styles.label}>급여 유형</label>
                    <select
                        value={incomeType}
                        onChange={(e) => setIncomeType(e.target.value)}
                        style={styles.select}
                    >
                        <option value="monthly">월급</option>
                        <option value="yearly">연봉</option>
                    </select>
                </div>
                <div style={styles.fullWidth}>
                    <label style={styles.label}>
                        {incomeType === 'monthly' ? '월급' : '연봉'} 총액 (원)
                    </label>
                    <input
                        type="number"
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                        style={styles.input}
                        placeholder={incomeType === 'monthly' ? '예: 3000000' : '예: 36000000'}
                    />
                </div>
                <div>
                    <label style={styles.label}>부양가족 수</label>
                    <input
                        type="number"
                        value={dependents}
                        onChange={(e) => setDependents(e.target.value)}
                        style={styles.input}
                        placeholder="예: 2"
                    />
                </div>
                <div>
                    <label style={styles.label}>20세 이하 자녀 수</label>
                    <input
                        type="number"
                        value={children}
                        onChange={(e) => setChildren(e.target.value)}
                        style={styles.input}
                        placeholder="예: 1"
                    />
                </div>
                <button onClick={calculateTax} style={styles.button}>실수령액 계산하기</button>
            </div>

            {taxAmount && (
                <div style={styles.resultContainer}>
                    <div style={styles.resultHeader}>
                        실수령액 계산 결과
                    </div>
                    <div style={styles.resultGrid}>
                        <div 
                            style={styles.resultCard}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 6px 12px rgba(21, 101, 192, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={styles.resultLabel}>
                                <MinusCircle size={20} />
                                월 근로소득세
                            </div>
                            <div style={styles.resultValue}>{formatNumber(taxAmount)}원</div>
                            <div style={styles.resultCompare}>
                                소득세법에 따른 세액
                            </div>
                        </div>

                        <div 
                            style={styles.resultCard}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 6px 12px rgba(21, 101, 192, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={styles.resultLabel}>
                                <MinusCircle size={20} />
                                월 지방소득세
                            </div>
                            <div style={styles.resultValue}>{formatNumber(localTaxAmount)}원</div>
                            <div style={styles.resultCompare}>
                                근로소득세의 10%
                            </div>
                        </div>

                        <div 
                            style={styles.resultCard}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 6px 12px rgba(21, 101, 192, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={styles.resultLabel}>
                                <MinusCircle size={20} />
                                월 4대보험
                            </div>
                            <div style={styles.resultValue}>{formatNumber(insurance)}원</div>
                            <div style={styles.resultCompare}>
                                월급의 약 8.99%
                            </div>
                        </div>

                        <div 
                            style={{...styles.resultCard}}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 6px 12px rgba(21, 101, 192, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={styles.resultLabel}>
                                <PiggyBank size={20} />
                                월 실수령액
                            </div>
                            <div style={{...styles.resultValue, color: '#2E7D32'}}>
                                {formatNumber(monthlyFinalIncome)}원
                            </div>
                            <div style={styles.resultCompare}>
                                공제 후 매월 실제 수령하는 금액
                            </div>
                        </div>

                        <div 
                            style={{...styles.resultCard, ...styles.finalIncomeCard}}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 6px 12px rgba(21, 101, 192, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={styles.resultLabel}>
                                <PiggyBank size={20} />
                                연간 실수령액
                            </div>
                            <div style={{...styles.resultValue, color: '#2E7D32'}}>
                                {formatNumber(finalIncome)}원
                            </div>
                            <div style={styles.resultCompare}>
                                연간 총 실수령액 (월 실수령액 × 12)
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div style={styles.infoSection}>
                <div style={styles.infoItem}>
                    <div style={styles.infoTitle}>세금 계산 관련 팁</div>
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

export default IncomeTaxCalculator;