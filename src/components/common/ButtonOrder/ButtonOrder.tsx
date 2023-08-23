import { FC } from 'react';

import cn from 'classnames';

import { IHtmlProps } from '@/common/interfaces';

import styles from './ButtonOrder.module.scss';

interface IButtonOrder extends IHtmlProps<HTMLButtonElement> {
	isInCart: boolean;
}

const ButtonOrder: FC<IButtonOrder> = ({ isInCart, className, ...restProps }) => {
	const buttonClass = cn(styles.button, className, {
		[styles.in_cart]: isInCart,
	});
	return (
		<button data-testid='button' className={buttonClass} {...restProps}>
			{isInCart ? 'В КОРЗИНЕ' : 'ЗАКАЗАТЬ'}
		</button>
	);
};

export default ButtonOrder;
