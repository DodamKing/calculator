import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const BodyFatCalculator = () => {
    const [gender, setGender] = useState('male');
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [waist, setWaist] = useState('');
    const [neck, setNeck] = useState('');
    const [hip, setHip] = useState('');
    const [bodyFat, setBodyFat] = useState(null);
    const [showInfo, setShowInfo] = useState(true);
    const [showGuide, setShowGuide] = useState(true);

    const calculateBodyFat = () => {
        if (!age || !height || !weight || !waist || !neck || (gender === 'female' && !hip)) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        let calculatedBodyFat;
        if (gender === 'male') {
            calculatedBodyFat = 86.010 * Math.log10(parseFloat(waist) - parseFloat(neck)) - 70.041 * Math.log10(parseFloat(height)) + 36.76;
        } else {
            calculatedBodyFat = 163.205 * Math.log10(parseFloat(waist) + parseFloat(hip) - parseFloat(neck)) - 97.684 * Math.log10(parseFloat(height)) - 78.387;
        }

        setBodyFat(Math.round(calculatedBodyFat * 10) / 10);
    };

    const getBodyFatCategory = (bf) => {
        if (gender === 'male') {
            if (bf < 6) return ['매우 낮음', '#3498db'];
            if (bf < 14) return ['적정', '#2ecc71'];
            if (bf < 18) return ['보통', '#f1c40f'];
            if (bf < 25) return ['높음', '#e67e22'];
            return ['매우 높음', '#e74c3c'];
        } else {
            if (bf < 14) return ['매우 낮음', '#3498db'];
            if (bf < 21) return ['적정', '#2ecc71'];
            if (bf < 25) return ['보통', '#f1c40f'];
            if (bf < 32) return ['높음', '#e67e22'];
            return ['매우 높음', '#e74c3c'];
        }
    };

    const getMeasurementGuide = () => {
        return (
            <div style={styles.guideBox}>
                <div 
                    style={styles.collapsibleHeader}
                    onClick={() => setShowGuide(!showGuide)}
                >
                    <div style={styles.guideTitle}>정확한 측정을 위한 가이드</div>
                    {showGuide ? 
                        <ChevronUp size={20} style={styles.chevronIcon} /> : 
                        <ChevronDown size={20} style={styles.chevronIcon} />
                    }
                </div>
                <div style={{
                    ...styles.collapsibleContent,
                    ...(showGuide ? styles.collapsibleContentActive : {})
                }}>
                    <div style={styles.guideContent}>
                        <h4 style={styles.guideSubtitle}>허리둘레 측정</h4>
                        <ul style={styles.guideList}>
                            <li>배꼽 부위를 수평으로 측정</li>
                            <li>측정 전 심호흡으로 긴장을 풀고 자연스러운 상태에서 측정</li>
                            <li>줄자가 신체를 누르지 않도록 주의</li>
                        </ul>
                        
                        <h4 style={styles.guideSubtitle}>목둘레 측정</h4>
                        <ul style={styles.guideList}>
                            <li>갑상선 아래 부위를 수평으로 측정</li>
                            <li>편안한 자세로 정면을 바라보며 측정</li>
                        </ul>
                        
                        {gender === 'female' && (
                            <>
                                <h4 style={styles.guideSubtitle}>엉덩이둘레 측정</h4>
                                <ul style={styles.guideList}>
                                    <li>엉덩이의 가장 돌출된 부위를 수평으로 측정</li>
                                    <li>양발을 모으고 선 자세에서 측정</li>
                                </ul>
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const getAnalysis = () => {
        if (!bodyFat) return null;

        const [category, color] = getBodyFatCategory(bodyFat);
        const healthyRange = gender === 'male' ? '6-17%' : '14-24%';

        return (
            <div style={styles.analysisContainer}>
                <div style={styles.categoryBox}>
                    <div style={styles.categoryTitle}>체지방률 분류</div>
                    <div style={{...styles.categoryValue, color: color}}>{category}</div>
                    <div style={styles.categoryDesc}>건강한 범위: {healthyRange}</div>
                </div>

                <div style={styles.detailBox}>
                    <h3 style={styles.detailTitle}>상세 분석</h3>
                    <div style={styles.detailGrid}>
                        <div style={styles.detailItem}>
                            <div style={styles.detailLabel}>제지방량 (추정)</div>
                            <div style={styles.detailValue}>
                                {Math.round(weight * (1 - bodyFat/100))} kg
                            </div>
                        </div>
                        <div style={styles.detailItem}>
                            <div style={styles.detailLabel}>체지방량 (추정)</div>
                            <div style={styles.detailValue}>
                                {Math.round(weight * (bodyFat/100))} kg
                            </div>
                        </div>
                    </div>
                </div>

                <div style={styles.recommendationBox}>
                    <h3 style={styles.recommendTitle}>맞춤 건강 조언</h3>
                    {bodyFat < (gender === 'male' ? 6 : 14) ? (
                        <ul style={styles.recommendList}>
                            <li>현재 체지방률이 매우 낮습니다. 건강한 체지방 유지가 필요합니다.</li>
                            <li>충분한 영양 섭취와 균형 잡힌 식단을 유지하세요.</li>
                            <li>과도한 유산소 운동은 줄이고, 근력 운동을 병행하세요.</li>
                            <li>전문가와 상담하여 건강한 체지방률 관리 방안을 논의하세요.</li>
                        </ul>
                    ) : bodyFat < (gender === 'male' ? 14 : 21) ? (
                        <ul style={styles.recommendList}>
                            <li>건강한 체지방률을 유지하고 있습니다.</li>
                            <li>현재의 운동 습관과 식단을 잘 유지하세요.</li>
                            <li>정기적인 운동과 균형 잡힌 영양 섭취를 지속하세요.</li>
                        </ul>
                    ) : (
                        <ul style={styles.recommendList}>
                            <li>체지방 감소를 위한 계획적인 관리가 필요합니다.</li>
                            <li>주 3-5회 유산소 운동과 근력 운동을 병행하세요.</li>
                            <li>단백질 섭취를 충분히 하고, 당분과 포화지방 섭취를 줄이세요.</li>
                            <li>점진적인 체중 감량을 목표로 하세요 (주당 0.5-1kg).</li>
                        </ul>
                    )}
                </div>
            </div>
        );
    };

    const styles = {
        container: {
            width: '100%',
            margin: '0 auto',
            padding: '20px',
            backgroundColor: '#f5f5f5',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Arial, sans-serif',
            boxSizing: 'border-box',
        },
        title: {
            textAlign: 'left',
            color: '#333333',
            marginBottom: '20px',
        },
        infoBox: {
            backgroundColor: '#f8f9fa',
            border: '1px solid #dee2e6',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '25px',
        },
        infoTitle: {
            fontWeight: 'bold',
            color: '#495057',
            marginBottom: '10px',
        },
        infoContent: {
            fontSize: '14px',
            color: '#6c757d',
            lineHeight: '1.5',
        },
        inputGroup: {
            marginBottom: '15px',
            width: '100%',
        },
        label: {
            display: 'block',
            marginBottom: '5px',
            color: '#555555',
        },
        input: {
            width: '100%',
            padding: '10px',
            border: '1px solid #cccccc',
            borderRadius: '5px',
            fontSize: '16px',
            boxSizing: 'border-box',
        },
        select: {
            width: '100%',
            padding: '10px',
            border: '1px solid #cccccc',
            borderRadius: '5px',
            fontSize: '16px',
            backgroundColor: 'white',
            boxSizing: 'border-box',
        },
        button: {
            width: '100%',
            padding: '12px',
            backgroundColor: '#4a90e2',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
        },
        guideBox: {
            backgroundColor: '#fff',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        },
        guideTitle: {
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#4a90e2',
            marginBottom: '10px',
        },
        guideSubtitle: {
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#555',
            marginTop: '10px',
            marginBottom: '5px',
        },
        guideList: {
            margin: '0 0 10px 0',
            paddingLeft: '20px',
            fontSize: '14px',
            color: '#666',
        },
        resultContainer: {
            marginTop: '30px',
            textAlign: 'left',
            padding: '20px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        },
        bodyFatValue: {
            fontWeight: 'bold',
            fontSize: '24px',
            marginBottom: '10px',
        },
        analysisContainer: {
            marginTop: '20px',
        },
        categoryBox: {
            backgroundColor: '#f8f9fa',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '15px',
        },
        categoryTitle: {
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '5px',
        },
        categoryValue: {
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '5px',
        },
        categoryDesc: {
            fontSize: '14px',
            color: '#666',
        },
        detailBox: {
            backgroundColor: '#fff',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '15px',
        },
        detailTitle: {
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#333',
        },
        detailGrid: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
        },
        detailItem: {
            padding: '10px',
            backgroundColor: '#f8f9fa',
            borderRadius: '5px',
        },
        detailLabel: {
            fontSize: '14px',
            color: '#666',
            marginBottom: '5px',
        },
        detailValue: {
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#333',
        },
        recommendationBox: {
            backgroundColor: '#fff',
            padding: '15px',
            borderRadius: '8px',
        },
        recommendTitle: {
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#333',
        },
        recommendList: {
            margin: 0,
            paddingLeft: '20px',
            fontSize: '14px',
            color: '#666',
            lineHeight: '1.6',
        },
        collapsibleHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            padding: '10px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            marginBottom: showInfo ? '10px' : '20px',
        },
        collapsibleContent: {
            maxHeight: '0',
            overflow: 'hidden',
            transition: 'max-height 0.3s ease-out',
        },
        collapsibleContentActive: {
            maxHeight: '500px',
            transition: 'max-height 0.3s ease-in',
        },
        chevronIcon: {
            transition: 'transform 0.3s ease',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>체지방률 계산기</h2>
            
            <div style={styles.infoBox}>
                <div 
                    style={styles.collapsibleHeader}
                    onClick={() => setShowInfo(!showInfo)}
                >
                    <div style={styles.infoTitle}>측정 전 알아두세요</div>
                    {showInfo ? 
                        <ChevronUp size={20} style={styles.chevronIcon} /> : 
                        <ChevronDown size={20} style={styles.chevronIcon} />
                    }
                </div>
                <div style={{
                    ...styles.collapsibleContent,
                    ...(showInfo ? styles.collapsibleContentActive : {})
                }}>
                    <div style={styles.infoContent}>
                        · 이 계산기는 미 해군 체지방 계산법을 사용합니다.<br />
                        · 정확한 측정을 위해 아래의 측정 가이드를 참고해 주세요.<br />
                        · 가장 정확한 체지방률 측정은 전문 장비나 전문가의 도움을 받는 것입니다.
                    </div>
                </div>
            </div>

            {getMeasurementGuide()}

            <div style={styles.inputGroup}>
                <label style={styles.label}>
                    성별:
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        style={styles.select}
                    >
                        <option value="male">남성</option>
                        <option value="female">여성</option>
                    </select>
                </label>
            </div>
            <div style={styles.inputGroup}>
                <label style={styles.label}>
                    나이:
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        style={styles.input}
                        placeholder="예: 30"
                    />
                </label>
            </div>
            <div style={styles.inputGroup}>
                <label style={styles.label}>
                    키 (cm):
                    <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        style={styles.input}
                        placeholder="예: 170"
                    />
                </label>
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
                    허리둘레 (cm):
                    <input
                        type="number"
                        value={waist}
                        onChange={(e) => setWaist(e.target.value)}
                        style={styles.input}
                        placeholder="예: 80"
                    />
                </label>
            </div>
            <div style={styles.inputGroup}>
                <label style={styles.label}>
                    목둘레 (cm):
                    <input
                        type="number"
                        value={neck}
                        onChange={(e) => setNeck(e.target.value)}
                        style={styles.input}
                        placeholder="예: 35"
                    />
                </label>
            </div>
            {gender === 'female' && (
                <div style={styles.inputGroup}>
                    <label style={styles.label}>
                        엉덩이둘레 (cm):
                        <input
                            type="number"
                            value={hip}
                            onChange={(e) => setHip(e.target.value)}
                            style={styles.input}
                            placeholder="예: 100"
                        />
                    </label>
                </div>
            )}
            <button onClick={calculateBodyFat} style={styles.button}>체지방률 계산</button>
            {bodyFat !== null && (
                <div style={styles.resultContainer}>
                    <p style={styles.bodyFatValue}>당신의 체지방률: {bodyFat}%</p>
                    {getAnalysis()}
                </div>
            )}
        </div>
    );
};

export default BodyFatCalculator;