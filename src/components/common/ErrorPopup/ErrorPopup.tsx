'use client';
import { FC, useEffect, useState } from 'react';

import styles from './ErrorPopup.module.scss';
import cn from 'classnames';

interface IErrorPopup {
	value: string;
}

const ErrorPopup: FC<IErrorPopup> = ({ value }) => {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		let timer: NodeJS.Timeout;

		if (value) {
			setIsOpen(true);
			timer = setTimeout(() => {
				setIsOpen(false);
			}, 5000);
		}

		return () => clearTimeout(timer);
	}, [value]);

	return (
		<div
			onClick={() => setIsOpen(false)}
			className={cn(styles.wrapper, { [styles.opened]: isOpen })}>
			{value}
		</div>
	);
};

export default ErrorPopup;
