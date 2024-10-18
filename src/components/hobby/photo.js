import React, { useState, useEffect } from 'react';

const PhotoStorageCalculator = () => {
    const [photoCount, setPhotoCount] = useState(100);
    const [videoCount, setVideoCount] = useState(10);
    const [deviceType, setDeviceType] = useState('smartphone');
    const [storageCapacity, setStorageCapacity] = useState(64);
    const [customPhotoSize, setCustomPhotoSize] = useState('');
    const [customVideoSize, setCustomVideoSize] = useState('');
    const [result, setResult] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [displayUnit, setDisplayUnit] = useState('MB');

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const deviceSpecs = {
        smartphone: { photoSize: 4, videoSize: 300, name: '스마트폰' },
        dslr: { photoSize: 25, videoSize: 400, name: 'DSLR' },
        gopro: { photoSize: 5, videoSize: 350, name: 'GoPro' },
        custom: { photoSize: 0, videoSize: 0, name: '사용자 정의' }
    };

    const calculateStorage = () => {
        const { photoSize, videoSize } = deviceType === 'custom' 
            ? { photoSize: parseFloat(customPhotoSize) || 0, videoSize: parseFloat(customVideoSize) || 0 }
            : deviceSpecs[deviceType];

        const totalPhotoSize = photoCount * photoSize;
        const totalVideoSize = videoCount * videoSize;
        const totalUsed = totalPhotoSize + totalVideoSize;
        const totalCapacity = storageCapacity * 1024;
        const remainingSpace = totalCapacity - totalUsed;
        const additionalPhotos = Math.floor(remainingSpace / photoSize);
        const additionalVideos = Math.floor(remainingSpace / videoSize);

        setResult({
            totalUsed: totalUsed.toFixed(2),
            remainingSpace: remainingSpace.toFixed(2),
            additionalPhotos,
            additionalVideos,
            storagePercentage: ((totalUsed / totalCapacity) * 100).toFixed(2),
            photoPercentage: ((totalPhotoSize / totalCapacity) * 100).toFixed(2),
            videoPercentage: ((totalVideoSize / totalCapacity) * 100).toFixed(2)
        });
    };

    const convertUnit = (value) => {
        const numValue = Number(value);
        if (isNaN(numValue)) {
            return "N/A";  // 유효하지 않은 값일 경우
        }
        switch(displayUnit) {
            case 'GB':
                return (numValue / 1024).toFixed(2) + ' GB';
            case 'TB':
                return (numValue / 1024 / 1024).toFixed(2) + ' TB';
            default:
                return numValue.toFixed(2) + ' MB';
        }
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
            fontSize: isMobile ? '24px' : '28px',
        },
        form: {
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '15px',
        },
        fullWidth: {
            gridColumn: '1 / -1',
        },
        label: {
            display: 'block',
            marginBottom: '5px',
            color: '#555555',
            fontSize: isMobile ? '14px' : '16px',
        },
        input: {
            width: '100%',
            padding: '10px',
            border: '1px solid #cccccc',
            borderRadius: '5px',
            fontSize: isMobile ? '14px' : '16px',
            boxSizing: 'border-box',
        },
        select: {
            width: '100%',
            padding: '10px',
            border: '1px solid #cccccc',
            borderRadius: '5px',
            fontSize: isMobile ? '14px' : '16px',
            backgroundColor: 'white',
            boxSizing: 'border-box',
        },
        customSizeInputs: {
            display: deviceType === 'custom' ? 'block' : 'none',
            marginTop: '10px',
        },
        resultContainer: {
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#e8f0fe',
            borderRadius: '5px',
            fontSize: isMobile ? '14px' : '16px',
        },
        resultItem: {
            marginBottom: '10px',
        },
        stackedProgressBar: {
            width: '100%',
            height: '20px',
            backgroundColor: '#e0e0e0',
            borderRadius: '10px',
            overflow: 'hidden',
            display: 'flex',
        },
        photoProgressFill: {
            height: '100%',
            backgroundColor: '#4CAF50',
            transition: 'width 0.5s ease-in-out',
        },
        videoProgressFill: {
            height: '100%',
            backgroundColor: '#FFA500',
            transition: 'width 0.5s ease-in-out',
        },
        tips: {
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#e8f8e8',
            borderRadius: '5px',
            fontSize: isMobile ? '14px' : '16px',
        },
        tipsTitle: {
            fontWeight: 'bold',
            color: '#2c8250',
            fontSize: isMobile ? '16px' : '18px',
            marginBottom: '10px',
        },
        tipsList: {
            paddingLeft: '20px',
            margin: 0,
        },
        tipItem: {
            marginBottom: '8px',
        },
        button: {
            gridColumn: '1 / -1',
            padding: '12px',
            backgroundColor: '#4a90e2',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: isMobile ? '16px' : '18px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            marginTop: '15px',
        },
        unitSelector: {
            marginTop: '15px',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        unitLabel: {
            marginRight: '10px',
            fontSize: isMobile ? '14px' : '16px',
        },
        unitSelect: {
            padding: '5px',
            fontSize: isMobile ? '14px' : '16px',
            borderRadius: '5px',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>사진 저장 공간 계산기</h2>
            <div style={styles.form}>
                <div>
                    <label style={styles.label}>사진 수:</label>
                    <input 
                        style={styles.input}
                        type="number" 
                        value={photoCount}
                        onChange={(e) => setPhotoCount(Math.max(0, parseInt(e.target.value) || 0))}
                    />
                </div>
                <div>
                    <label style={styles.label}>동영상 수:</label>
                    <input 
                        style={styles.input}
                        type="number" 
                        value={videoCount}
                        onChange={(e) => setVideoCount(Math.max(0, parseInt(e.target.value) || 0))}
                    />
                </div>
                <div style={styles.fullWidth}>
                    <label style={styles.label}>기기 종류:</label>
                    <select 
                        style={styles.select}
                        value={deviceType}
                        onChange={(e) => setDeviceType(e.target.value)}
                    >
                        {Object.entries(deviceSpecs).map(([key, value]) => (
                            <option key={key} value={key}>{value.name}</option>
                        ))}
                    </select>
                    <div style={styles.customSizeInputs}>
                        <label style={styles.label}>사진 크기 (MB):</label>
                        <input 
                            style={styles.input}
                            type="number" 
                            value={customPhotoSize}
                            onChange={(e) => setCustomPhotoSize(e.target.value)}
                            placeholder="예: 4"
                        />
                        <label style={styles.label}>동영상 크기 (MB):</label>
                        <input 
                            style={styles.input}
                            type="number" 
                            value={customVideoSize}
                            onChange={(e) => setCustomVideoSize(e.target.value)}
                            placeholder="예: 300"
                        />
                    </div>
                </div>
                <div style={styles.fullWidth}>
                    <label style={styles.label}>저장 용량 (GB):</label>
                    <input 
                        style={styles.input}
                        type="number" 
                        value={storageCapacity}
                        onChange={(e) => setStorageCapacity(Math.max(1, parseInt(e.target.value) || 0))}
                    />
                </div>
                <button style={styles.button} onClick={calculateStorage}>
                    저장 공간 계산하기
                </button>
            </div>

            {result && (
                <div style={styles.resultContainer}>
                    <div style={styles.unitSelector}>
                        <label style={styles.unitLabel}>단위 선택:</label>
                        <select 
                            style={styles.unitSelect}
                            value={displayUnit}
                            onChange={(e) => setDisplayUnit(e.target.value)}
                        >
                            <option value="MB">MB</option>
                            <option value="GB">GB</option>
                            <option value="TB">TB</option>
                        </select>
                    </div>
                    <div style={styles.resultItem}>사용 중인 공간: {convertUnit(result.totalUsed)}</div>
                    <div style={styles.resultItem}>남은 공간: {convertUnit(result.remainingSpace)}</div>
                    <div style={styles.resultItem}>추가로 저장 가능한 사진 수: 약 {result.additionalPhotos.toLocaleString()}장</div>
                    <div style={styles.resultItem}>추가로 저장 가능한 동영상 수: 약 {result.additionalVideos.toLocaleString()}개</div>
                    <div style={styles.resultItem}>저장 공간 사용률: {result.storagePercentage}%</div>
                    <div style={styles.stackedProgressBar}>
                        <div style={{...styles.photoProgressFill, width: `${result.photoPercentage}%`}}></div>
                        <div style={{...styles.videoProgressFill, width: `${result.videoPercentage}%`}}></div>
                    </div>
                    <div style={styles.resultItem}>
                        <span style={{color: '#4CAF50'}}>■</span> 사진: {result.photoPercentage}%
                        <span style={{color: '#FFA500', marginLeft: '10px'}}>■</span> 동영상: {result.videoPercentage}%
                    </div>
                </div>
            )}

            <div style={styles.tips}>
                <h4 style={styles.tipsTitle}>저장 공간 관리 팁</h4>
                <ul style={styles.tipsList}>
                    <li style={styles.tipItem}>클라우드 서비스를 활용하여 로컬 저장 공간을 절약하세요.</li>
                    <li style={styles.tipItem}>정기적으로 불필요한 사진과 동영상을 정리하세요.</li>
                    <li style={styles.tipItem}>고화질 사진은 외장 하드나 컴퓨터로 백업하는 것이 좋습니다.</li>
                    <li style={styles.tipItem}>앱 캐시를 정리하면 추가 저장 공간을 확보할 수 있습니다.</li>
                    <li style={styles.tipItem}>대용량 파일은 압축하여 저장하면 공간을 절약할 수 있습니다.</li>
                </ul>
            </div>
        </div>
    );
};

export default PhotoStorageCalculator;