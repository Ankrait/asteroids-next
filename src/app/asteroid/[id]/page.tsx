import { NextPage } from 'next';

import Asteroid from '@/components/screens/Asteroid/Asteroid';
import ErrorPopup from '@/components/common/ErrorPopup/ErrorPopup';
import { nasaAPI } from '@/services/services';

interface IAsteroidPage {
	params: {
		id: string;
	};
}

const AsteroidPage: NextPage<IAsteroidPage> = async ({ params: { id } }) => {
	const response = await nasaAPI.getAsteroid(id);

	const error = typeof response === 'string' ? response : '';
	const data = typeof response === 'string' ? null : response;

	return (
		<>
			{error && <ErrorPopup value={error} />}
			<Asteroid data={data} />
		</>
	);
};

export default AsteroidPage;
