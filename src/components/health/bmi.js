import React, { useState } from 'react';

const BMICalculator = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBMI] = useState(null);
    const [bmiCategory, setBMICategory] = useState('');

    const calculateBMI = () => {
        if (weight && height) {
            const heightInMeters = height / 100;
            const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
            setBMI(bmiValue);
            setBMICategory(getBMICategory(bmiValue));
        }
    };

    const getBMICategory = (bmi) => {
        if (bmi < 18.5) return '저체중';
        if (bmi < 25) return '정상';
        if (bmi < 30) return '과체중';
        return '비만';
    };

    const getCategoryColor = (category) => {
        switch(category) {
            case '저체중': return '#3498db';
            case '정상': return '#2ecc71';
            case '과체중': return '#f39c12';
            case '비만': return '#e74c3c';
            default: return '#2c3e50';
        }
    };

    const styles = {
        container: {
            maxWidth: '400px',
            margin: '0 auto',
            padding: '30px',
            backgroundColor: '#f8f9fa',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Arial, sans-serif',
        },
        title: {
            textAlign: 'center',
            color: '#2c3e50',
            marginBottom: '20px',
        },
        inputGroup: {
            marginBottom: '20px',
            width: '100%',
        },
        label: {
            display: 'block',
            marginBottom: '5px',
            color: '#34495e',
        },
        input: {
            width: 'calc(100% - 22px)',
            padding: '10px',
            border: '1px solid #bdc3c7',
            borderRadius: '5px',
            fontSize: '16px',
        },
        button: {
            width: '100%',
            padding: '12px',
            backgroundColor: '#3498db',
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
            backgroundColor: '#ecf0f1',
            borderRadius: '5px',
        },
        bmiValue: {
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '10px',
        },
        bmiCategory: {
            fontSize: '18px',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>BMI 계산기</h2>
            <div style={styles.inputGroup}>
                <label style={styles.label}>
                    체중 (kg):
                    <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        style={styles.input}
                    />
                </label>
            </div>
            <div style={styles.inputGroup}>
                <label style={styles.label}>
                    신장 (cm):
                    <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        style={styles.input}
                    />
                </label>
            </div>
            <button 
                onClick={calculateBMI}
                style={styles.button}
            >
                BMI 계산
            </button>
            {bmi && (
                <div style={styles.resultContainer}>
                    <div style={styles.bmiValue}>당신의 BMI: {bmi}</div>
                    <div style={{
                        ...styles.bmiCategory,
                        color: getCategoryColor(bmiCategory)
                    }}>
                        카테고리: {bmiCategory}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BMICalculator;