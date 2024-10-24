import React, { useState, useEffect } from 'react';

const WHRCalculator = () => {
    const [waist, setWaist] = useState('');
    const [hip, setHip] = useState('');
    const [gender, setGender] = useState('male');
    const [result, setResult] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const calculateWHR = () => {
        if (!waist || !hip) {
            alert('허리 둘레와 엉덩이 둘레를 모두 입력해주세요.');
            return;
        }

        const waistValue = parseFloat(waist);
        const hipValue = parseFloat(hip);

        if (waistValue >= hipValue) {
            alert('허리 둘레는 엉덩이 둘레보다 작아야 합니다.');
            return;
        }

        const whr = waistValue / hipValue;
        let interpretation = '';

        if (gender === 'male') {
            if (whr < 0.9) interpretation = '정상';
            else if (whr < 1.0) interpretation = '과체중 위험';
            else interpretation = '비만';
        } else {
            if (whr < 0.8) interpretation = '정상';
            else if (whr < 0.85) interpretation = '과체중 위험';
            else interpretation = '비만';
        }

        setResult({ whr: whr.toFixed(2), interpretation });
    };

    const styles = {
        container: {
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
        label: {
            display: 'block',
            marginBottom: '5px',
            color: '#1565C0', // 진한 파란색
            fontSize: '14px',
        },
        input: {
            width: '100%',
            padding: '10px',
            border: '1px solid #64B5F6', // 중간 톤의 파란색
            borderRadius: '5px',
            fontSize: '16px',
            boxSizing: 'border-box',
        },
        select: {
            width: '100%',
            padding: '10px',
            border: '1px solid #64B5F6', // 중간 톤의 파란색
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
        },
        resultText: {
            fontSize: '16px',
            marginBottom: '10px',
            color: '#1565C0', // 진한 파란색
        },
        infoSection: {
            marginTop: '20px',
        },
        infoItem: {
            backgroundColor: '#FFF',
            borderRadius: '5px',
            padding: '15px',
            marginBottom: '10px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
        infoTitle: {
            fontWeight: 'bold',
            color: '#1565C0', // 진한 파란색
            marginBottom: '10px',
            fontSize: '16px',
        },
        infoContent: {
            color: '#333',
            fontSize: '14px',
            whiteSpace: 'pre-line',
        },
    };

    const InfoItem = ({ title, content }) => (
        <div style={styles.infoItem}>
            <div style={styles.infoTitle}>{title}</div>
            <div style={styles.infoContent}>{content}</div>
        </div>
    );

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>허리 엉덩이 비율(WHR) 계산기</h2>
            <div style={styles.form}>
                <div>
                    <label style={styles.label}>허리 둘레 (cm)</label>
                    <input
                        style={styles.input}
                        type="number"
                        value={waist}
                        onChange={(e) => setWaist(e.target.value)}
                        placeholder="예: 80"
                    />
                </div>
                <div>
                    <label style={styles.label}>엉덩이 둘레 (cm)</label>
                    <input
                        style={styles.input}
                        type="number"
                        value={hip}
                        onChange={(e) => setHip(e.target.value)}
                        placeholder="예: 100"
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
                <button style={styles.button} onClick={calculateWHR}>
                    WHR 계산하기
                </button>
            </div>
            {result && (
                <div style={styles.resultContainer}>
                    <p style={styles.resultText}>WHR: {result.whr}</p>
                    <p style={styles.resultText}>해석: {result.interpretation}</p>
                </div>
            )}
            <div style={styles.infoSection}>
                <InfoItem 
                    title="WHR이란?" 
                    content="허리 엉덩이 비율(Waist-to-Hip Ratio, WHR)은 복부 비만을 평가하는 지표입니다. 허리 둘레를 엉덩이 둘레로 나눈 값으로, 건강 위험을 예측하는 데 사용됩니다."
                />
                <InfoItem 
                    title="WHR 해석" 
                    content={`남성:\n0.9 미만: 정상\n0.9-1.0: 과체중 위험\n1.0 이상: 비만\n\n여성:\n0.8 미만: 정상\n0.8-0.85: 과체중 위험\n0.85 이상: 비만`}
                />
                <InfoItem 
                    title="주의사항" 
                    content="WHR은 건강 상태를 평가하는 여러 지표 중 하나입니다. 정확한 건강 평가를 위해서는 의료 전문가와 상담하시기 바랍니다."
                />
            </div>
        </div>
    );
};

export default WHRCalculator;