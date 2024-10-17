import React from 'react';

const NotImplementedCalculator = ({ name }) => {
	const styles = {
		container: {
			maxWidth: '400px',
			margin: '0 auto',
			padding: '20px',
			backgroundColor: '#f8f9fa',
			borderRadius: '8px',
			boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
			textAlign: 'center'
		},
		icon: {
			fontSize: '48px',
			color: '#6c757d',
			marginBottom: '20px'
		},
		title: {
			color: '#343a40',
			marginBottom: '10px'
		},
		message: {
			color: '#6c757d',
			marginBottom: '20px'
		},
		link: {
			display: 'inline-block',
			padding: '10px 20px',
			backgroundColor: '#007bff',
			color: 'white',
			textDecoration: 'none',
			borderRadius: '4px',
			transition: 'background-color 0.3s'
		}
	};

	return (
		<div style={styles.container}>
			<div style={styles.icon}>🚧</div>
			<h2 style={styles.title}>{name}</h2>
			<p style={styles.message}>이 계산기는 현재 개발 중입니다. 곧 사용하실 수 있을 거예요!</p>
		</div>
	);
};

export default NotImplementedCalculator;