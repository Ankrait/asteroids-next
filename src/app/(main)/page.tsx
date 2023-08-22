import { NextPage } from 'next';

import { nasaAPI } from '@/services/services';
import Home from '@/components/screens/Home/Home';

export const revalidate = 1800;

const HomePage: NextPage = async () => {
	const data = await nasaAPI.getDayAsteroids();
	return <Home data={data} />;
};

export default HomePage;
