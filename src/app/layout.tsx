import type { Metadata } from 'next';

import Header from '@/components/common/Header/Header';

import './globals.scss';
import styles from './layout.module.scss';

export const metadata: Metadata = {
	title: 'ARMAGEDDON 2023',
	description: '',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="en">
			<body>
				<div className={styles.wrapper}>
					<Header />
					<main className={styles.main}>{children}</main>
					<footer className={styles.footer}>© Все права и планета защищены</footer>
				</div>
			</body>
		</html>
	);
};

export default RootLayout;
