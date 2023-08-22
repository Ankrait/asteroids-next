import Home from '@/components/screens/Home/Home';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import * as nextRouter from 'next/navigation';


describe('Home render', () => {
	it('default render', () => {
		render(<Home data={[]} />);
		// check if all components are rendered
		expect(screen.findAllByAltText('earth')).toBeInTheDocument();
	});
});
