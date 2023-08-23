import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Cart from '@/components/common/Cart/Cart';

describe('Cart render', () => {
	it('default render', async () => {
		render(<Cart count={12} onSend={() => console.log('Success')} />);
		const logSpy = jest.spyOn(console, 'log');

		const button = screen.getByText('Отправить');

		expect(screen.getByText('Корзина')).toBeInTheDocument();
		expect(screen.getByText(/астероид/)).toHaveTextContent('12 астероид');

		fireEvent.click(button);
		expect(logSpy).toBeCalledWith('Success');
	});
});
