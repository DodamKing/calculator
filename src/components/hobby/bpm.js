import React, { useState, useEffect, useCallback, useRef } from 'react';

const MusicBPMCalculator = () => {
    const [taps, setTaps] = useState([]);
    const [bpm, setBpm] = useState(0);
    const [isCalculating, setIsCalculating] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(5);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const timerRef = useRef(null);
    const startTimeRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const calculateBPM = useCallback(() => {
        if (taps.length < 2) return 0;
        const intervals = [];
        for (let i = 1; i < taps.length; i++) {
            intervals.push(taps[i] - taps[i-1]);
        }
        const averageInterval = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length;
        return Math.round(60000 / averageInterval);
    }, [taps]);

    const startMeasurement = () => {
        setIsCalculating(true);
        setTimeRemaining(5);
        startTimeRef.current = Date.now();
        setTaps([]);
        setBpm(0);
    };

    const handleTap = () => {
        if (isCalculating) {
            setTaps(prevTaps => [...prevTaps, Date.now()]);
        }
    };

    useEffect(() => {
        if (isCalculating) {
            timerRef.current = setInterval(() => {
                const elapsedTime = (Date.now() - startTimeRef.current) / 1000;
                const remaining = Math.max(5 - Math.floor(elapsedTime), 0);
                setTimeRemaining(remaining);

                if (remaining === 0) {
                    setIsCalculating(false);
                    clearInterval(timerRef.current);
                    const calculatedBPM = calculateBPM();
                    setBpm(calculatedBPM);
                }
            }, 100);
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isCalculating, calculateBPM]);

    const styles = {
        container: {
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
            fontSize: isMobile ? '24px' : '28px',
        },
        button: {
            width: '100%',
            padding: '15px',
            fontSize: isMobile ? '16px' : '18px',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            marginBottom: '10px',
        },
        startButton: {
            backgroundColor: '#2196F3',
        },
        tapButton: {
            backgroundColor: isCalculating ? '#4CAF50' : '#cccccc',
        },
        resultContainer: {
            marginTop: '20px',
            textAlign: 'center',
        },
        bpmDisplay: {
            fontSize: isMobile ? '36px' : '48px',
            fontWeight: 'bold',
            color: '#2c5282',
        },
        timeRemaining: {
            fontSize: isMobile ? '16px' : '18px',
            color: '#666666',
            marginTop: '10px',
        },
        instructions: {
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#e8f0fe',
            borderRadius: '5px',
            fontSize: isMobile ? '14px' : '16px',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>음악 BPM 계산기</h2>
            <button 
                style={{...styles.button, ...styles.startButton}}
                onClick={startMeasurement}
                disabled={isCalculating}
            >
                BPM 측정 시작
            </button>
            <button 
                style={{...styles.button, ...styles.tapButton}}
                onClick={handleTap}
                disabled={!isCalculating}
            >
                비트에 맞춰 탭하세요!
            </button>
            <div style={styles.resultContainer}>
                <div style={styles.bpmDisplay}>{bpm} BPM</div>
                {isCalculating && (
                    <div style={styles.timeRemaining}>남은 시간: {timeRemaining}초</div>
                )}
            </div>
            <div style={styles.instructions}>
                <h4>사용 방법:</h4>
                <ol>
                    <li>'BPM 측정 시작' 버튼을 클릭하여 측정을 시작합니다.</li>
                    <li>음악이 재생되면 '비트에 맞춰 탭하세요!' 버튼을 5초 동안 탭합니다.</li>
                    <li>5초 후 자동으로 BPM이 계산되고 표시됩니다.</li>
                    <li>다시 측정하려면 'BPM 측정 시작' 버튼을 클릭하세요.</li>
                </ol>
            </div>
        </div>
    );
};

export default MusicBPMCalculator;