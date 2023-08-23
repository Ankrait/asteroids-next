import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import UnitChoose from '@/components/common/UnitChoose/UnitChoose';

describe('UnitChoose render', () => {
	const setValue = (val: string) => {
		console.log(val);
	};
	const spy = jest.spyOn(console, 'log');

	it('kilometers is active', async () => {
		render(<UnitChoose active="kilometers" setDistanceUnit={setValue} />);

		const kmText = screen.getByTestId('km');
		const lunarText = screen.getByTestId('lunar');

		expect(kmText.innerHTML).toBe('в километрах');
		expect(lunarText.innerHTML).toBe('в лунных орбитах');
		expect(kmText.classList.contains('active')).toBeTruthy;
		expect(lunarText.classList.contains('active')).toBeFalsy;
	});

	it('lunar is active', async () => {
		render(<UnitChoose active="lunar" setDistanceUnit={setValue} />);

		const kmText = screen.getByTestId('km');
		const lunarText = screen.getByTestId('lunar');

		expect(kmText.classList.contains('active')).toBeFalsy;
		expect(lunarText.classList.contains('active')).toBeTruthy;
	});

	it('clicks on buttons', async () => {
		render(<UnitChoose active="lunar" setDistanceUnit={setValue} />);

		const kmText = screen.getByTestId('km');
		const lunarText = screen.getByTestId('lunar');

		fireEvent.click(kmText);
		expect(spy).toBeCalledWith('kilometers');

		fireEvent.click(lunarText);
		expect(spy).toBeCalledWith('lunar');
	});
});
