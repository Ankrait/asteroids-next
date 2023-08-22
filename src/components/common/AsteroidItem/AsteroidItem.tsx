import { FC } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import cn from 'classnames';

import asteroid_img from '../../../../public/asteroid.png';
import { IReducedAsteroid } from '@/services/services.interface';
import { MAX_DIAMETER_SMALL_ASTEROID } from '@/common/constants';
import { DistanceUnitType, updateCartValueType } from '@/common/interfaces';
import Distance from '../Distance/Distance';
import Danger from '../Danger/Danger';
import ButtonOrder from '../ButtonOrder/ButtonOrder';

import styles from './AsteroidItem.module.scss';

interface IAsteroidItem {
	data: IReducedAsteroid;
	className?: string;
	distanceUnit: DistanceUnitType;
	cartInfo?: {
		isInCart: boolean;
		updateCart: (value: updateCartValueType) => void;
	};
}

const AsteroidItem: FC<IAsteroidItem> = ({ data, className, distanceUnit, cartInfo }) => {
	const { id, name, diameter, distance, date, isDangerous } = data;

	const onButtonClick = () => {
		if (!cartInfo) return;

		const action = cartInfo.isInCart ? 'delete' : 'add';
		cartInfo.updateCart({ action, item: data });
	};

	return (
		<div className={cn(styles.wrapper, className)}>
			<p className={styles.date}>{date}</p>
			<div className={styles.information}>
				<Distance distance={distance} distanceUnit={distanceUnit} />
				<div className={styles.image}>
					<Image
						src={asteroid_img}
						alt="asteroid"
						width={diameter < MAX_DIAMETER_SMALL_ASTEROID ? 22 : 33}
						height={diameter < MAX_DIAMETER_SMALL_ASTEROID ? 24 : 36}
						quality={100}
					/>
				</div>
				<div>
					<Link href={`/asteroid/${id}`} className={styles.name}>
						{name}
					</Link>
					<p className={styles.diameter}>Ø {diameter} м</p>
				</div>
			</div>
			<div className={styles.meta}>
				{cartInfo && <ButtonOrder onClick={onButtonClick} isInCart={cartInfo.isInCart} />}
				{isDangerous && <Danger />}
			</div>
		</div>
	);
};

export default AsteroidItem;
