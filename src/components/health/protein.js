import React, { useState } from 'react';

const ProteinIntakeCalculator = () => {
    const [weight, setWeight] = useState('');
    const [activityLevel, setActivityLevel] = useState('sedentary');
    const [goal, setGoal] = useState('maintain');
    const [proteinIntake, setProteinIntake] = useState(null);

    const calculateProteinIntake = () => {
        const weightInKg = parseFloat(weight);
        if (isNaN(weightInKg) || weightInKg <= 0) {
            alert('올바른 체중을 입력해주세요.');
            return;
        }

        let proteinMultiplier;
        switch (activityLevel) {
            case 'sedentary': proteinMultiplier = 0.8; break;
            case 'lightlyActive': proteinMultiplier = 1.0; break;
            case 'active': proteinMultiplier = 1.2; break;
            case 'veryActive': proteinMultiplier = 1.4; break;
            default: proteinMultiplier = 0.8;
        }

        if (goal === 'loseWeight') {
            proteinMultiplier += 0.2;
        } else if (goal === 'gainMuscle') {
            proteinMultiplier += 0.4;
        }

        const recommendedProtein = weightInKg * proteinMultiplier;
        setProteinIntake(recommendedProtein.toFixed(1));
    };

    const getGoalDescription = (selectedGoal) => {
        switch (selectedGoal) {
            case 'maintain': return '현재 체중과 근육량 유지';
            case 'loseWeight': return '체중 감량 시 근육량 보존';
            case 'gainMuscle': return '근육량 증가 및 체력 향상';
            default: return '';
        }
    };

    const styles = {
        container: {
            margin: '0 auto',
            padding: '30px',
            backgroundColor: '#f0fff0',
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
        proteinValue: {
            fontWeight: 'bold',
            color: '#27ae60',
            fontSize: '24px',
        },
        goalDescription: {
            fontSize: '14px',
            color: '#7f8c8d',
            marginTop: '5px',
        },
        infoText: {
            fontSize: '14px',
            color: '#7f8c8d',
            marginTop: '20px',
            textAlign: 'center',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>단백질 섭취량 계산기</h2>
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
                    활동 수준:
                    <select
                        value={activityLevel}
                        onChange={(e) => setActivityLevel(e.target.value)}
                        style={styles.select}
                    >
                        <option value="sedentary">좌식 생활 (거의 운동 안 함)</option>
                        <option value="lightlyActive">가벼운 활동 (주 1-3회 운동)</option>
                        <option value="active">활동적 (주 3-5회 운동)</option>
                        <option value="veryActive">매우 활동적 (주 6-7회 격렬한 운동)</option>
                    </select>
                </label>
            </div>
            <div style={styles.inputGroup}>
                <label style={styles.label}>
                    목표:
                    <select
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        style={styles.select}
                    >
                        <option value="maintain">체중 유지</option>
                        <option value="loseWeight">체중 감량</option>
                        <option value="gainMuscle">근육 증가</option>
                    </select>
                </label>
                <div style={styles.goalDescription}>
                    {getGoalDescription(goal)}
                </div>
            </div>
            <button onClick={calculateProteinIntake} style={styles.button}>단백질 섭취량 계산</button>
            {proteinIntake && (
                <div style={styles.resultContainer}>
                    <p>권장 일일 단백질 섭취량:</p>
                    <p style={styles.proteinValue}>{proteinIntake}g</p>
                </div>
            )}
            <p style={styles.infoText}>
                참고: 이 계산기는 일반적인 지침을 제공합니다. 개인의 건강 상태나 특별한 요구사항에 따라 실제 필요량은 다를 수 있습니다.
            </p>
        </div>
    );
};

export default ProteinIntakeCalculator;