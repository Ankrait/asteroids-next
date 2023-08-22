import type { Metadata } from 'next';
import Image from 'next/image';

import Header from '@/components/common/Header/Header';
import ScrollTopButton from '@/components/common/ScrollTopButton/ScrollTopButton';

import earth_img from '../../../public/earth.png';

import styles from './layout.module.scss';

export const metadata: Metadata = {
	title: 'ARMAGEDDON 2023',
	description: '',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className={styles.content}>
			<div className={styles.earth_container}>
				<Image quality={90} src={earth_img} alt="earth" fill objectFit="contain" />
			</div>
			{children}
			<ScrollTopButton />
		</div>
	);
};

export default RootLayout;
