import React, { useState, useEffect } from 'react';

const CalorieCalculator = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('male');
    const [activityLevel, setActivityLevel] = useState('sedentary');
    const [calories, setCalories] = useState(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const calculateCalories = () => {
        if (!weight || !height || !age) {
            alert('모든 필드를 입력해주세요.');
            return;
        }
        
        let bmr;
        if (gender === 'male') {
            bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        } else {
            bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        }

        let activityMultiplier;
        switch (activityLevel) {
            case 'sedentary': activityMultiplier = 1.2; break;
            case 'light': activityMultiplier = 1.375; break;
            case 'moderate': activityMultiplier = 1.55; break;
            case 'active': activityMultiplier = 1.725; break;
            case 'veryActive': activityMultiplier = 1.9; break;
            default: activityMultiplier = 1.2;
        }

        setCalories(Math.round(bmr * activityMultiplier));
    };

    const getActivityLevelDescription = (level) => {
        switch (level) {
            case 'sedentary': return '거의 운동하지 않음';
            case 'light': return '주 1-3회 가벼운 운동';
            case 'moderate': return '주 3-5회 중간 강도 운동';
            case 'active': return '주 6-7회 강도 높은 운동';
            case 'veryActive': return '매우 활동적이거나 육체노동';
            default: return '';
        }
    };

    const getCalorieAnalysis = () => {
        if (!calories) return null;

        const weightLoss = Math.round(calories - 500);
        const weightGain = Math.round(calories + 500);

        return (
            <>
                <div style={styles.analysisSection}>
                    <h3 style={styles.analysisTitle}>칼로리 분석</h3>
                    <p>
                        <span style={styles.analysisBold}>기초대사량(BMR):</span> 하루 동안 생명 유지에 필요한 최소한의 에너지양입니다.
                    </p>
                    <p>
                        <span style={styles.analysisBold}>체중 유지:</span> {calories} kcal
                        <br />
                        <span style={styles.analysisDetail}>현재 체중을 유지하기 위한 일일 권장 칼로리입니다.</span>
                    </p>
                    <p>
                        <span style={styles.analysisBold}>체중 감량:</span> {weightLoss} kcal
                        <br />
                        <span style={styles.analysisDetail}>주당 0.5kg 감량을 위한 일일 권장 칼로리입니다.</span>
                    </p>
                    <p>
                        <span style={styles.analysisBold}>체중 증가:</span> {weightGain} kcal
                        <br />
                        <span style={styles.analysisDetail}>주당 0.5kg 증가를 위한 일일 권장 칼로리입니다.</span>
                    </p>
                </div>
                <div style={styles.tipSection}>
                    <h3 style={styles.tipTitle}>건강한 식단 관리 팁</h3>
                    <div style={styles.tipList}>
                        <p>하루 3끼 규칙적인 식사를 하세요.</p>
                        <p>단백질, 탄수화물, 지방을 균형있게 섭취하세요.</p>
                        <p>충분한 물을 섭취하세요 (하루 2L 이상 권장).</p>
                        <p>급격한 체중 변화는 건강에 해로울 수 있으니 주의하세요.</p>
                    </div>
                </div>
            </>
        );
    };

    const styles = {
        container: {
            margin: '0 auto',
            padding: '30px',
            backgroundColor: '#f8f9fa',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Arial, sans-serif',
        },
        inputGrid: {
            display: 'grid',
            gap: '10px',
            gridTemplateColumns: windowWidth > 1024 ? '1fr 1fr 1fr' : 
                               windowWidth > 768 ? '1fr 1fr' : 
                               '1fr',
            marginBottom: '20px',
        },
        title: {
            textAlign: 'center',
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
            fontSize: '15px',  // 폰트 크기 약간 증가
            fontWeight: '500',  // 폰트 두께 증가
        },
        input: {
            width: 'calc(100% - 22px)',
            padding: '10px',
            border: '1px solid #bdc3c7',
            borderRadius: '5px',
            fontSize: '16px',
            backgroundColor: 'white',  // 배경색 추가
        },
        select: {
            width: '100%',
            padding: '10px',
            border: '1px solid #bdc3c7',
            borderRadius: '5px',
            fontSize: '16px',
            backgroundColor: 'white',
            cursor: 'pointer',  // 커서 스타일 추가
        },
        button: {
            width: '100%',
            padding: '12px',
            backgroundColor: '#27ae60',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
        },
        resultContainer: {
            marginTop: '30px',
            textAlign: 'center',
            padding: '20px',
            backgroundColor: '#e8f6e9',
            borderRadius: '5px',
        },
        calorieValue: {
            fontWeight: 'bold',
            color: '#27ae60',
            fontSize: '24px',
        },
        activityDescription: {
            fontSize: '14px',
            color: '#7f8c8d',
            marginTop: '5px',
        },
        analysisSection: {
            marginTop: '20px',
            padding: '20px',
            backgroundColor: '#fff',
            borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        },
        analysisTitle: {
            color: '#2c3e50',
            fontSize: '18px',
            marginBottom: '15px',
        },
        analysisBold: {
            fontWeight: 'bold',
            color: '#27ae60',
        },
        analysisDetail: {
            fontSize: '14px',
            color: '#7f8c8d',
            marginLeft: '15px',
        },
        tipSection: {
            marginTop: '20px',
            padding: '20px',
            backgroundColor: '#fff',
            borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        },
        tipTitle: {
            color: '#2c3e50',
            fontSize: '18px',
            marginBottom: '15px',
        },
        tipList: {
            margin: 0,
            paddingLeft: '20px',
            color: '#34495e',
            textAlign: 'left',
            lineHeight: '1.6',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>칼로리 계산기</h2>
            
            <div style={styles.inputGrid}>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>
                        체중 (kg)
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
                        신장 (cm)
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
                        나이
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
                        성별
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
                
                <div style={{...styles.inputGroup, ...styles.activityGroup}}>
                    <label style={styles.label}>
                        활동 수준
                        <select
                            value={activityLevel}
                            onChange={(e) => setActivityLevel(e.target.value)}
                            style={styles.select}
                        >
                            <option value="sedentary">좌식 생활</option>
                            <option value="light">가벼운 활동</option>
                            <option value="moderate">보통 활동</option>
                            <option value="active">활동적</option>
                            <option value="veryActive">매우 활동적</option>
                        </select>
                    </label>
                    <div style={styles.activityDescription}>
                        {getActivityLevelDescription(activityLevel)}
                    </div>
                </div>
            </div>

            <button onClick={calculateCalories} style={styles.button}>
                칼로리 계산
            </button>

            {calories && (
                <div style={styles.resultContainer}>
                    <p>당신의 일일 필요 칼로리:</p>
                    <p style={styles.calorieValue}>{calories} kcal</p>
                    {getCalorieAnalysis()}
                </div>
            )}
        </div>
    );
};

export default CalorieCalculator;