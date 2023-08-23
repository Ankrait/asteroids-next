import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Distance from '@/components/common/Distance/Distance';

describe('Distance render', () => {
	const data = { kilometers: 100, lunar: 51 };
	it('value should be 100 km', async () => {
		render(<Distance distance={data} distanceUnit="kilometers" />);

		const text = screen.getByTestId('value');
		expect(text.innerHTML).toBe('100 км');
	});

	it('value should be 51 lunar', async () => {
		render(<Distance distance={data} distanceUnit="lunar" />);

		const text = screen.getByTestId('value');
		expect(text.innerHTML).toBe('51 лунные орбиты');
	});
});
