import React, { useState } from 'react';

const BodyFatCalculator = () => {
    const [gender, setGender] = useState('male');
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [waist, setWaist] = useState('');
    const [neck, setNeck] = useState('');
    const [hip, setHip] = useState('');
    const [bodyFat, setBodyFat] = useState(null);

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

    const styles = {
        container: {
            maxWidth: '500px',
            margin: '0 auto',
            padding: '30px',
            backgroundColor: '#f5f5f5', // 밝은 회색 배경
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Arial, sans-serif',
        },
        title: {
            textAlign: 'center',
            color: '#333333',
            marginBottom: '20px',
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
            width: 'calc(100% - 22px)',
            padding: '10px',
            border: '1px solid #cccccc',
            borderRadius: '5px',
            fontSize: '16px',
        },
        select: {
            width: '100%',
            padding: '10px',
            border: '1px solid #cccccc',
            borderRadius: '5px',
            fontSize: '16px',
            backgroundColor: 'white',
        },
        button: {
            width: '100%',
            padding: '12px',
            backgroundColor: '#4a90e2', // 파란색 계열의 버튼
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
            backgroundColor: '#e8f0fe', // 연한 파란색 배경
            borderRadius: '5px',
        },
        bodyFatValue: {
            fontWeight: 'bold',
            color: '#2c5282', // 진한 파란색
            fontSize: '24px',
        },
        infoText: {
            fontSize: '14px',
            color: '#666666',
            marginTop: '20px',
            textAlign: 'center',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>체지방률 계산기</h2>
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
                    <p>당신의 체지방률:</p>
                    <p style={styles.bodyFatValue}>{bodyFat}%</p>
                </div>
            )}
            <p style={styles.infoText}>
                이 계산기는 미 해군 체지방 계산법을 사용합니다. 
                정확한 체지방률 측정을 위해서는 전문가의 도움을 받는 것이 좋습니다.
            </p>
        </div>
    );
};

export default BodyFatCalculator;