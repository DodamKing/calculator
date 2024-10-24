import React, { useState, useEffect } from 'react';

const HeartRateCalculator = () => {
    const [age, setAge] = useState('');
    const [restingHeartRate, setRestingHeartRate] = useState('');
    const [result, setResult] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const calculateHeartRate = () => {
        if (!age) {
            alert('나이를 입력해주세요.');
            return;
        }

        const ageNum = parseInt(age);
        const restingHR = parseInt(restingHeartRate) || 0;
        const maxHeartRate = 220 - ageNum;
        const heartRateReserve = maxHeartRate - restingHR;

        const calculateTargetHR = (intensity) => {
            const lower = Math.round((heartRateReserve * intensity[0]) + restingHR);
            const upper = Math.round((heartRateReserve * intensity[1]) + restingHR);
            return `${lower} - ${upper}`;
        };

        setResult({
            maxHeartRate,
            zones: [
                { name: "회복 운동", range: calculateTargetHR([0.5, 0.6]), intensity: "매우 낮음" },
                { name: "체중 감량", range: calculateTargetHR([0.6, 0.7]), intensity: "낮음" },
                { name: "유산소 운동", range: calculateTargetHR([0.7, 0.8]), intensity: "중간" },
                { name: "지구력 향상", range: calculateTargetHR([0.8, 0.9]), intensity: "높음" },
                { name: "최대 운동 능력", range: calculateTargetHR([0.9, 1]), intensity: "매우 높음" }
            ]
        });
    };

    const styles = {
        container: {
            margin: '0 auto',
            padding: isMobile ? '15px' : '30px',
            backgroundColor: '#FFEBEE',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Arial, sans-serif',
        },
        title: {
            textAlign: 'center',
            color: '#C62828',
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
            color: '#C62828',
            fontSize: '14px',
        },
        input: {
            width: '100%',
            padding: '10px',
            border: '1px solid #FFCDD2',
            borderRadius: '5px',
            fontSize: '16px',
            boxSizing: 'border-box',
        },
        button: {
            gridColumn: '1 / -1',
            padding: '12px',
            backgroundColor: '#C62828',
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
            backgroundColor: '#FFCDD2',
            borderRadius: '5px',
        },
        resultText: {
            fontSize: '16px',
            marginBottom: '10px',
            color: '#C62828',
        },
        zoneContainer: {
            marginBottom: '15px',
            padding: '10px',
            backgroundColor: '#FFF',
            borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
        zoneName: {
            fontWeight: 'bold',
            color: '#C62828',
            marginBottom: '5px',
        },
        zoneDetails: {
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '14px',
        },
        zoneRange: {
            color: '#4A148C',
        },
        zoneIntensity: {
            fontStyle: 'italic',
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
            color: '#C62828',
            marginBottom: '10px',
            fontSize: '16px',
        },
        infoContent: {
            color: '#333',
            fontSize: '14px',
            whiteSpace: 'pre-line',  // 개행 처리를 위해 추가
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
            <h2 style={styles.title}>심박수 계산기</h2>
            <div style={styles.form}>
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
                    <label style={styles.label}>안정시 심박수 (선택사항)</label>
                    <input
                        style={styles.input}
                        type="number"
                        value={restingHeartRate}
                        onChange={(e) => setRestingHeartRate(e.target.value)}
                        placeholder="예: 60"
                    />
                </div>
                <button style={styles.button} onClick={calculateHeartRate}>
                    심박수 계산하기
                </button>
            </div>
            {result && (
                <div style={styles.resultContainer}>
                    <p style={styles.resultText}>최대 심박수: {result.maxHeartRate} bpm</p>
                    {result.zones.map((zone, index) => (
                        <div key={index} style={styles.zoneContainer}>
                            <div style={styles.zoneName}>{zone.name}</div>
                            <div style={styles.zoneDetails}>
                                <span style={styles.zoneRange}>{zone.range} bpm</span>
                                <span style={styles.zoneIntensity}>강도: {zone.intensity}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div style={styles.infoSection}>
                <InfoItem 
                    title="회복 운동 (50-60%)" 
                    content="준비 운동이나 정리 운동에 적합. 근육의 피로 회복을 돕습니다. 낮은 강도로 장시간 운동이 가능합니다."
                />
                <InfoItem 
                    title="체중 감량 (60-70%)" 
                    content="지방 연소에 가장 효과적인 구간. 장시간 운동에 적합합니다. 유산소 능력을 향상시키며 전체적인 건강에 도움을 줍니다."
                />
                <InfoItem 
                    title="유산소 운동 (70-80%)" 
                    content="심폐 기능을 크게 향상시킵니다. 전반적인 체력 증진에 좋습니다. 지구력 향상과 함께 칼로리 소모도 높습니다."
                />
                <InfoItem 
                    title="지구력 향상 (80-90%)" 
                    content="운동 능력과 지구력을 크게 향상시킵니다. 고강도 인터벌 트레이닝에 적합합니다. 무산소 역치를 높이는 데 효과적입니다."
                />
                <InfoItem 
                    title="최대 운동 능력 (90-100%)" 
                    content="단기간 최대 성능을 끌어올립니다. 짧은 시간만 유지 가능합니다. 스프린트나 고강도 인터벌 트레이닝에 사용됩니다."
                />
                <InfoItem 
                    title="주의사항" 
                    content="개인의 체력 수준과 건강 상태에 따라 적절한 운동 강도가 다를 수 있습니다. 새로운 운동 프로그램을 시작하기 전에는 의사와 상담하는 것이 좋습니다."
                />
                <InfoItem 
                    title="계산 방법" 
                    content={`• 최대 심박수: Tanaka 공식 (208 - 0.7 × 나이)\n• 목표 심박수: Karvonen 공식 (심박수 예비량 방법)`}
                />
            </div>
        </div>
    );
};

export default HeartRateCalculator;