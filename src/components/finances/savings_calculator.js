import React, { useState, useEffect } from 'react';
import {
    AreaChart, Area, LineChart, Line, XAxis, YAxis,
    CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { Info, Calculator, BookOpen } from 'lucide-react';

// 금액 및 비율 포맷팅 함수
const formatters = {
    money: (value) => Math.round(value).toLocaleString('ko-KR'),
    percentage: (value) => Number(value).toFixed(2),
};

const styles = {
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '30px',
        backgroundColor: '#F1F8E9',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        textAlign: 'center',
        color: '#2E7D32',
        marginBottom: '20px',
        fontSize: '28px',
    },
    form: {
        display: 'grid',
        gap: '15px',
        gridTemplateColumns: 'repeat(2, 1fr)',
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
        outline: 'none',
    },
    inputWithUnit: {
        position: 'relative',
        width: '100%',
    },
    inputUnit: {
        position: 'absolute',
        right: '16px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#6B7280',
        fontSize: '14px',
    },
    radioGroup: {
        display: 'flex',
        gap: '20px',
        marginBottom: '20px',
    },
    tabButton: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '8px 16px',
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'all 0.3s',
    },
    tabButtonActive: {
        backgroundColor: 'white',
        color: '#059669',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
    tabButtonInactive: {
        color: '#4B5563',
        '&:hover': {
            backgroundColor: '#F3F4F6',
        },
    },
    tabsContainer: {
        display: 'flex',
        gap: '8px',
        padding: '4px',
        backgroundColor: '#F3F4F6',
        borderRadius: '8px',
        marginBottom: '24px',
    },
    card: {
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #E5E7EB',
        marginBottom: '24px',
    },
    grid: {
        display: 'grid',
        gap: '24px',
        gridTemplateColumns: '1fr',
    },
    resultGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px',
        marginBottom: '40px'  // 그리드와 차트 사이 간격
    },
    button: {
        width: '100%',
        marginTop: '24px',
        padding: '12px',
        backgroundColor: '#059669',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontSize: '16px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        '&:hover': {
            backgroundColor: '#047857',
        },
    },
    notice: {
        marginTop: '24px',
        padding: '16px',
        backgroundColor: '#EFF6FF',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '8px',
    },
    noticeText: {
        fontSize: '14px',
        color: '#1D4ED8',
    },
    guideSectionTitle: {
        fontSize: '20px',
        fontWeight: '600',
        color: '#111827',
        marginBottom: '16px',
    },
    guideContent: {
        color: '#4B5563',
        fontSize: '14px',
        lineHeight: 1.5,
    },
    list: {
        listStyle: 'disc',
        paddingLeft: '20px',
        marginTop: '12px',
    },
    listItem: {
        marginBottom: '8px',
        color: '#4B5563',
    },
    resultCard: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #E5E7EB',
        transition: 'border-color 0.2s',
        '&:hover': {
            borderColor: '#D1D5DB',
        },
    },
    resultCardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
    },
    resultCardLabel: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#374151',
    },
    resultCardValue: {
        fontSize: '24px',
        fontWeight: '700',
        color: '#059669',
    },
    resultCardDescription: {
        fontSize: '14px',
        color: '#6B7280',
        lineHeight: '1.4',
    },
    chartContainer: {
        width: '100%',
        height: '400px',
        padding: '20px 0',
    },
    chartTitle: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#374151',
        marginBottom: '16px',
    },
    resultSection: {
        marginBottom: '40px'  // 섹션 간격 조정
    },
    chartSection: {
        backgroundColor: '#F9FAFB',
        padding: '24px',
        borderRadius: '8px',
        border: '1px solid #E5E7EB'
    },
    guideContainer: {
        backgroundColor: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid #E5E7EB',
    },
    guideSection: {
        padding: '24px',
        borderBottom: '1px solid #E5E7EB',
    },
    guideSectionLast: {
        padding: '24px',
    },
    guideTitle: {
        fontSize: '24px',
        fontWeight: '600',
        color: '#111827',
        marginBottom: '24px',
    },
    guideSubTitle: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#374151',
        marginBottom: '16px',
    },
    guideTerm: {
        padding: '20px',
        backgroundColor: '#F9FAFB',
        borderRadius: '8px',
        marginBottom: '16px',
    },
    guideTermTitle: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#059669',
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    guideTermContent: {
        fontSize: '14px',
        color: '#4B5563',
        lineHeight: '1.6',
    },
    guideTipList: {
        paddingLeft: '24px',
        marginTop: '16px',
    },
    guideTipItem: {
        fontSize: '14px',
        color: '#4B5563',
        lineHeight: '1.6',
        marginBottom: '12px',
        position: 'relative',
        paddingLeft: '8px',
    },
    tipIcon: {
        width: '20px',
        height: '20px',
        color: '#059669',
    }
};

