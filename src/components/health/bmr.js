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

    const styles = {
        container: {
            maxWidth: '500px',
            margin: '0 auto',
            padding: '30px',
            backgroundColor: '#f0f8ff', // 연한 하늘색 배경
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
            textAlign: 'center',
            padding: '20px',
            backgroundColor: '#e8f4f8',
            borderRadius: '5px',
        },
        bmrValue: {
            fontWeight: 'bold',
            color: '#2980b9',
            fontSize: '24px',
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
            <h2 style={styles.title}>BMR (기초 대사율) 계산기</h2>
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