'use client';
import { FC, useState } from 'react';
import Image from 'next/image';
import Pagination from 'react-paginate';

import asteroid_img from '../../../../public/asteroid.png';
import speed_img from '../../../../public/speed.svg';
import { numberWithSpaces } from '@/common/utils';
import { IAsteroid } from '@/services/services.interface';
import { DistanceUnitType } from '@/common/interfaces';
import { ITEMS_PER_PAGE } from '@/common/constants';
import Distance from '@/components/common/Distance/Distance';
import UnitChoose from '@/components/common/UnitChoose/UnitChoose';
import Danger from '@/components/common/Danger/Danger';

import styles from './Asteroid.module.scss';

interface IAsteroidProps {
	data: IAsteroid | null;
}

const Asteroid: FC<IAsteroidProps> = ({ data }) => {
	const [distanceUnit, setDistanceUnit] = useState<DistanceUnitType>('kilometers');
	const [pageNumber, setPageNumber] = useState(1);

	if (!data) return <>Нет данных</>;
	const { absoluteMagnitudeH, closeApproachData, diameters, isDangerous, name } = data;

	const onPageChange = (selectedItem: { selected: number }) => {
		setPageNumber(selectedItem.selected + 1);
	};

	const pagesCount = Math.ceil(data.closeApproachData.length / ITEMS_PER_PAGE);

	return (
		<div className={styles.wrapper}>
			<div className={styles.image}>
				<Image src={asteroid_img} alt="asteroid" fill objectFit="contain" />
			</div>
			<div className={styles.content}>
				<div className={styles.header}>
					<div className={styles.title}>{name}</div>
					{isDangerous && <Danger />}
				</div>
				<div className={styles.information}>
					<p>Абсолютная звёздная величина: {absoluteMagnitudeH}</p>
					<p>
						Диаметр: {diameters.min}м - {diameters.max}м
					</p>
				</div>
				<div className={styles.approach}>
					<UnitChoose
						className={styles.unit}
						active={distanceUnit}
						setDistanceUnit={setDistanceUnit}
					/>
					<div className={styles.approach_list}>
						{closeApproachData
							.slice((pageNumber - 1) * ITEMS_PER_PAGE, pageNumber * ITEMS_PER_PAGE)
							.map((el) => (
								<div key={el.id} className={styles.approach_item}>
									<p className={styles.approach_date}>{el.date}</p>
									<p className={styles.approach_orbit}>
										Вращается по орбите {el.orbitingBody}
									</p>
									<Distance
										className={styles.approach_dist}
										distance={el.distance}
										distanceUnit={distanceUnit}
									/>
									<p className={styles.approach_speed}>
										<Image src={speed_img} alt="spped" width={28} height={28} />
										{numberWithSpaces(el.speed)} км/ч
									</p>
								</div>
							))}
						<Pagination
							className={styles.pagination}
							pageLinkClassName={styles.pagination_item}
							activeLinkClassName={styles.pagination_active}
							onPageChange={onPageChange}
							initialPage={pageNumber - 1}
							marginPagesDisplayed={2}
							pageCount={pagesCount}
						/>
					</div>
					<div className={styles.mobile_pages}>
						{pageNumber} / {pagesCount}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Asteroid;