// 모바일 스타일 조정
const getMobileStyles = (isMobile) => ({
    container: {
        ...styles.container,
        padding: isMobile ? '15px' : '30px',
    },
    title: {
        ...styles.title,
        fontSize: isMobile ? '24px' : '28px',
    },
    form: {
        ...styles.form,
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
    },
    resultCardValue: {
        ...styles.resultCardValue,
        fontSize: isMobile ? '20px' : '24px',
    },
    resultCardLabel: {
        ...styles.resultCardLabel,
        fontSize: isMobile ? '14px' : '16px',
    },
    chartContainer: {
        ...styles.chartContainer,
        height: isMobile ? '300px' : '400px',
    },
});

const InputGroup = ({ label, children, tooltip }) => (
    <div style={styles.inputGroup}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label style={styles.label}>{label}</label>
            {tooltip && (
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <Info style={{ width: '16px', height: '16px', color: '#9CA3AF' }} />
                    <div style={{
                        position: 'absolute',
                        bottom: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        marginBottom: '8px',
                        padding: '8px 12px',
                        backgroundColor: '#1F2937',
                        color: 'white',
                        fontSize: '12px',
                        borderRadius: '6px',
                        whiteSpace: 'nowrap',
                        opacity: 0,
                        visibility: 'hidden',
                        transition: 'opacity 0.3s',
                        zIndex: 10,
                    }}>
                        {tooltip}
                    </div>
                </div>
            )}
        </div>
        {children}
    </div>
);

const ResultCard = ({ label, value, description, isMobile }) => (
    <div style={styles.resultCard}>
        <div style={styles.resultCardHeader}>
            <span style={getMobileStyles(isMobile).resultCardLabel}>{label}</span>
            <span style={getMobileStyles(isMobile).resultCardValue}>{value}</span>
        </div>
        {description && (
            <p style={styles.resultCardDescription}>{description}</p>
        )}
    </div>
);

const Notice = ({ children }) => (
    <div style={styles.notice}>
        <Info style={{ width: '20px', height: '20px', color: '#3B82F6', marginTop: '2px' }} />
        <p style={styles.noticeText}>{children}</p>
    </div>
);

// Y축 값 포맷팅 함수 개선
const formatYAxis = (value) => {
    if (value >= 100000000) {
        return `${(value / 100000000).toFixed(0)}억`;
    } else if (value >= 10000) {
        return `${(value / 10000).toFixed(0)}만`;
    }
    return value.toLocaleString();
};

const getTickInterval = (months) => {
    // 기간에 따른 눈금 간격 계산
    if (months <= 12) {
        return 1;  // 1년 이하: 매월 표시
    } else if (months <= 24) {
        return 2;  // 2년 이하: 2개월 간격
    } else if (months <= 60) {
        return 6;  // 5년 이하: 6개월 간격
    } else if (months <= 120) {
        return 12; // 10년 이하: 1년 간격
    } else {
        return 24; // 10년 초과: 2년 간격
    }
};

