import Home from '@/components/screens/Home/Home';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

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

describe('Home render', () => {
	it('default render', async () => {
		render(<Home data={[]} />);

		expect(screen.getByText('Ближайшие подлёты астероидов')).toBeInTheDocument();
		expect(screen.getByTestId('list')).toBeInTheDocument();
		expect(screen.queryByTestId('item')).toBeNull();
	});
});
