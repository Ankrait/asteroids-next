import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ButtonOrder from '@/components/common/ButtonOrder/ButtonOrder';

describe('ButtonOrder render', () => {
	it('in cart', async () => {
		render(<ButtonOrder isInCart={true} />);

		const button = screen.getByTestId('button');
		expect(button.innerHTML).toBe('В КОРЗИНЕ');
	});

	it('not in cart', async () => {
		render(<ButtonOrder isInCart={false} />);

		const button = screen.getByTestId('button');
		expect(button.innerHTML).toBe('ЗАКАЗАТЬ');
	});
});
