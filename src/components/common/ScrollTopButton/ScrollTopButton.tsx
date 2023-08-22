'use client';
import { FC, useEffect, useState } from 'react';
import cn from 'classnames';

import styles from './ScrollTopButton.module.scss';

const ScrollTopButton: FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => {
			if (window.scrollY > window.innerHeight * 2) {
				setIsOpen(true);
			} else {
				setIsOpen(false);
			}
		};

		onScroll();
		window.addEventListener('scroll', onScroll);
		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	});

	const onClick = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<div onClick={onClick} className={cn(styles.wrapper, { [styles.open]: isOpen })}>
			<div className={styles.arrow}></div>
		</div>
	);
};

export default ScrollTopButton;
