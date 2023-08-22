import { NextPage } from 'next';

import Asteroid from '@/components/screens/Asteroid/Asteroid';
import { nasaAPI } from '@/services/services';

interface IAsteroidPage {
	params: {
		id: string;
	};
}

const AsteroidPage: NextPage<IAsteroidPage> = async ({ params: { id } }) => {
	const data = await nasaAPI.getAsteroid(id);

	return <Asteroid data={data} />;
};

export default AsteroidPage;
