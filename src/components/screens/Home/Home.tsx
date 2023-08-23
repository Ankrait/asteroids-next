'use client';
import { FC, useEffect, useRef, useState } from 'react';

import cn from 'classnames';
import { useRouter } from 'next/navigation';

import { IReducedAsteroid } from '@/services/services.interface';
import { DistanceUnitType, updateCartValueType } from '@/common/interfaces';
import { nasaAPI } from '@/services/services';
import UnitChoose from '@/components/common/UnitChoose/UnitChoose';
import Cart from '@/components/common/Cart/Cart';
import AsteroidItem from '@/components/common/AsteroidItem/AsteroidItem';
import Loading from '@/components/common/Loading/Loading';

import styles from './Home.module.scss';

export interface IHome {
	data: IReducedAsteroid[];
}

const Home: FC<IHome> = ({ data }) => {
	const [count, setCount] = useState(1);
	const [distanceUnit, setDistanceUnit] = useState<DistanceUnitType>('kilometers');
	const [asteroidsData, setAsteroidsData] = useState<IReducedAsteroid[]>(data);
	const [cartData, setCartData] = useState<IReducedAsteroid[]>([]);
	const [loading, setLoading] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const router = useRouter();

	useEffect(() => {
		const setData = async () => {
			setLoading(true);
			let tmp_count = count;
			let response = await nasaAPI.getDayAsteroids(tmp_count);

			while (typeof response !== 'string' && response.length === 0) {
				tmp_count++;
				response = await nasaAPI.getDayAsteroids(tmp_count);
			}

			setCount(tmp_count + 1);
			if (typeof response !== 'string') {
				// @ts-ignore
				setAsteroidsData((prev) => [...prev, ...response]);
				setLoading(false);
			}
		};

		const onScroll = () => {
			if (!ref.current) return;

			const scrollBottom = window.scrollY + window.innerHeight;
			const listBottom = ref.current.clientHeight + ref.current.offsetTop;

			if (scrollBottom >= listBottom - 30) {
				setData();
				window.removeEventListener('scroll', onScroll);
			}
		};

		onScroll();
		window.addEventListener('scroll', onScroll);
		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, [asteroidsData]);

	useEffect(() => {
		const data = localStorage.getItem('cart');

		if (!data) {
			return;
		}

		setCartData(JSON.parse(data));
		localStorage.setItem('cart', '');
	}, []);

	const updateCart = ({ action, item }: updateCartValueType) => {
		if (action === 'add') {
			setCartData((prev) => {
				const res = [...prev, item];
				localStorage.setItem('cart', JSON.stringify(res));
				return res;
			});
		} else {
			setCartData((prev) => {
				const res = prev.filter((el) => el.id !== item.id);
				localStorage.setItem('cart', JSON.stringify(res));
				return res;
			});
		}
	};

	const onSendCart = () => {
		if (cartData.length > 0) {
			localStorage.setItem('cart', JSON.stringify(cartData));
			router.push('/success');
		}
	};

	return (
		<>
			<div className={styles.wrapper}>
				<h2 className={styles.title}>Ближайшие подлёты астероидов</h2>
				<UnitChoose
					className={styles.unit}
					active={distanceUnit}
					setDistanceUnit={setDistanceUnit}
				/>
				<div data-testid="list" ref={ref} className={styles.list}>
					{asteroidsData.map((asteroid) => (
						<AsteroidItem
							data-testid="item"
							distanceUnit={distanceUnit}
							key={asteroid.id}
							cartInfo={{
								updateCart,
								isInCart: cartData.some((el) => el.id === asteroid.id),
							}}
							data={asteroid}
							className={styles.item}
						/>
					))}
					{loading && <Loading className={styles.loading} />}
				</div>
			</div>
			<div className={styles.cart_container}>
				<Cart onSend={onSendCart} count={cartData.length} className={styles.cart} />
			</div>
		</>
	);
};

export default Home;
