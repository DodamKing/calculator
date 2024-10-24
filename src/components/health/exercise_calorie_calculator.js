import React, { useState, useEffect, useRef } from 'react';

const ExerciseCalorieCalculator = () => {
    const [weight, setWeight] = useState('');
    const [duration, setDuration] = useState('');
    const [exercise, setExercise] = useState('');
    const [result, setResult] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const exercises = {
        // 걷기/달리기
        walking_slow: { name: "걷기 (느린 속도, 3km/h)", met: 2.0 },
        walking_moderate: { name: "걷기 (보통 속도, 5km/h)", met: 3.5 },
        walking_fast: { name: "빠르게 걷기 (6.5km/h)", met: 5.0 },
        jogging: { name: "조깅 (8km/h)", met: 7.0 },
        running_8: { name: "달리기 (8km/h)", met: 8.0 },
        running_10: { name: "달리기 (10km/h)", met: 10.0 },
        running_12: { name: "달리기 (12km/h)", met: 12.5 },
        running_16: { name: "달리기 (16km/h)", met: 16.0 },

        // 자전거
        cycling_leisure: { name: "자전거 (여가, 16km/h)", met: 6.0 },
        cycling_moderate: { name: "자전거 (보통, 20km/h)", met: 8.0 },
        cycling_fast: { name: "자전거 (빠름, 25km/h)", met: 10.0 },
        cycling_racing: { name: "자전거 (레이싱, 30km/h)", met: 12.0 },

        // 수영
        swimming_leisure: { name: "수영 (여가)", met: 6.0 },
        swimming_freestyle: { name: "수영 (자유형, 보통 속도)", met: 8.0 },
        swimming_backstroke: { name: "수영 (배영)", met: 7.0 },
        swimming_breaststroke: { name: "수영 (평영)", met: 10.0 },
        swimming_butterfly: { name: "수영 (접영)", met: 11.0 },

        // 구기 운동
        basketball: { name: "농구", met: 6.5 },
        soccer: { name: "축구", met: 7.0 },
        tennis: { name: "테니스", met: 7.0 },
        volleyball: { name: "배구", met: 4.0 },
        table_tennis: { name: "탁구", met: 4.0 },
        badminton: { name: "배드민턴", met: 5.5 },

        // 실내 운동
        weightlifting_light: { name: "웨이트 트레이닝 (가벼운 강도)", met: 3.0 },
        weightlifting_moderate: { name: "웨이트 트레이닝 (중간 강도)", met: 5.0 },
        weightlifting_vigorous: { name: "웨이트 트레이닝 (높은 강도)", met: 6.0 },
        yoga: { name: "요가", met: 3.0 },
        pilates: { name: "필라테스", met: 3.5 },
        aerobics_low: { name: "에어로빅 (낮은 강도)", met: 5.0 },
        aerobics_high: { name: "에어로빅 (높은 강도)", met: 7.0 },
        dancing_ballroom: { name: "댄스 (볼룸)", met: 4.5 },
        dancing_energetic: { name: "댄스 (격렬한)", met: 6.5 },

        // 기타 운동
        rope_jumping: { name: "줄넘기", met: 10.0 },
        hiking: { name: "등산", met: 6.0 },
        martial_arts: { name: "무술", met: 10.0 },
        golf: { name: "골프", met: 4.5 },
        rowing_moderate: { name: "조정 (보통 강도)", met: 7.0 },
        rowing_vigorous: { name: "조정 (높은 강도)", met: 8.5 },
        skiing_downhill: { name: "스키 (다운힐)", met: 6.0 },
        skating_ice: { name: "아이스 스케이팅", met: 7.0 },
        horseback_riding: { name: "승마", met: 4.0 },
    };

    const calculateCalories = () => {
        if (!weight || !duration || !exercise) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        const weightKg = parseFloat(weight);
        const durationHours = parseFloat(duration) / 60; // 분을 시간으로 변환
        const met = exercises[exercise].met;

        // 칼로리 소모량 계산 공식: 칼로리 = MET × 체중(kg) × 시간(hour)
        const caloriesBurned = met * weightKg * durationHours;

        setResult({
            calories: Math.round(caloriesBurned),
            exercise: exercises[exercise].name,
            duration: duration
        });
    };

    const styles = {
        container: {
            margin: '0 auto',
            padding: isMobile ? '15px' : '30px',
            backgroundColor: '#E8F5E9',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Arial, sans-serif',
        },
        title: {
            textAlign: 'center',
            color: '#2E7D32',
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
            color: '#2E7D32',
            fontSize: '14px',
        },
        input: {
            width: '100%',
            padding: '10px',
            border: '1px solid #A5D6A7',
            borderRadius: '5px',
            fontSize: '16px',
            boxSizing: 'border-box',
        },
        select: {
            width: '100%',
            padding: '10px',
            border: '1px solid #A5D6A7',
            borderRadius: '5px',
            fontSize: '16px',
            backgroundColor: 'white',
            boxSizing: 'border-box',
        },
        optgroup: {
            fontWeight: 'bold',
        },
        button: {
            gridColumn: '1 / -1',
            padding: '12px',
            backgroundColor: '#2E7D32',
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
            backgroundColor: '#C8E6C9',
            borderRadius: '5px',
        },
        resultText: {
            fontSize: '16px',
            marginBottom: '10px',
            color: '#2E7D32',
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
            color: '#2E7D32',
            marginBottom: '10px',
            fontSize: '16px',
        },
        infoContent: {
            color: '#333',
            fontSize: '14px',
            whiteSpace: 'pre-line',
        },
        searchInput: {
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            border: '1px solid #A5D6A7',
            borderRadius: '5px',
            fontSize: '16px',
            boxSizing: 'border-box',
        },
        exerciseList: {
            maxHeight: '200px',
            overflowY: 'auto',
            border: '1px solid #A5D6A7',
            borderRadius: '5px',
            marginTop: '10px',
        },
        exerciseItem: {
            padding: '10px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
        },
        exerciseItemHover: {
            backgroundColor: '#E8F5E9',
        },
        dropdownContainer: {
            position: 'relative',
            width: '100%',
        },
        dropdownButton: {
            width: '100%',
            padding: '10px',
            border: '1px solid #A5D6A7',
            borderRadius: '5px',
            fontSize: '16px',
            backgroundColor: 'white',
            textAlign: 'left',
            cursor: 'pointer',
        },
        dropdownList: {
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            maxHeight: '200px',
            overflowY: 'auto',
            border: '1px solid #A5D6A7',
            borderRadius: '5px',
            backgroundColor: 'white',
            zIndex: 1000,
        },
        dropdownItem: {
            padding: '10px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
        },
        dropdownItemHover: {
            backgroundColor: '#E8F5E9',
        },
    };

    // const groupedExercises = {
    //     "걷기/달리기": ['walking_slow', 'walking_moderate', 'walking_fast', 'jogging', 'running_8', 'running_10', 'running_12', 'running_16'],
    //     "자전거": ['cycling_leisure', 'cycling_moderate', 'cycling_fast', 'cycling_racing'],
    //     "수영": ['swimming_leisure', 'swimming_freestyle', 'swimming_backstroke', 'swimming_breaststroke', 'swimming_butterfly'],
    //     "구기 운동": ['basketball', 'soccer', 'tennis', 'volleyball', 'table_tennis', 'badminton'],
    //     "실내 운동": ['weightlifting_light', 'weightlifting_moderate', 'weightlifting_vigorous', 'yoga', 'pilates', 'aerobics_low', 'aerobics_high', 'dancing_ballroom', 'dancing_energetic'],
    //     "기타 운동": ['rope_jumping', 'hiking', 'martial_arts', 'golf', 'rowing_moderate', 'rowing_vigorous', 'skiing_downhill', 'skating_ice', 'horseback_riding'],
    // };

    const filteredExercises = Object.entries(exercises).filter(([key, value]) => 
        value.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const InfoItem = ({ title, content }) => (
        <div style={styles.infoItem}>
            <div style={styles.infoTitle}>{title}</div>
            <div style={styles.infoContent}>{content}</div>
        </div>
    );

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>운동 칼로리 소모량 계산기</h2>
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
                    <label style={styles.label}>운동 시간 (분)</label>
                    <input
                        style={styles.input}
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="예: 30"
                    />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                    <label style={styles.label}>운동 종류</label>
                    <div style={styles.dropdownContainer} ref={dropdownRef}>
                        <button 
                            style={styles.dropdownButton}
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            {exercise ? exercises[exercise].name : '운동을 선택하세요'}
                        </button>
                        {isDropdownOpen && (
                            <div style={styles.dropdownList}>
                                <input
                                    style={styles.searchInput}
                                    type="text"
                                    placeholder="운동 검색..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                {filteredExercises.map(([key, value]) => (
                                    <div
                                        key={key}
                                        style={styles.dropdownItem}
                                        onClick={() => {
                                            setExercise(key);
                                            setIsDropdownOpen(false);
                                        }}
                                        onMouseEnter={(e) => e.target.style.backgroundColor = styles.dropdownItemHover.backgroundColor}
                                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                    >
                                        {value.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <button style={styles.button} onClick={calculateCalories}>
                    칼로리 소모량 계산하기
                </button>
            </div>
            {result && (
                <div style={styles.resultContainer}>
                    <p style={styles.resultText}>운동: {result.exercise}</p>
                    <p style={styles.resultText}>운동 시간: {result.duration}분</p>
                    <p style={styles.resultText}>소모 칼로리: 약 {result.calories} kcal</p>
                </div>
            )}
            <div style={styles.infoSection}>
                <InfoItem 
                    title="칼로리 소모량 계산 방법" 
                    content={`칼로리 소모량 = MET × 체중(kg) × 시간(hour)\n\nMET(Metabolic Equivalent of Task)는 특정 활동의 에너지 소비율을 나타내는 지표입니다.`}
                />
                <InfoItem 
                    title="주의사항" 
                    content="이 계산기는 대략적인 추정치를 제공합니다. 실제 칼로리 소모량은 개인의 체질, 운동 강도, 환경 등에 따라 차이가 있을 수 있습니다."
                />
            </div>
        </div>
    );
};

export default ExerciseCalorieCalculator;