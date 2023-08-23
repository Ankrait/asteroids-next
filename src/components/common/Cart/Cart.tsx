import { FC } from 'react';

import cn from 'classnames';

import { IHtmlProps } from '@/common/interfaces';
import { getEndingForm } from '@/common/utils';

import styles from './Cart.module.scss';

interface ICart extends IHtmlProps {
	count: number;
	onSend: () => void;
}

const Cart: FC<ICart> = ({ count, className, onSend }) => {
	return (
		<div className={cn(styles.wrapper, className)}>
			<h5 className={styles.title}>Корзина</h5>
			<p
				data-testid="cart-value"
				className={styles.count}>{`${count} астероид${getEndingForm(count)}`}</p>
			<button onClick={onSend} className={styles.button}>
				Отправить
			</button>
		</div>
	);
};

export default Cart;
