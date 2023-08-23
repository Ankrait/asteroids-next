import { FC } from 'react';

import cn from 'classnames';

import styles from './UnitChoose.module.scss';
import { DistanceUnitType, IHtmlProps } from '@/common/interfaces';

interface IUnitChoose extends IHtmlProps {
	setDistanceUnit: (value: DistanceUnitType) => void;
	active: DistanceUnitType;
}

const UnitChoose: FC<IUnitChoose> = ({ active, setDistanceUnit, className }) => {
	return (
		<div className={cn(styles.wrapper, className)}>
			<p
				data-testid="km"
				className={cn(styles.unit, {
					[styles.active]: active === 'kilometers',
				})}
				onClick={() => setDistanceUnit('kilometers')}>
				в километрах
			</p>
			<span>|</span>
			<p
				data-testid="lunar"
				className={cn(styles.unit, {
					[styles.active]: active === 'lunar',
				})}
				onClick={() => setDistanceUnit('lunar')}>
				в лунных орбитах
			</p>
		</div>
	);
};

export default UnitChoose;
