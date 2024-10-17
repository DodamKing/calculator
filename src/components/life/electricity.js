import React, { useState } from 'react';

const ElectricityBillCalculator = () => {
    const [homeSize, setHomeSize] = useState('');
    const [people, setPeople] = useState('');
    const [airconUse, setAirconUse] = useState('medium');
    const [season, setSeason] = useState('spring');
    const [bill, setBill] = useState(null);

    const calculateBill = () => {
        if (!homeSize || !people) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        // 기본 사용량 추정 (매우 대략적인 예시)
        let estimatedUsage = parseInt(homeSize) * 2 + parseInt(people) * 50;

        // 에어컨 사용량 조정
        if (airconUse === 'high') estimatedUsage += 200;
        else if (airconUse === 'medium') estimatedUsage += 100;
        else if (airconUse === 'low') estimatedUsage += 50;

        // 계절별 조정
        if (season === 'summer') estimatedUsage *= 1.3;
        else if (season === 'winter') estimatedUsage *= 1.2;

        // 요금 계산 (매우 단순화된 버전)
        let totalCharge = 0;
        if (estimatedUsage <= 200) {
            totalCharge = estimatedUsage * 93.3;
        } else if (estimatedUsage <= 400) {
            totalCharge = 200 * 93.3 + (estimatedUsage - 200) * 187.9;
        } else {
            totalCharge = 200 * 93.3 + 200 * 187.9 + (estimatedUsage - 400) * 280.6;
        }

        // 부가가치세와 전력산업기반기금 추가
        totalCharge *= 1.137;

        setBill(Math.round(totalCharge));
    };

    const styles = {
        container: {
            maxWidth: '500px',
            margin: '0 auto',
            padding: '30px',
            backgroundColor: '#f0f8ff',
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
            marginBottom: '20px',
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
            backgroundColor: '#4a90e2',
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
            backgroundColor: '#e8f0fe',
            borderRadius: '5px',
        },
        billValue: {
            fontWeight: 'bold',
            color: '#2c5282',
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
            <h2 style={styles.title}>전기요금 예측 계산기</h2>
            <div style={styles.inputGroup}>
                <label style={styles.label}>
                    집 크기 (m²):
                    <input
                        type="number"
                        value={homeSize}
                        onChange={(e) => setHomeSize(e.target.value)}
                        style={styles.input}
                        placeholder="예: 60"
                    />
                </label>
            </div>
            <div style={styles.inputGroup}>
                <label style={styles.label}>
                    거주인 수:
                    <input
                        type="number"
                        value={people}
                        onChange={(e) => setPeople(e.target.value)}
                        style={styles.input}
                        placeholder="예: 3"
                    />
                </label>
            </div>
            <div style={styles.inputGroup}>
                <label style={styles.label}>
                    에어컨 사용 정도:
                    <select
                        value={airconUse}
                        onChange={(e) => setAirconUse(e.target.value)}
                        style={styles.select}
                    >
                        <option value="high">많이 사용</option>
                        <option value="medium">보통 사용</option>
                        <option value="low">적게 사용</option>
                    </select>
                </label>
            </div>
            <div style={styles.inputGroup}>
                <label style={styles.label}>
                    계절:
                    <select
                        value={season}
                        onChange={(e) => setSeason(e.target.value)}
                        style={styles.select}
                    >
                        <option value="spring">봄/가을</option>
                        <option value="summer">여름</option>
                        <option value="winter">겨울</option>
                    </select>
                </label>
            </div>
            <button onClick={calculateBill} style={styles.button}>예상 요금 계산</button>
            {bill !== null && (
                <div style={styles.resultContainer}>
                    <p>예상 전기요금:</p>
                    <p style={styles.billValue}>{bill.toLocaleString()}원</p>
                </div>
            )}
            <p style={styles.infoText}>
                이 계산기는 대략적인 예상치를 제공합니다. 실제 요금은 사용 패턴, 가전제품 효율 등 다양한 요인에 따라 크게 달라질 수 있습니다.
            </p>
        </div>
    );
};

export default ElectricityBillCalculator;