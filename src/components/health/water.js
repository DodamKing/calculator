import React, { useState, useEffect } from 'react';

const BodyWaterCalculator = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('male');
    const [result, setResult] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const calculateBodyWater = () => {
        if (!weight || !height || !age) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        const weightKg = parseFloat(weight);
        const heightCm = parseFloat(height);
        const ageYears = parseInt(age);

        // Watson 공식 사용
        let bodyWaterLiters;
        if (gender === 'male') {
            bodyWaterLiters = (2.447 - (0.09156 * ageYears) + (0.1074 * heightCm) + (0.3362 * weightKg)).toFixed(1);
        } else {
            bodyWaterLiters = (-2.097 + (0.1069 * heightCm) + (0.2466 * weightKg)).toFixed(1);
        }

        const bodyWaterPercentage = ((bodyWaterLiters / weightKg) * 100).toFixed(1);

        setResult({
            percentage: bodyWaterPercentage,
            amount: bodyWaterLiters
        });
    };

    const styles = {
        container: {
            maxWidth: isMobile ? '100%' : '600px',
            margin: '0 auto',
            padding: isMobile ? '15px' : '30px',
            backgroundColor: '#E3F2FD', // 밝은 파란색 배경
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Arial, sans-serif',
        },
        title: {
            textAlign: 'center',
            color: '#1565C0', // 진한 파란색
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
            color: '#1565C0', // 진한 파란색
            fontSize: '14px',
        },
        input: {
            width: '100%',
            padding: '10px',
            border: '1px solid #90CAF9', // 밝은 파란색 테두리
            borderRadius: '5px',
            fontSize: '16px',
            boxSizing: 'border-box',
        },
        select: {
            width: '100%',
            padding: '10px',
            border: '1px solid #90CAF9', // 밝은 파란색 테두리
            borderRadius: '5px',
            fontSize: '16px',
            backgroundColor: 'white',
            boxSizing: 'border-box',
        },
        button: {
            gridColumn: '1 / -1',
            padding: '12px',
            backgroundColor: '#1565C0', // 진한 파란색
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '18px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
        },
        resultContainer: {
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#BBDEFB', // 매우 밝은 파란색
            borderRadius: '5px',
            textAlign: 'center',
        },
        resultText: {
            fontSize: '18px',
            marginBottom: '10px',
            color: '#1565C0', // 진한 파란색
        },
        instructions: {
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#E1F5FE', // 매우 밝은 하늘색
            borderRadius: '5px',
            fontSize: '14px',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>체수분량 계산기</h2>
            <div style={styles.form}>
                <div>
                    <label style={styles.label}>체중 (kg)</label>
                    <input
                        style={styles.input}
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="예: 70"
                    />
                </div>
                <div>
                    <label style={styles.label}>키 (cm)</label>
                    <input
                        style={styles.input}
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="예: 170"
                    />
                </div>
                <div>
                    <label style={styles.label}>나이</label>
                    <input
                        style={styles.input}
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="예: 30"
                    />
                </div>
                <div>
                    <label style={styles.label}>성별</label>
                    <select
                        style={styles.select}
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="male">남성</option>
                        <option value="female">여성</option>
                    </select>
                </div>
                <button style={styles.button} onClick={calculateBodyWater}>
                    체수분량 계산하기
                </button>
            </div>
            {result && (
                <div style={styles.resultContainer}>
                    <p style={styles.resultText}>체수분 비율: {result.percentage}%</p>
                    <p style={styles.resultText}>체수분량: 약 {result.amount}L</p>
                </div>
            )}
            <div style={styles.instructions}>
                <h4>체수분량 계산 방법:</h4>
                <p>이 계산기는 Watson 공식을 사용합니다. Watson 공식은 체중, 키, 나이, 성별을 고려하여 총 체수분량을 추정합니다.</p>
                <h4>체수분량에 대한 정보:</h4>
                <ul>
                    <li>일반적으로 성인 남성의 체수분 비율은 약 60%, 여성은 약 50-55%입니다.</li>
                    <li>나이, 체성분 구성, 건강 상태 등에 따라 개인차가 있을 수 있습니다.</li>
                    <li>적정 체수분 유지는 건강에 중요합니다. 충분한 수분 섭취를 권장합니다.</li>
                    <li>이 계산기는 대략적인 추정치를 제공합니다. 정확한 측정은 전문 의료 장비가 필요합니다.</li>
                </ul>
            </div>
        </div>
    );
};

export default BodyWaterCalculator;