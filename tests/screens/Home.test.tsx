import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { IReducedAsteroid } from '@/services/services.interface';
import Home from '@/components/screens/Home/Home';

jest.mock('next/navigation', () => ({
	useRouter() {
		return {
			route: '/',
			pathname: '',
			query: '',
			asPath: '',
		};
	},
}));

// len 8
const data: IReducedAsteroid[] = [
	{
		id: '2004769',
		name: '1989 PB',
		diameter: 1360,
		distance: { lunar: 43, kilometers: 16459698 },
		isDangerous: true,
		date: '2023-08-22',
	},
	{
		id: '2414800',
		name: '2010 SV3',
		diameter: 303,
		distance: { lunar: 35, kilometers: 13568873 },
		isDangerous: false,
		date: '2023-08-22',
	},
	{
		id: '3444275',
		name: '2009 AE16',
		diameter: 758,
		distance: { lunar: 109, kilometers: 42096805 },
		isDangerous: true,
		date: '2023-08-22',
	},
	{
		id: '3576726',
		name: '2011 QG21',
		diameter: 197,
		distance: { lunar: 115, kilometers: 44195897 },
		isDangerous: false,
		date: '2023-08-22',
	},
	{
		id: '3659804',
		name: '2014 BA33',
		diameter: 179,
		distance: { lunar: 162, kilometers: 62305976 },
		isDangerous: false,
		date: '2023-08-22',
	},
	{
		id: '54115837',
		name: '2021 CA6',
		diameter: 8,
		distance: { lunar: 117, kilometers: 45117340 },
		isDangerous: false,
		date: '2023-08-22',
	},
	{
		id: '54193345',
		name: '2021 RZ3',
		diameter: 15,
		distance: { lunar: 73, kilometers: 28260711 },
		isDangerous: false,
		date: '2023-08-22',
	},
	{
		id: '54376834',
		name: '2023 PM',
		diameter: 80,
		distance: { lunar: 9, kilometers: 3649325 },
		isDangerous: false,
		date: '2023-08-22',
	},
];

describe('Home render', () => {
	it('default render', () => {
		render(<Home data={[]} />);

		expect(screen.getByText('Ближайшие подлёты астероидов')).toBeInTheDocument();
		expect(screen.getByTestId('list')).toBeInTheDocument();
		expect(screen.queryByTestId('item')).toBeNull();
	});

	it('render with data', () => {
		render(<Home data={data} />);

		const items = screen.getAllByTestId('item');
		expect(items.length).toBe(8);

		const kmUnits = screen.getAllByText(/км/);
		expect(kmUnits.length).toBe(8);
	});

	it('click on unit change', () => {
		render(<Home data={data} />);

		const lunarButton = screen.getByTestId('lunar');
		fireEvent.click(lunarButton);

		const lunarItems = screen.getAllByText(/лунные.+орб/);
		expect(lunarItems.length).toBe(8);
	});

	it('add to cart', () => {
		render(<Home data={data} />);

		const items = screen.getAllByTestId('item');
		const cartValue = screen.getByTestId('cart-value');

		expect(cartValue).toHaveTextContent('0');

		items.forEach((el, i) => {
			if (i % 2 === 0) return;
			const btn = el.querySelector('button');
			if (btn) fireEvent.click(btn);
		});

		expect(cartValue).toHaveTextContent('4');
	});

	it('remove from cart', () => {
		render(<Home data={data} />);

		const items = screen.getAllByTestId('item');
		const cartValue = screen.getByTestId('cart-value');

		const btn = items[1].querySelector('button');
		if (btn) {
			fireEvent.click(btn);
			expect(cartValue).toHaveTextContent('3');
		}
	});
});
