import React, { FC } from 'react';
import cn from 'classnames';

import { IHtmlProps } from '../../../common/interfaces';

import styles from './Loading.module.scss';

interface ILoading extends IHtmlProps {}

const Loading: FC<ILoading> = ({ className }) => {
	return (
		<div className={cn(styles.wrapper, className)}>
			<div className={styles.loader}></div>
		</div>
	);
};

export default Loading;
