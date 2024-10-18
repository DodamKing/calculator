import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const SmartTravelPlanner = () => {
    const [budget, setBudget] = useState('');
    const [duration, setDuration] = useState('');
    const [travelers, setTravelers] = useState('');
    const [travelStyle, setTravelStyle] = useState('moderate');
    const [season, setSeason] = useState('regular');
    const [costLevel, setCostLevel] = useState('moderate');
    const [plan, setPlan] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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

    const costLevels = {
        veryLow: 0.5,
        low: 0.75,
        moderate: 1,
        high: 1.25,
        veryHigh: 1.5
    };

    const calculatePlan = () => {
        if (!budget || !duration || !travelers) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        const totalBudget = parseInt(budget);
        const days = parseInt(duration);
        const peopleCount = parseInt(travelers);

        const dailyBudgetPerPerson = totalBudget / days / peopleCount;
        const costMultiplier = costLevels[costLevel];
        const styleMultiplier = travelStyles[travelStyle];
        const seasonMultiplier = seasons[season];

        const adjustedDailyBudgetPerPerson = dailyBudgetPerPerson * costMultiplier * styleMultiplier * seasonMultiplier;

        const accommodation = adjustedDailyBudgetPerPerson * 0.4;
        const food = adjustedDailyBudgetPerPerson * 0.25;
        const activities = adjustedDailyBudgetPerPerson * 0.2;
        const transport = adjustedDailyBudgetPerPerson * 0.1;
        const misc = adjustedDailyBudgetPerPerson * 0.05;

        setPlan({
            dailyBudgetPerPerson: Math.round(adjustedDailyBudgetPerPerson),
            totalBudget: totalBudget,
            accommodation: Math.round(accommodation),
            food: Math.round(food),
            activities: Math.round(activities),
            transport: Math.round(transport),
            misc: Math.round(misc),
            duration: days,
            travelers: peopleCount
        });
    };

    const styles = {
        container: {
            maxWidth: isMobile ? '100%' : '800px',
            margin: '0 auto',
            padding: isMobile ? '15px' : '30px',
            backgroundColor: '#f0f8ff',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Arial, sans-serif',
        },
        title: {
            textAlign: 'center',
            color: '#333333',
            marginBottom: '20px',
            fontSize: isMobile ? '22px' : '28px',
        },
        form: {
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '20px',
        },
        formGroup: {
            display: 'flex',
            flexDirection: 'column',
        },
        label: {
            marginBottom: '5px',
            color: '#555555',
            fontSize: '14px',
        },
        input: {
            width: '100%',
            padding: '10px',
            border: '1px solid #cccccc',
            borderRadius: '5px',
            fontSize: '16px',
            height: '40px',
            boxSizing: 'border-box',
        },
        select: {
            width: '100%',
            padding: '10px',
            border: '1px solid #cccccc',
            borderRadius: '5px',
            fontSize: '16px',
            height: '40px',
            boxSizing: 'border-box',
            backgroundColor: 'white',
            appearance: 'none',
            backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right .7em top 50%',
            backgroundSize: '.65em auto',
        },
        button: {
            gridColumn: isMobile ? 'auto' : '1 / -1',
            padding: '12px',
            backgroundColor: '#4a90e2',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            height: '40px',
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
            fontSize: '18px',
            marginBottom: '15px',
        },
        resultItem: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
            fontSize: '14px',
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
        tipsList: {
            paddingLeft: '20px',
            margin: 0,
        },
        tipItem: {
            marginBottom: '10px',
            fontSize: '14px',
            lineHeight: '1.5',
        },
        chartContainer: {
            width: '100%',
            height: 300,
            marginTop: '20px',
        },
        highlight: {
            fontWeight: 'bold',
            color: '#4a90e2',
        },
    };

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

    const renderChart = () => {
        if (!plan) return null;

        const data = [
            { name: '숙박', value: plan.accommodation },
            { name: '식비', value: plan.food },
            { name: '활동', value: plan.activities },
            { name: '교통', value: plan.transport },
            { name: '기타', value: plan.misc },
        ];

        return (
            <div style={styles.chartContainer}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        );
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>스마트 여행 플래너</h2>
            <div style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>여행지 물가 수준</label>
                    <select style={styles.select} value={costLevel} onChange={(e) => setCostLevel(e.target.value)}>
                        <option value="veryLow">매우 저렴 (동남아 시골 등)</option>
                        <option value="low">저렴 (동남아 도시, 동유럽 등)</option>
                        <option value="moderate">보통 (한국 수준)</option>
                        <option value="high">비쌈 (미국, 서유럽 주요 도시 등)</option>
                        <option value="veryHigh">매우 비쌈 (스위스, 북유럽 등)</option>
                    </select>
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>총 예산 (원)</label>
                    <input style={styles.input} type="number" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="예: 2000000" />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>여행 기간 (일)</label>
                    <input style={styles.input} type="number" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="예: 7" />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>여행자 수</label>
                    <input style={styles.input} type="number" value={travelers} onChange={(e) => setTravelers(e.target.value)} placeholder="예: 2" />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>여행 스타일</label>
                    <select style={styles.select} value={travelStyle} onChange={(e) => setTravelStyle(e.target.value)}>
                        <option value="budget">알뜰 여행</option>
                        <option value="moderate">일반 여행</option>
                        <option value="luxury">럭셔리 여행</option>
                    </select>
                </div>
                <div style={styles.formGroup}>
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
                        <span>총 여행 예산:</span>
                        <span style={styles.highlight}>{plan.totalBudget.toLocaleString()}원</span>
                    </div>
                    <div style={styles.resultItem}>
                        <span>여행 기간:</span>
                        <span>{plan.duration}일</span>
                    </div>
                    <div style={styles.resultItem}>
                        <span>여행자 수:</span>
                        <span>{plan.travelers}명</span>
                    </div>
                    <div style={styles.resultItem}>
                        <span>1인 1일 예산:</span>
                        <span style={styles.highlight}>{plan.dailyBudgetPerPerson.toLocaleString()}원</span>
                    </div>
                    <div style={styles.resultItem}>
                        <span>숙박비 추천 (1인):</span>
                        <span>{plan.accommodation.toLocaleString()}원/일</span>
                    </div>
                    <div style={styles.resultItem}>
                        <span>식비 추천 (1인):</span>
                        <span>{plan.food.toLocaleString()}원/일</span>
                    </div>
                    <div style={styles.resultItem}>
                        <span>활동비 추천 (1인):</span>
                        <span>{plan.activities.toLocaleString()}원/일</span>
                    </div>
                    <div style={styles.resultItem}>
                        <span>교통비 추천 (1인):</span>
                        <span>{plan.transport.toLocaleString()}원/일</span>
                    </div>
                    <div style={styles.resultItem}>
                        <span>기타 비용 (1인):</span>
                        <span>{plan.misc.toLocaleString()}원/일</span>
                    </div>
                    {renderChart()}
                </div>
            )}

            <div style={styles.tips}>
                <h4 style={styles.tipsTitle}>여행 팁</h4>
                <ul style={styles.tipsList}>
                    <li style={styles.tipItem}>예상치 못한 상황을 대비해 총 예산의 10%를 비상금으로 따로 준비하세요.</li>
                    <li style={styles.tipItem}>현지 대중교통을 이용하면 교통비를 크게 절약할 수 있습니다.</li>
                    <li style={styles.tipItem}>호텔 조식 대신 현지 시장이나 카페에서 아침을 해결하면 비용을 줄일 수 있습니다.</li>
                    <li style={styles.tipItem}>박물관, 미술관 등은 무료 입장 시간이나 일자를 체크해보세요.</li>
                    <li style={styles.tipItem}>현지 화폐로 환전 시 수수료를 고려하세요. 대부분의 경우 현지에서 환전하는 것이 유리합니다.</li>
                </ul>
            </div>
        </div>
    );
};

export default SmartTravelPlanner;