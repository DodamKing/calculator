import React, { useState, useEffect } from 'react';

const PhotoStorageCalculator = () => {
    const [photoCount, setPhotoCount] = useState(100);
    const [videoCount, setVideoCount] = useState(10);
    const [deviceType, setDeviceType] = useState('smartphone');
    const [storageCapacity, setStorageCapacity] = useState(64);
    const [result, setResult] = useState(null);

    const deviceSpecs = {
        smartphone: { photoSize: 4, videoSize: 300 },
        dslr: { photoSize: 25, videoSize: 400 },
        gopro: { photoSize: 5, videoSize: 350 }
    };

    const calculateStorage = () => {
        const { photoSize, videoSize } = deviceSpecs[deviceType];
        const totalPhotoSize = photoCount * photoSize;
        const totalVideoSize = videoCount * videoSize;
        const totalUsed = totalPhotoSize + totalVideoSize;
        const remainingSpace = storageCapacity * 1024 - totalUsed;
        const additionalPhotos = Math.floor(remainingSpace / photoSize);
        const additionalVideos = Math.floor(remainingSpace / videoSize);

        setResult({
            totalUsed: totalUsed.toFixed(2),
            remainingSpace: remainingSpace.toFixed(2),
            additionalPhotos,
            additionalVideos,
            storagePercentage: ((totalUsed / (storageCapacity * 1024)) * 100).toFixed(2)
        });
    };

    useEffect(() => {
        calculateStorage();
    }, [photoCount, videoCount, deviceType, storageCapacity]);

    const styles = {
        container: {
            maxWidth: '600px',
            margin: '0 auto',
            padding: '20px',
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
            gap: '15px',
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
            padding: '8px',
            border: '1px solid #cccccc',
            borderRadius: '5px',
            fontSize: '16px',
        },
        select: {
            width: '100%',
            padding: '8px',
            border: '1px solid #cccccc',
            borderRadius: '5px',
            fontSize: '16px',
            backgroundColor: 'white',
        },
        resultContainer: {
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#e8f0fe',
            borderRadius: '5px',
        },
        resultItem: {
            marginBottom: '10px',
        },
        progressBar: {
            width: '100%',
            height: '20px',
            backgroundColor: '#e0e0e0',
            borderRadius: '10px',
            overflow: 'hidden',
        },
        progressFill: {
            height: '100%',
            backgroundColor: '#4CAF50',
            transition: 'width 0.5s ease-in-out',
        },
        tips: {
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#e8f8e8',
            borderRadius: '5px',
        },
        tipsTitle: {
            fontWeight: 'bold',
            color: '#2c8250',
            fontSize: '16px',
            marginBottom: '10px',
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
                        onChange={(e) => setPhotoCount(parseInt(e.target.value) || 0)}
                    />
                </div>
                <div>
                    <label style={styles.label}>동영상 수:</label>
                    <input 
                        style={styles.input}
                        type="number" 
                        value={videoCount}
                        onChange={(e) => setVideoCount(parseInt(e.target.value) || 0)}
                    />
                </div>
                <div style={styles.fullWidth}>
                    <label style={styles.label}>기기 종류:</label>
                    <select 
                        style={styles.select}
                        value={deviceType}
                        onChange={(e) => setDeviceType(e.target.value)}
                    >
                        <option value="smartphone">스마트폰</option>
                        <option value="dslr">DSLR</option>
                        <option value="gopro">GoPro</option>
                    </select>
                </div>
                <div style={styles.fullWidth}>
                    <label style={styles.label}>저장 용량 (GB):</label>
                    <input 
                        style={styles.input}
                        type="number" 
                        value={storageCapacity}
                        onChange={(e) => setStorageCapacity(parseInt(e.target.value) || 0)}
                    />
                </div>
            </div>

            {result && (
                <div style={styles.resultContainer}>
                    <div style={styles.resultItem}>사용 중인 공간: {result.totalUsed} MB</div>
                    <div style={styles.resultItem}>남은 공간: {result.remainingSpace} MB</div>
                    <div style={styles.resultItem}>추가로 저장 가능한 사진 수: 약 {result.additionalPhotos}장</div>
                    <div style={styles.resultItem}>추가로 저장 가능한 동영상 수: 약 {result.additionalVideos}개</div>
                    <div style={styles.resultItem}>저장 공간 사용률: {result.storagePercentage}%</div>
                    <div style={styles.progressBar}>
                        <div style={{...styles.progressFill, width: `${result.storagePercentage}%`}}></div>
                    </div>
                </div>
            )}

            <div style={styles.tips}>
                <h4 style={styles.tipsTitle}>저장 공간 관리 팁</h4>
                <ul>
                    <li>클라우드 서비스를 활용하여 로컬 저장 공간을 절약하세요.</li>
                    <li>정기적으로 불필요한 사진과 동영상을 정리하세요.</li>
                    <li>고화질 사진은 외장 하드나 컴퓨터로 백업하는 것이 좋습니다.</li>
                    <li>앱 캐시를 정리하면 추가 저장 공간을 확보할 수 있습니다.</li>
                </ul>
            </div>
        </div>
    );
};

export default PhotoStorageCalculator;