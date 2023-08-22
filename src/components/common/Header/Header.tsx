import { FC } from 'react';

import { Passion_One } from 'next/font/google';

import styles from './Header.module.scss';
import cn from 'classnames';
import Link from 'next/link';

const passionOne = Passion_One({ weight: '400', display: 'swap', subsets: ['latin'] });

const Header: FC = () => {
	return (
		<header className={styles.wrapper}>
			<h1 className={cn(styles.logo, passionOne.className)}>
				<Link href="/">ARMAGEDDON 2023</Link>
			</h1>
			<p className={styles.text}>
				ООО “Команда им. Б. Уиллиса”.
				<br /> Взрываем астероиды с 1998 года.
			</p>
		</header>
	);
};

export default Header;
