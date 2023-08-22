import { FC } from 'react';

import cn from 'classnames';

import { numberWithSpaces } from '@/common/utils';
import { IDistance } from '@/services/services.interface';
import { DistanceUnitType, IHtmlProps } from '@/common/interfaces';

import styles from './Distance.module.scss';

interface IDistanceProps extends IHtmlProps {
	distance: IDistance;
	distanceUnit: DistanceUnitType;
}

const Distance: FC<IDistanceProps> = ({ distance, distanceUnit, className }) => {
	return (
		<div className={cn(className, styles.wrapper)}>
			<p>
				{distanceUnit === 'kilometers'
					? `${numberWithSpaces(distance.kilometers)} км`
					: `${numberWithSpaces(distance.lunar)} лунные орбиты`}
			</p>
			<div className={styles.arrow}></div>
		</div>
	);
};

export default Distance;
