import { NextPage } from 'next';

import Home from '@/components/screens/Home/Home';
import ErrorPopup from '@/components/common/ErrorPopup/ErrorPopup';
import { nasaAPI } from '@/services/services';

export const revalidate = 1800;

const HomePage: NextPage = async () => {
	const response = await nasaAPI.getDayAsteroids();

	const error = typeof response === 'string' ? response : '';
	const data = typeof response === 'string' ? [] : response;

	return (
		<>
			{error && <ErrorPopup value={error} />}
			<Home data={data} />
		</>
	);
};

export default HomePage;
