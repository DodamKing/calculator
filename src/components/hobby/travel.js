import React, { useState, useEffect } from 'react';

const SmartTravelPlanner = () => {
    const [destination, setDestination] = useState('');
    const [budget, setBudget] = useState('');
    const [duration, setDuration] = useState('');
    const [travelers, setTravelers] = useState('');
    const [travelStyle, setTravelStyle] = useState('moderate');
    const [season, setSeason] = useState('regular');
    const [plan, setPlan] = useState(null);

    const destinations = {
        "파리": { costIndex: 1.2, currency: "EUR" },
        "도쿄": { costIndex: 1.1, currency: "JPY" },
        "방콕": { costIndex: 0.7, currency: "THB" },
        "뉴욕": { costIndex: 1.3, currency: "USD" },
        "발리": { costIndex: 0.8, currency: "IDR" },
    };

    const travelStyles = {
        budget: 0.7,
        moderate: 1,
        luxury: 1.5
    };

    const seasons = {
        offPeak: 0.8,
        regular: 1,
        peak: 1.3
    };

    const calculatePlan = () => {
        if (!destination || !budget || !duration || !travelers) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        const dailyBudget = parseInt(budget) / parseInt(duration);
        const destInfo = destinations[destination];
        const styleMultiplier = travelStyles[travelStyle];
        const seasonMultiplier = seasons[season];

        const adjustedDailyBudget = dailyBudget * destInfo.costIndex * styleMultiplier * seasonMultiplier / parseInt(travelers);

        const accommodation = adjustedDailyBudget * 0.4;
        const food = adjustedDailyBudget * 0.25;
        const activities = adjustedDailyBudget * 0.2;
        const transport = adjustedDailyBudget * 0.1;
        const misc = adjustedDailyBudget * 0.05;

        const exchangeRate = 1300; // 예시 환율. 실제로는 API로 실시간 환율 받아와야 함
        const localCurrency = adjustedDailyBudget * exchangeRate;

        setPlan({
            dailyBudget: Math.round(adjustedDailyBudget),
            accommodation: Math.round(accommodation),
            food: Math.round(food),
            activities: Math.round(activities),
            transport: Math.round(transport),
            misc: Math.round(misc),
            localCurrency: Math.round(localCurrency),
            currencyCode: destInfo.currency
        });
    };

    const styles = {
        container: {
            maxWidth: '800px',
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
        form: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
        },
        fullWidth: {
            gridColumn: '1 / -1',
        },
        label: {
            display: 'block',
            marginBottom: '5px',
            color: '#555555',
        },
        input: {
            width: '100%',
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
            gridColumn: '1 / -1',
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
            padding: '20px',
            backgroundColor: '#e8f0fe',
            borderRadius: '5px',
        },
        resultTitle: {
            fontWeight: 'bold',
            color: '#2c5282',
            fontSize: '20px',
            marginBottom: '15px',
        },
        resultItem: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
        },
        chartContainer: {
            marginTop: '20px',
            height: '300px',
        },
        tips: {
            marginTop: '30px',
            padding: '20px',
            backgroundColor: '#e8f8e8',
            borderRadius: '5px',
        },
        tipsTitle: {
            fontWeight: 'bold',
            color: '#2c8250',
            fontSize: '18px',
            marginBottom: '10px',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>스마트 여행 플래너</h2>
            <div style={styles.form}>
                <div>
                    <label style={styles.label}>여행지</label>
                    <select style={styles.select} value={destination} onChange={(e) => setDestination(e.target.value)}>
                        <option value="">선택하세요</option>
                        {Object.keys(destinations).map(dest => (
                            <option key={dest} value={dest}>{dest}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label style={styles.label}>총 예산 (원)</label>
                    <input style={styles.input} type="number" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="예: 2000000" />
                </div>
                <div>
                    <label style={styles.label}>여행 기간 (일)</label>
                    <input style={styles.input} type="number" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="예: 7" />
                </div>
                <div>
                    <label style={styles.label}>여행자 수</label>
                    <input style={styles.input} type="number" value={travelers} onChange={(e) => setTravelers(e.target.value)} placeholder="예: 2" />
                </div>
                <div>
                    <label style={styles.label}>여행 스타일</label>
                    <select style={styles.select} value={travelStyle} onChange={(e) => setTravelStyle(e.target.value)}>
                        <option value="budget">알뜰 여행</option>
                        <option value="moderate">일반 여행</option>
                        <option value="luxury">럭셔리 여행</option>
                    </select>
                </div>
                <div>
                    <label style={styles.label}>여행 시즌</label>
                    <select style={styles.select} value={season} onChange={(e) => setSeason(e.target.value)}>
                        <option value="offPeak">비수기</option>
                        <option value="regular">일반</option>
                        <option value="peak">성수기</option>
                    </select>
                </div>
                <button style={styles.button} onClick={calculatePlan}>여행 플랜 생성</button>
            </div>

            {plan && (
                <div style={styles.resultContainer}>
                    <h3 style={styles.resultTitle}>당신의 맞춤 여행 플랜</h3>
                    <div style={styles.resultItem}>
                        <span>1일 예산:</span>
                        <span>{plan.dailyBudget.toLocaleString()}원 (약 {plan.localCurrency.toLocaleString()} {plan.currencyCode})</span>
                    </div>
                    <div style={styles.resultItem}>
                        <span>숙박비 추천:</span>
                        <span>{plan.accommodation.toLocaleString()}원/일</span>
                    </div>
                    <div style={styles.resultItem}>
                        <span>식비 추천:</span>
                        <span>{plan.food.toLocaleString()}원/일</span>
                    </div>
                    <div style={styles.resultItem}>
                        <span>활동비 추천:</span>
                        <span>{plan.activities.toLocaleString()}원/일</span>
                    </div>
                    <div style={styles.resultItem}>
                        <span>교통비 추천:</span>
                        <span>{plan.transport.toLocaleString()}원/일</span>
                    </div>
                    <div style={styles.resultItem}>
                        <span>기타 비용:</span>
                        <span>{plan.misc.toLocaleString()}원/일</span>
                    </div>
                    <div style={styles.chartContainer}>
                        {/* 여기에 차트를 추가할 수 있습니다. 예를 들어 recharts 라이브러리를 사용할 수 있습니다. */}
                    </div>
                </div>
            )}

            <div style={styles.tips}>
                <h4 style={styles.tipsTitle}>여행 팁</h4>
                <ul>
                    <li>현지 화폐로 {plan ? plan.localCurrency.toLocaleString() : 'X'} {plan ? plan.currencyCode : ''} 정도 준비하세요.</li>
                    <li>예상치 못한 상황을 대비해 총 예산의 10%를 비상금으로 따로 준비하세요.</li>
                    <li>현지 대중교통을 이용하면 교통비를 크게 절약할 수 있습니다.</li>
                    <li>호텔 조식 대신 현지 시장이나 카페에서 아침을 해결하면 비용을 줄일 수 있습니다.</li>
                    <li>박물관, 미술관 등은 무료 입장 시간이나 일자를 체크해보세요.</li>
                </ul>
            </div>
        </div>
    );
};

export default SmartTravelPlanner;