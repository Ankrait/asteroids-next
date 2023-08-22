'use client';
import { FC, useLayoutEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import AsteroidItem from '../../common/AsteroidItem/AsteroidItem';
import { IReducedAsteroid } from '@/services/services.interface';

import styles from './Success.module.scss';

const Success: FC = () => {
	const [asteroidsData, setAsteroidsData] = useState<IReducedAsteroid[]>([]);
	const router = useRouter();

	useLayoutEffect(() => {
		const data = localStorage.getItem('cart');

		if (!data) {
			router.push('/');
			return;
		}

		setAsteroidsData(JSON.parse(data));
		localStorage.setItem('cart', '');
	}, []);

	return (
		<div className={styles.wrapper}>
			<h2 className={styles.title}>Заказ отправлен!</h2>
			<div className={styles.list}>
				{asteroidsData.map((asteroid) => (
					<AsteroidItem
						distanceUnit={'lunar'}
						key={asteroid.id}
						data={asteroid}
						className={styles.item}
					/>
				))}
			</div>
		</div>
	);
};

export default Success;
