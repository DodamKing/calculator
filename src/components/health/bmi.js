import React, { useState } from 'react';

const BMICalculator = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBMI] = useState(null);
    const [bmiCategory, setBMICategory] = useState('');

    const calculateBMI = () => {
        if (weight && height) {
            const heightInMeters = height / 100;
            const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
            setBMI(bmiValue);
            setBMICategory(getBMICategory(bmiValue));
        }
    };

    const getBMICategory = (bmi) => {
        if (bmi < 18.5) return '저체중';
        if (bmi < 23) return '정상';
        if (bmi < 25) return '과체중';
        if (bmi < 30) return '비만';
        return '고도비만';
    };

    const getCategoryColor = (category) => {
        switch(category) {
            case '저체중': return '#3498db';
            case '정상': return '#2ecc71';
            case '과체중': return '#f39c12';
            case '비만': return '#e74c3c';
            case '고도비만': return '#c0392b';
            default: return '#2c3e50';
        }
    };

    const getBMIAnalysis = () => {
        if (!bmi) return null;

        const numericBmi = parseFloat(bmi);
        const idealWeightLower = (18.5 * (height/100) * (height/100)).toFixed(1);
        const idealWeightUpper = (23 * (height/100) * (height/100)).toFixed(1);
        
        // 건강 위험도 계산
        const getRiskLevel = () => {
            if (numericBmi < 16) return '매우 높음 (영양실조 위험)';
            if (numericBmi < 18.5) return '다소 높음 (영양 부족 위험)';
            if (numericBmi < 23) return '낮음';
            if (numericBmi < 25) return '다소 높음';
            if (numericBmi < 30) return '높음';
            return '매우 높음';
        };

        return (
            <div style={styles.analysisContainer}>
                <div style={styles.bmiChart}>
                    <h3 style={styles.chartTitle}>BMI 범위</h3>
                    <div style={styles.ranges}>
                        {[
                            { label: '저체중', range: '18.5 미만', color: '#3498db' },
                            { label: '정상', range: '18.5 - 22.9', color: '#2ecc71' },
                            { label: '과체중', range: '23 - 24.9', color: '#f39c12' },
                            { label: '비만', range: '25 - 29.9', color: '#e74c3c' },
                            { label: '고도비만', range: '30 이상', color: '#c0392b' }
                        ].map((item, index) => (
                            <div key={index} style={{
                                ...styles.rangeItem,
                                backgroundColor: item.color,
                                opacity: item.label === bmiCategory ? 1 : 0.7
                            }}>
                                <span style={styles.rangeLabel}>{item.label}</span>
                                <span style={styles.rangeValue}>{item.range}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={styles.analysisSection}>
                    <h3 style={styles.analysisTitle}>상세 분석</h3>
                    <div style={styles.analysisList}>
                        <div style={styles.analysisItem}>
                            <span style={styles.analysisLabel}>현재 BMI</span>
                            <span style={{
                                ...styles.analysisValue,
                                color: getCategoryColor(bmiCategory)
                            }}>{bmi}</span>
                        </div>
                        <div style={styles.analysisItem}>
                            <span style={styles.analysisLabel}>건강 위험도</span>
                            <span style={styles.analysisValue}>{getRiskLevel()}</span>
                        </div>
                        <div style={styles.analysisItem}>
                            <span style={styles.analysisLabel}>이상적인 체중 범위</span>
                            <span style={styles.analysisValue}>{idealWeightLower} - {idealWeightUpper}kg</span>
                        </div>
                    </div>
                </div>

                <div style={styles.recommendationSection}>
                    <h3 style={styles.analysisTitle}>맞춤 건강 조언</h3>
                    <div style={styles.recommendationContent}>
                        {bmiCategory === '저체중' && (
                            <ul style={styles.recommendationList}>
                                <li>단백질이 풍부한 식사를 하세요 (육류, 생선, 계란, 콩류)</li>
                                <li>건강한 지방을 섭취하세요 (견과류, 아보카도, 올리브유)</li>
                                <li>근력 운동을 통해 근육량을 늘리세요</li>
                                <li>영양사와 상담하여 적절한 영양 섭취 계획을 세우세요</li>
                            </ul>
                        )}
                        {bmiCategory === '정상' && (
                            <ul style={styles.recommendationList}>
                                <li>현재의 건강한 생활습관을 유지하세요</li>
                                <li>규칙적인 운동을 지속하세요</li>
                                <li>균형 잡힌 식단을 유지하세요</li>
                                <li>정기적인 건강검진을 받으세요</li>
                            </ul>
                        )}
                        {(bmiCategory === '과체중' || bmiCategory === '비만' || bmiCategory === '고도비만') && (
                            <ul style={styles.recommendationList}>
                                <li>적절한 칼로리 제한과 함께 균형 잡힌 식단을 계획하세요</li>
                                <li>규칙적인 유산소 운동을 시작하세요 (하루 30분 이상)</li>
                                <li>충분한 수분을 섭취하세요 (하루 2L 이상)</li>
                                <li>전문의와 상담하여 체중 감량 계획을 세우세요</li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const styles = {
        container: {
            width: '100%',
            margin: '0 auto',
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Arial, sans-serif',
            boxSizing: 'border-box',
        },
        title: {
            textAlign: 'left',
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
            width: '100%',
            padding: '10px',
            border: '1px solid #bdc3c7',
            borderRadius: '5px',
            fontSize: '16px',
            boxSizing: 'border-box',
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
            textAlign: 'left',
            padding: '20px',
            backgroundColor: '#fff',
            borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        },
        bmiValue: {
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#2c3e50',
        },
        bmiCategory: {
            fontSize: '18px',
            marginBottom: '20px',
        },
        analysisContainer: {
            marginTop: '20px',
        },
        bmiChart: {
            backgroundColor: '#fff',
            padding: '15px',
            borderRadius: '5px',
            marginBottom: '20px',
        },
        chartTitle: {
            fontSize: '18px',
            color: '#2c3e50',
            marginBottom: '15px',
        },
        ranges: {
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
        },
        rangeItem: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px',
            borderRadius: '5px',
            color: 'white',
        },
        rangeLabel: {
            fontWeight: 'bold',
        },
        rangeValue: {
            opacity: 0.9,
        },
        analysisSection: {
            backgroundColor: '#fff',
            padding: '15px',
            borderRadius: '5px',
            marginBottom: '20px',
        },
        analysisTitle: {
            fontSize: '18px',
            color: '#2c3e50',
            marginBottom: '15px',
        },
        analysisList: {
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
        },
        analysisItem: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px',
            backgroundColor: '#f8f9fa',
            borderRadius: '5px',
        },
        analysisLabel: {
            color: '#34495e',
            fontWeight: 'bold',
        },
        analysisValue: {
            color: '#2c3e50',
        },
        recommendationSection: {
            backgroundColor: '#fff',
            padding: '15px',
            borderRadius: '5px',
            marginBottom: '20px',
        },
        recommendationList: {
            margin: 0,
            paddingLeft: '20px',
            color: '#34495e',
            lineHeight: '1.6',
        },
        noticeSection: {
            backgroundColor: '#fff',
            padding: '15px',
            borderRadius: '5px',
        },
        noticeText: {
            fontSize: '14px',
            color: '#7f8c8d',
            margin: 0,
            lineHeight: '1.5',
        },
        infoBox: {
            backgroundColor: '#f1f8ff',
            border: '1px solid #bde0fe',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '25px',
            position: 'relative',
            overflow: 'hidden',
        },
        infoIcon: {
            position: 'absolute',
            top: '15px',
            left: '15px',
            width: '24px',
            height: '24px',
            backgroundColor: '#3498db',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
        },
        infoContent: {
            marginLeft: '35px',
            fontSize: '14px',
            color: '#2c3e50',
            lineHeight: '1.5',
        },
        infoTitle: {
            fontWeight: 'bold',
            marginBottom: '5px',
            color: '#3498db',
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>BMI 계산기</h2>

            <div style={styles.infoBox}>
                <div style={styles.infoIcon}>i</div>
                <div style={styles.infoContent}>
                    <div style={styles.infoTitle}>BMI 측정의 한계</div>
                    <p style={{ margin: 0 }}>
                        BMI는 체질량 지수로, 체지방을 정확히 반영하지 못할 수 있습니다. 
                        근육량, 체형, 연령, 성별 등 다양한 요소를 종합적으로 고려해야 합니다.
                    </p>
                </div>
            </div>
            
            <div style={styles.inputGroup}>
                <label style={styles.label}>
                    체중 (kg):
                    <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        style={styles.input}
                        placeholder="예: 70"
                    />
                </label>
            </div>
            <div style={styles.inputGroup}>
                <label style={styles.label}>
                    신장 (cm):
                    <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        style={styles.input}
                        placeholder="예: 170"
                    />
                </label>
            </div>
            <button 
                onClick={calculateBMI}
                style={styles.button}
            >
                BMI 계산
            </button>
            
            {bmi && (
                <div style={styles.resultContainer}>
                    <div style={styles.bmiValue}>당신의 BMI: {bmi}</div>
                    <div style={{
                        ...styles.bmiCategory,
                        color: getCategoryColor(bmiCategory)
                    }}>
                        카테고리: {bmiCategory}
                    </div>
                    {getBMIAnalysis()}
                </div>
            )}
            
        </div>
    );
};

export default BMICalculator;