const AccumulationChart = ({ data, isMobile }) => {
    const months = data.length;
    const tickInterval = getTickInterval(months);
    
    // x축 포맷팅 함수
    const formatXAxis = (month) => {
        if (months > 60) {
            return `${Math.floor(month / 12)}년`;
        }
        return `${month}개월`;
    };

    return (
        <div style={styles.chartSection}>
            <h4 style={styles.chartTitle}>납입금 및 이자 누적 추이</h4>
            <ResponsiveContainer width="100%" height={350}>
                <AreaChart 
                    data={data} 
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="month"
                        tickFormatter={formatXAxis}
                        interval={isMobile ? tickInterval * 2 : tickInterval}
                        tick={{ fontSize: 12 }}
                    />
                    <YAxis
                        tickFormatter={formatYAxis}
                        tick={{ fontSize: 12 }}
                        width={60}
                    />
                    <Tooltip
                        formatter={(value) => [`${value.toLocaleString()}원`]}
                        labelFormatter={(month) => {
                            const years = Math.floor(month / 12);
                            const remainingMonths = month % 12;
                            if (years > 0) {
                                return remainingMonths > 0 
                                    ? `${years}년 ${remainingMonths}개월차` 
                                    : `${years}년차`;
                            }
                            return `${month}개월차`;
                        }}
                    />
                    <Area
                        type="monotone"
                        dataKey="deposit"
                        stackId="1"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                        name="납입금"
                    />
                    <Area
                        type="monotone"
                        dataKey="interest"
                        stackId="1"
                        stroke="#8884d8"
                        fill="#8884d8"
                        name="이자"
                    />
                </AreaChart>
            </ResponsiveContainer>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '16px', 
                marginTop: '12px',
                fontSize: '12px',
                color: '#666' 
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: '12px', height: '12px', backgroundColor: '#82ca9d', borderRadius: '2px' }} />
                    <span>납입금</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: '12px', height: '12px', backgroundColor: '#8884d8', borderRadius: '2px' }} />
                    <span>이자</span>
                </div>
            </div>
        </div>
    );
};

