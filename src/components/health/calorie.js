import React, { useState } from 'react';

const CalorieCalculator = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('male');
    const [activityLevel, setActivityLevel] = useState('sedentary');
    const [calories, setCalories] = useState(null);

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

    const styles = {
        container: {
            maxWidth: '500px',
            margin: '0 auto',
            padding: '30px',
            backgroundColor: '#f8f9fa',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Arial, sans-serif',
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
        },
        input: {
            width: 'calc(100% - 22px)',
            padding: '10px',
            border: '1px solid #bdc3c7',
            borderRadius: '5px',
            fontSize: '16px',
        },
        select: {
            width: '100%',
            padding: '10px',
            border: '1px solid #bdc3c7',
            borderRadius: '5px',
            fontSize: '16px',
            backgroundColor: 'white',
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
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>칼로리 계산기</h2>
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
                    활동 수준:
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
            <button onClick={calculateCalories} style={styles.button}>칼로리 계산</button>
            {calories && (
                <div style={styles.resultContainer}>
                    <p>당신의 일일 필요 칼로리:</p>
                    <p style={styles.calorieValue}>{calories} kcal</p>
                </div>
            )}
        </div>
    );
};

export default CalorieCalculator;