import Head from 'next/head';
import {useEffect, useState} from 'react';
import {count} from '../lib/take-me-out';
import styles from '../styles/Home.module.css';

const InputBlockComponent = {
	marginBottom: '0.5rem',
};

const InputTextElement = {
	fontWeight: 700,
	fontSize: '2.5rem',
	padding: '0.8rem 1rem',
	textAlign: 'center',
	background: '#faf0f9',
	color: '#111111',
	fontVariant: 'all-small-caps',
	borderRadius: '5px',
	boxShadow: 'none',
	border: 'none',
	width: '100%',
};

const ButtonElement = {
	height: '2.5rem',
	width: '100%',
	background: '#ff27b2',
	borderRadius: '5px',
	boxShadow: 'none',
	border: 'none',
	fontSize: '1rem',
	fontWeight: 700,
	color: '#FFFFFF',
	cursor: 'pointer',
};

export default function Home() {
	const [name, setName] = useState('');
	const [partnerName, setPartnerName] = useState('');
	const [result, setResult] = useState(0);
	const [isReady, setReady] = useState(false);

	const handleOnChange = (key: 'name' | 'partnerName') => (e: any) => {
		let value: string = e?.target?.value ?? '';

		const isValid = /^[a-zA-Z\s]+$/gi.test(value);

		if (value.length > 0 && !isValid) {
			return;
		}

		// value = value.toUpperCase();
		value = value.toLowerCase();
		// console.log({key, value, isValid});

		if (key === 'name') {
			setName(value);
		} else {
			setPartnerName(value);
		}
	};

	useEffect(() => {
		setReady(false);
		const result = count(name, partnerName) || 0;

		if (name.trim().length > 0 && partnerName.trim().length > 0) {
			setReady(true);

			setResult(result);
		}

		return () => {
			return;
		};
	}, [name, partnerName]);

	return (
		<div className={styles.container}>
			<Head>
				<title>Take Me Out</title>
				<meta name='description' content='Take Me Out' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={styles.main}>
				<div style={{width: '600px'}}>
					<div style={{marginBottom: `5rem`}}>
						<div style={{marginBottom: '1.5rem'}}>
							<div style={InputBlockComponent}>
								<span>
									<input
										style={InputTextElement}
										type='text'
										placeholder='Nama kamu...'
										value={name}
										onChange={handleOnChange('name')}
									/>
								</span>
							</div>

							<div style={InputBlockComponent}>
								<h1 className={styles.title}>
									<span>{'💘'}</span>
								</h1>
							</div>

							<div style={InputBlockComponent}>
								<span>
									<input
										style={InputTextElement}
										type='text'
										placeholder='Nama gebetan / pasangan kamu...'
										value={partnerName}
										onChange={handleOnChange('partnerName')}
									/>
								</span>
							</div>
						</div>

						{/*
						<div>
							<button style={ButtonElement}>GO!!!</button>
						</div>
						 */}
					</div>

					{isReady ? (
						<div>
							<h1 className={styles.title}>
								<span>{result}</span>
								<span>%</span>
							</h1>
						</div>
					) : null}
				</div>
			</main>
		</div>
	);
}