const InterestChart = ({ data, isMobile }) => {
    const months = data.length;
    const tickInterval = getTickInterval(months);
    
    const formatXAxis = (month) => {
        if (months > 60) {
            return `${Math.floor(month / 12)}년`;
        }
        return `${month}개월`;
    };

    return (
        <div style={styles.chartSection}>
            <h4 style={styles.chartTitle}>총액 변화 추이</h4>
            <ResponsiveContainer width="100%" height={350}>
                <LineChart 
                    data={data}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="month"
                        tickFormatter={formatXAxis}
                        interval={isMobile ? tickInterval * 2 : tickInterval}
                        tick={{ fontSize: 12 }}
                    />
                    <YAxis
                        tickFormatter={formatYAxis}
                        tick={{ fontSize: 12 }}
                        width={60}
                    />
                    <Tooltip
                        formatter={(value) => [`${value.toLocaleString()}원`]}
                        labelFormatter={(month) => {
                            const years = Math.floor(month / 12);
                            const remainingMonths = month % 12;
                            if (years > 0) {
                                return remainingMonths > 0 
                                    ? `${years}년 ${remainingMonths}개월차` 
                                    : `${years}년차`;
                            }
                            return `${month}개월차`;
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="accumulated"
                        stroke="#8884d8"
                        name="총액"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

const SavingsCalculator = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [activeTab, setActiveTab] = useState('calculator');
    const [calculationType, setCalculationType] = useState('savings');
    const [formData, setFormData] = useState({
        principal: '',
        monthlyDeposit: '',
        interestRate: '',
        term: '',
        termUnit: 'year',
        taxRate: '15.4'
    });
    const [result, setResult] = useState(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const currentStyles = getMobileStyles(isMobile);

    const handleInputChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateInputs = () => {
        if (!formData.principal || !formData.interestRate || !formData.term) {
            alert('필수 입력값을 모두 입력해주세요.');
            return false;
        }
        if (calculationType === 'savings' && !formData.monthlyDeposit) {
            alert('월 납입금을 입력해주세요.');
            return false;
        }
        return true;
    };

    const calculateInterest = () => {
        if (!validateInputs()) return;

        const amount = parseFloat(formData.principal) || 0;
        const monthly = parseFloat(formData.monthlyDeposit) || 0;
        const rate = parseFloat(formData.interestRate) || 0;
        const tax = parseFloat(formData.taxRate) || 15.4;

        let months = parseInt(formData.term) || 0;
        if (formData.termUnit === 'year') {
            months *= 12;
        }

        let totalDeposit = amount;
        let totalInterest = 0;
        let monthlyResults = [];
        let monthlyRate = rate / 12 / 100;

        if (calculationType === 'savings') {
            let accumulatedAmount = amount;
            for (let i = 0; i < months; i++) {
                const monthInterest = accumulatedAmount * monthlyRate;
                totalInterest += monthInterest;
                accumulatedAmount += monthInterest;
                accumulatedAmount += monthly;
                totalDeposit += monthly;

                monthlyResults.push({
                    month: i + 1,
                    deposit: totalDeposit,
                    interest: totalInterest,
                    accumulated: accumulatedAmount,
                    monthlyInterest: monthInterest // 월별 이자 추가
                });
            }
        } else {
            let accumulatedAmount = amount;
            for (let i = 0; i < months; i++) {
                const monthInterest = accumulatedAmount * monthlyRate;
                totalInterest += monthInterest;
                accumulatedAmount += monthInterest;

                monthlyResults.push({
                    month: i + 1,
                    deposit: amount,
                    interest: totalInterest,
                    accumulated: accumulatedAmount,
                    monthlyInterest: monthInterest
                });
            }
        }

        const taxAmount = totalInterest * (tax / 100);
        const afterTaxInterest = totalInterest - taxAmount;

        setResult({
            totalDeposit,
            totalInterest,
            taxAmount,
            afterTaxInterest,
            totalAmount: totalDeposit + afterTaxInterest,
            effectiveRate: (afterTaxInterest / totalDeposit * 100 * (12 / months)).toFixed(2),
            monthlyResults
        });
    };

    const renderCalculator = () => {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={styles.card}>
                    <div style={styles.radioGroup}>
                        {[
                            { id: 'savings', label: '적금' },
                            { id: 'deposit', label: '예금' }
                        ].map(type => (
                            <button
                                key={type.id}
                                onClick={() => setCalculationType(type.id)}
                                style={{
                                    flex: 1,
                                    padding: '12px 16px',
                                    borderRadius: '8px',
                                    border: '2px solid',
                                    borderColor: calculationType === type.id ? '#059669' : 'transparent',
                                    backgroundColor: calculationType === type.id ? '#F0FDF4' : '#F9FAFB',
                                    color: calculationType === type.id ? '#059669' : '#4B5563',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s'
                                }}
                            >
                                {type.label}
                            </button>
                        ))}
                    </div>

                    <div style={currentStyles.form}>
                        <InputGroup
                            label={calculationType === 'savings' ? '초기 납입금' : '예치금액'}
                            tooltip="원금을 입력해주세요"
                        >
                            <div style={styles.inputWithUnit}>
                                <input
                                    type="number"
                                    value={formData.principal}
                                    onChange={(e) => handleInputChange('principal', e.target.value)}
                                    style={styles.input}
                                    placeholder="예: 1000000"
                                />
                                <span style={styles.inputUnit}>원</span>
                            </div>
                        </InputGroup>

                        {calculationType === 'savings' && (
                            <InputGroup
                                label="월 납입금"
                                tooltip="매월 납입할 금액을 입력해주세요"
                            >
                                <div style={styles.inputWithUnit}>
                                    <input
                                        type="number"
                                        value={formData.monthlyDeposit}
                                        onChange={(e) => handleInputChange('monthlyDeposit', e.target.value)}
                                        style={styles.input}
                                        placeholder="예: 100000"
                                    />
                                    <span style={styles.inputUnit}>원</span>
                                </div>
                            </InputGroup>
                        )}

                        <InputGroup
                            label="연이율"
                            tooltip="연간 이자율을 입력해주세요"
                        >
                            <div style={styles.inputWithUnit}>
                                <input
                                    type="number"
                                    value={formData.interestRate}
                                    onChange={(e) => handleInputChange('interestRate', e.target.value)}
                                    style={styles.input}
                                    placeholder="예: 3.5"
                                />
                                <span style={styles.inputUnit}>%</span>
                            </div>
                        </InputGroup>

                        <InputGroup
                            label="기간"
                            tooltip="투자 기간을 선택해주세요"
                        >
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <input
                                    type="number"
                                    value={formData.term}
                                    onChange={(e) => handleInputChange('term', e.target.value)}
                                    style={{ ...styles.input, flex: 2 }}
                                    placeholder="예: 1"
                                />
                                <select
                                    value={formData.termUnit}
                                    onChange={(e) => handleInputChange('termUnit', e.target.value)}
                                    style={{ ...styles.input, flex: 1 }}
                                >
                                    <option value="year">년</option>
                                    <option value="month">개월</option>
                                </select>
                            </div>
                        </InputGroup>
                    </div>

                    <button
                        onClick={calculateInterest}
                        style={styles.button}
                    >
                        계산하기
                    </button>
                </div>

                {result && (
                    <div style={styles.card}>
                        <h3 style={styles.guideSectionTitle}>계산 결과</h3>

                        {/* 주요 결과 */}
                        <div style={styles.resultSection}>
                            <ResultCard
                                label="총 수령액"
                                value={`${formatters.money(result.totalAmount)}원`}
                                description="원금과 세후이자를 합한 최종 수령금액"
                                isMobile={isMobile}
                            />
                        </div>

                        {/* 상세 결과 */}
                        <div style={{
                            ...styles.resultGrid,
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)'
                        }}>
                            <ResultCard
                                label="총 납입금액"
                                value={`${formatters.money(result.totalDeposit)}원`}
                                description="납입한 원금의 총액"
                                isMobile={isMobile}
                            />
                            <ResultCard
                                label="세전이자"
                                value={`${formatters.money(result.totalInterest)}원`}
                                description="과세 전 총 이자금액"
                                isMobile={isMobile}
                            />
                            <ResultCard
                                label="세후이자"
                                value={`${formatters.money(result.afterTaxInterest)}원`}
                                description="실제 수령하는 이자금액"
                                isMobile={isMobile}
                            />
                            <ResultCard
                                label="이자과세"
                                value={`${formatters.money(result.taxAmount)}원`}
                                description="이자소득세 + 지방소득세"
                                isMobile={isMobile}
                            />
                            <ResultCard
                                label="실효수익률"
                                value={`${result.effectiveRate}%`}
                                description="세후 연간 수익률"
                                isMobile={isMobile}
                            />
                        </div>

                        {/* 그래프 */}
                        {calculationType === 'savings' ? (
                            <AccumulationChart data={result.monthlyResults} isMobile={isMobile} />
                        ) : (
                            <InterestChart data={result.monthlyResults} isMobile={isMobile} />
                        )}

                        <Notice style={{ marginTop: '48px' }}>
                            본 계산기는 월복리 방식으로 계산되며, 실제 금융상품과는 이자 지급 주기 및 계산 방식에 따라 차이가 있을 수 있습니다.
                        </Notice>
                    </div>
                )}
            </div>
        );
    };

    const renderGuide = () => (
        <div style={styles.guideContainer}>
            {/* 용어 설명 섹션 */}
            <div style={styles.guideSection}>
                <h3 style={styles.guideTitle}>금융상품 이해하기</h3>
                
                <div style={styles.guideTerm}>
                    <h4 style={styles.guideTermTitle}>
                        <span style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '12px',
                            backgroundColor: '#E6F7F1',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#059669',
                            fontSize: '14px',
                            fontWeight: 'bold'
                        }}>1</span>
                        적금과 예금의 차이
                    </h4>
                    <p style={styles.guideTermContent}>
                        적금은 매월 일정액을 납입하는 방식이고, 예금은 목돈을 한 번에 맡기는 방식입니다.
                        적금은 분할 납입으로 부담이 적고, 예금은 한번에 큰 금액을 맡겨 이자수익을 얻을 수 있습니다.
                    </p>
                </div>
    
                <div style={styles.guideTerm}>
                    <h4 style={styles.guideTermTitle}>
                        <span style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '12px',
                            backgroundColor: '#E6F7F1',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#059669',
                            fontSize: '14px',
                            fontWeight: 'bold'
                        }}>2</span>
                        단리와 복리
                    </h4>
                    <p style={styles.guideTermContent}>
                        단리는 원금에 대해서만 이자가 붙고, 복리는 이자에 대해서도 이자가 붙는 방식입니다.
                        복리는 장기 투자시 더 높은 수익을 기대할 수 있습니다.
                    </p>
                </div>
    
                <div style={styles.guideTerm}>
                    <h4 style={styles.guideTermTitle}>
                        <span style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '12px',
                            backgroundColor: '#E6F7F1',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#059669',
                            fontSize: '14px',
                            fontWeight: 'bold'
                        }}>3</span>
                        이자소득세
                    </h4>
                    <p style={styles.guideTermContent}>
                        이자소득세 14% + 지방소득세 1.4%로 총 15.4%가 적용됩니다.
                        단, 비과세 상품이나 세금우대 상품의 경우 세율이 달라질 수 있습니다.
                    </p>
                </div>
            </div>
    
            {/* 금융상품 선택 팁 섹션 */}
            <div style={styles.guideSectionLast}>
                <h3 style={styles.guideSubTitle}>현명한 금융상품 선택 팁</h3>
                <ul style={styles.guideTipList}>
                    {[
                        { tip: '투자 목적과 기간에 맞는 상품을 선택하세요.', detail: '목돈 마련, 노후 준비 등 목적을 명확히 하세요.' },
                        { tip: '중도해지 시 불이익을 고려하세요.', detail: '만기 유지가 어려울 경우 중도해지 이율을 꼭 확인하세요.' },
                        { tip: '비과세 혜택을 활용하세요.', detail: '청년우대, 주택청약 등 비과세 상품 자격을 확인하세요.' },
                        { tip: '우대금리 조건을 활용하세요.', detail: '급여이체, 카드실적 등으로 추가 금리를 받을 수 있습니다.' },
                    ].map((item, index) => (
                        <li key={index} style={{
                            ...styles.guideTipItem,
                            marginBottom: '16px',
                            backgroundColor: '#F9FAFB',
                            padding: '16px',
                            borderRadius: '8px',
                            border: '1px solid #E5E7EB',
                        }}>
                            <div style={{ fontWeight: '600', marginBottom: '4px', color: '#059669' }}>
                                {item.tip}
                            </div>
                            <div style={{ fontSize: '13px', color: '#6B7280' }}>
                                {item.detail}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );

    return (
        <div style={currentStyles.container}>
            <div style={styles.tabsContainer}>
                {[
                    { id: 'calculator', icon: <Calculator style={{ width: '16px', height: '16px' }} />, label: '계산기' },
                    { id: 'guide', icon: <BookOpen style={{ width: '16px', height: '16px' }} />, label: '가이드' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            ...styles.tabButton,
                            ...(activeTab === tab.id ? styles.tabButtonActive : styles.tabButtonInactive)
                        }}
                    >
                        {tab.icon}
                        <span style={{ fontWeight: '500' }}>{tab.label}</span>
                    </button>
                ))}
            </div>

            {activeTab === 'calculator' ? renderCalculator() : renderGuide()}
        </div>
    );
};

export default SavingsCalculator;