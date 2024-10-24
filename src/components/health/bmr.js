import React, { useState } from 'react';

const BMRCalculator = () => {
    const [gender, setGender] = useState('male');
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmr, setBMR] = useState(null);

    const calculateBMR = () => {
        if (!age || !height || !weight) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        let calculatedBMR;
        if (gender === 'male') {
            calculatedBMR = 88.362 + (13.397 * parseFloat(weight)) + (4.799 * parseFloat(height)) - (5.677 * parseFloat(age));
        } else {
            calculatedBMR = 447.593 + (9.247 * parseFloat(weight)) + (3.098 * parseFloat(height)) - (4.330 * parseFloat(age));
        }

        setBMR(Math.round(calculatedBMR));
    };

    const getBMRAnalysis = () => {
        if (!bmr) return null;

        // BMR 범위 분석
        const getWeightStatus = () => {
            const bmi = (parseFloat(weight) / (parseFloat(height) / 100) ** 2);
            if (bmi < 18.5) return '저체중';
            if (bmi < 23) return '정상체중';
            if (bmi < 25) return '과체중';
            return '비만';
        };

        const weightStatus = getWeightStatus();
        
        // 일일 활동별 필요 칼로리 계산
        const dailyCalories = {
            sedentary: Math.round(bmr * 1.2),
            light: Math.round(bmr * 1.375),
            moderate: Math.round(bmr * 1.55),
            active: Math.round(bmr * 1.725),
            veryActive: Math.round(bmr * 1.9)
        };

        return (
            <div style={styles.analysisContainer}>
                <div style={styles.analysisSection}>
                    <h3 style={styles.analysisTitle}>BMR 상세 분석</h3>
                    <p style={styles.analysisParagraph}>
                        <span style={styles.highlightText}>현재 상태: </span>
                        {weightStatus}
                    </p>
                    <div style={styles.analysisParagraph}>
                        <span style={styles.highlightText}>기초 대사량 구성: </span>
                        <ul style={styles.componentsList}>
                            <li>호흡, 심장박동: 약 {Math.round(bmr * 0.35)} kcal (35%)</li>
                            <li>세포 기능 유지: 약 {Math.round(bmr * 0.25)} kcal (25%)</li>
                            <li>체온 유지: 약 {Math.round(bmr * 0.2)} kcal (20%)</li>
                            <li>뇌 활동: 약 {Math.round(bmr * 0.2)} kcal (20%)</li>
                        </ul>
                    </div>
                </div>

                <div style={styles.analysisSection}>
                    <h3 style={styles.analysisTitle}>활동 수준별 일일 필요 열량</h3>
                    <div style={styles.calorieGrid}>
                        <div style={styles.calorieItem}>
                            <span style={styles.calorieLevel}>좌식 생활</span>
                            <span style={styles.calorieValue}>{dailyCalories.sedentary} kcal</span>
                            <span style={styles.calorieDesc}>운동하지 않는 사무직</span>
                        </div>
                        <div style={styles.calorieItem}>
                            <span style={styles.calorieLevel}>가벼운 활동</span>
                            <span style={styles.calorieValue}>{dailyCalories.light} kcal</span>
                            <span style={styles.calorieDesc}>주 1-3회 운동</span>
                        </div>
                        <div style={styles.calorieItem}>
                            <span style={styles.calorieLevel}>보통 활동</span>
                            <span style={styles.calorieValue}>{dailyCalories.moderate} kcal</span>
                            <span style={styles.calorieDesc}>주 3-5회 운동</span>
                        </div>
                        <div style={styles.calorieItem}>
                            <span style={styles.calorieLevel}>활동적</span>
                            <span style={styles.calorieValue}>{dailyCalories.active} kcal</span>
                            <span style={styles.calorieDesc}>주 6-7회 운동</span>
                        </div>
                        <div style={styles.calorieItem}>
                            <span style={styles.calorieLevel}>매우 활동적</span>
                            <span style={styles.calorieValue}>{dailyCalories.veryActive} kcal</span>
                            <span style={styles.calorieDesc}>운동선수 수준</span>
                        </div>
                    </div>
                </div>

                <div style={styles.analysisSection}>
                    <h3 style={styles.analysisTitle}>건강 관리 조언</h3>
                    <ul style={styles.adviceList}>
                        <li>기초대사량을 높이기 위해서는 근력 운동이 효과적입니다.</li>
                        <li>체중 조절 시 기초대사량 이하로 칼로리 섭취를 제한하면 건강에 해로울 수 있습니다.</li>
                        <li>규칙적인 운동과 충분한 수면은 기초대사량 유지에 도움이 됩니다.</li>
                        <li>나이가 들수록 기초대사량이 감소하므로, 적절한 운동이 더욱 중요해집니다.</li>
                    </ul>
                </div>
            </div>
        );
    };

    const styles = {
        container: {
            width: '100%',
            margin: '0 auto',
            padding: '20px',
            backgroundColor: '#f0f8ff',
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
        select: {
            width: '100%',
            padding: '10px',
            border: '1px solid #bdc3c7',
            borderRadius: '5px',
            fontSize: '16px',
            backgroundColor: 'white',
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
            backgroundColor: '#e8f4f8',
            borderRadius: '5px',
        },
        bmrValue: {
            fontWeight: 'bold',
            color: '#2980b9',
            fontSize: '24px',
            marginTop: '10px',
        },
        analysisContainer: {
            marginTop: '20px',
        },
        analysisSection: {
            backgroundColor: 'white',
            padding: '15px',
            marginTop: '15px',
            borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        },
        analysisTitle: {
            color: '#2c3e50',
            fontSize: '18px',
            marginBottom: '15px',
            fontWeight: 'bold',
        },
        analysisParagraph: {
            marginBottom: '10px',
            lineHeight: '1.5',
        },
        highlightText: {
            color: '#3498db',
            fontWeight: 'bold',
        },
        componentsList: {
            listStyle: 'none',
            padding: '10px 0',
            margin: 0,
        },
        calorieGrid: {
            display: 'grid',
            gap: '10px',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        },
        calorieItem: {
            padding: '10px',
            backgroundColor: '#f8f9fa',
            borderRadius: '5px',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
        },
        calorieLevel: {
            fontWeight: 'bold',
            color: '#2c3e50',
        },
        calorieValue: {
            color: '#3498db',
            fontSize: '18px',
        },
        calorieDesc: {
            fontSize: '12px',
            color: '#7f8c8d',
        },
        adviceList: {
            margin: 0,
            paddingLeft: '20px',
            lineHeight: '1.6',
            color: '#34495e',
        },
        infoText: {
            fontSize: '14px',
            color: '#7f8c8d',
            marginTop: '20px',
            lineHeight: '1.5',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>BMR (기초 대사량) 계산기</h2>
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
            <button onClick={calculateBMR} style={styles.button}>BMR 계산</button>
            {bmr && (
                <div style={styles.resultContainer}>
                    <p>당신의 기초 대사율(BMR):</p>
                    <p style={styles.bmrValue}>{bmr} 칼로리/일</p>
                    {getBMRAnalysis()}
                </div>
            )}
            <p style={styles.infoText}>
                BMR은 신체가 휴식 상태에서 생명 유지에 필요한 최소한의 에너지량입니다. 
                실제 필요 칼로리는 활동 수준에 따라 BMR보다 높습니다.
            </p>
        </div>
    );
};

export default BMRCalculator;