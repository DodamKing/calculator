import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, Receipt, ArrowDownUp, PlusCircle, MinusCircle, Building2, ArrowRight } from 'lucide-react';

const VATCalculator = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [totalSales, setTotalSales] = useState('');
    const [totalPurchases, setTotalPurchases] = useState('');
    const [salesVAT, setSalesVAT] = useState(null);
    const [purchaseVAT, setPurchaseVAT] = useState(null);
    const [finalVAT, setFinalVAT] = useState(null);
    const [isRefund, setIsRefund] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const calculateVAT = () => {
        const sales = parseFloat(totalSales) || 0;
        const purchases = parseFloat(totalPurchases) || 0;

        // 부가세 계산 (10%)
        const salesTax = sales * 0.1;
        const purchaseTax = purchases * 0.1;
        const finalTax = salesTax - purchaseTax;

        setSalesVAT(salesTax.toFixed(0));
        setPurchaseVAT(purchaseTax.toFixed(0));
        setFinalVAT(Math.abs(finalTax).toFixed(0));
        setIsRefund(finalTax < 0);
    };

    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const tips = [
        {
            icon: <Receipt size={20} />,
            text: "부가가치세는 매출/매입 금액의 10%입니다."
        },
        {
            icon: <ArrowDownUp size={20} />,
            text: "매출세액이 매입세액보다 크면 납부, 작으면 환급됩니다."
        },
        {
            icon: <Building2 size={20} />,
            text: "일반과세자는 분기별로 신고해야 합니다."
        },
        {
            icon: <Calculator size={20} />,
            text: "간이과세자는 연 매출 8천만원 이하인 개인사업자입니다."
        }
    ];

    const styles = {
        container: {
            margin: '0 auto',
            padding: isMobile ? '15px' : '30px',
            backgroundColor: '#EDE7F6', // 연한 보라색 배경
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Arial, sans-serif',
        },
        title: {
            textAlign: 'center',
            color: '#5E35B1', // 진한 보라색
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
            color: '#5E35B1',
            fontSize: '14px',
        },
        input: {
            width: '100%',
            padding: '10px',
            border: '1px solid #B39DDB',
            borderRadius: '5px',
            fontSize: '16px',
            boxSizing: 'border-box',
        },
        button: {
            gridColumn: '1 / -1',
            padding: '12px',
            backgroundColor: '#5E35B1',
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
            boxShadow: '0 4px 12px rgba(94, 53, 177, 0.1)',
        },
        resultGrid: {
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '20px',
            marginTop: '15px',
        },
        resultCard: {
            backgroundColor: '#F5F0FF',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #D1C4E9',
            transition: 'transform 0.2s, box-shadow 0.2s',
        },
        resultLabel: {
            color: '#5E35B1',
            fontSize: '14px',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
        },
        resultValue: {
            color: '#5E35B1',
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
            color: '#5E35B1',
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
            color: '#5E35B1',
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
            backgroundColor: '#F5F0FF',
            borderRadius: '8px',
            transition: 'transform 0.2s',
            cursor: 'pointer',
        },
        tipIcon: {
            color: '#5E35B1',
            flexShrink: 0,
            marginTop: '2px',
        },
        tipText: {
            color: '#333',
            fontSize: '14px',
            lineHeight: '1.5',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>부가가치세 계산기</h2>
            <div style={styles.form}>
                <div style={styles.fullWidth}>
                    <label style={styles.label}>매출액 (원)</label>
                    <input
                        type="number"
                        value={totalSales}
                        onChange={(e) => setTotalSales(e.target.value)}
                        style={styles.input}
                        placeholder="예: 10000000"
                    />
                </div>
                <div style={styles.fullWidth}>
                    <label style={styles.label}>매입액 (원)</label>
                    <input
                        type="number"
                        value={totalPurchases}
                        onChange={(e) => setTotalPurchases(e.target.value)}
                        style={styles.input}
                        placeholder="예: 5000000"
                    />
                </div>
                <button onClick={calculateVAT} style={styles.button}>부가세 계산하기</button>
            </div>

            {salesVAT && (
                <div style={styles.resultContainer}>
                    <div style={styles.resultHeader}>
                        부가가치세 {isRefund ? '환급' : '납부'} 내역
                    </div>
                    <div style={styles.resultGrid}>
                        <div 
                            style={styles.resultCard}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 6px 12px rgba(94, 53, 177, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={styles.resultLabel}>
                                <PlusCircle size={20} />
                                매출 부가세
                            </div>
                            <div style={styles.resultValue}>{formatNumber(salesVAT)}원</div>
                            <div style={styles.resultCompare}>
                                매출액의 10%
                            </div>
                        </div>

                        <div 
                            style={styles.resultCard}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 6px 12px rgba(94, 53, 177, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={styles.resultLabel}>
                                <MinusCircle size={20} />
                                매입 부가세
                            </div>
                            <div style={styles.resultValue}>{formatNumber(purchaseVAT)}원</div>
                            <div style={styles.resultCompare}>
                                매입액의 10%
                            </div>
                        </div>

                        <div style={styles.fullWidth}>
                            <div 
                                style={{
                                    ...styles.resultCard,
                                    backgroundColor: isRefund ? '#E8F5E9' : '#FBE9E7',
                                    border: `1px solid ${isRefund ? '#81C784' : '#FF8A65'}`,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 6px 12px rgba(94, 53, 177, 0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <div style={styles.resultLabel}>
                                    <ArrowRight size={20} />
                                    {isRefund ? '환급받을 세액' : '납부할 세액'}
                                </div>
                                <div style={{
                                    ...styles.resultValue,
                                    color: isRefund ? '#2E7D32' : '#D84315'
                                }}>
                                    {formatNumber(finalVAT)}원
                                </div>
                                <div style={styles.resultCompare}>
                                    {isRefund ? '매입세액이 매출세액보다 큽니다' : '매출세액이 매입세액보다 큽니다'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div style={styles.infoSection}>
                <div style={styles.infoItem}>
                    <div style={styles.infoTitle}>부가가치세 계산 팁</div>
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

export default VATCalculator;