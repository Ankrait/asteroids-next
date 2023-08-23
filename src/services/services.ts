import axios, { AxiosError, AxiosResponse } from 'axios';
import {
	IAsteroid,
	ICloseApproachData,
	INasaAsteroid,
	INasaAsteroidsData,
	IReducedAsteroid,
} from './services.interface';

axios.defaults.baseURL = 'https://api.nasa.gov/neo/rest/v1';
axios.defaults.params = { api_key: process.env.NEXT_PUBLIC_NASA_API_KEY };

export const nasaAPI = {
	getDayAsteroids: async (dayCount = 0): Promise<IReducedAsteroid[] | string> => {
		const result: IReducedAsteroid[] = [];

		const dateObj = new Date();
		dateObj.setDate(dateObj.getDate() + dayCount);

		const date = dateObj.toISOString().split('T')[0];

		let response: AxiosResponse<INasaAsteroidsData>;

		try {
			response = await axios.get(`/feed?start_date=${date}&end_date=${date}`);
		} catch (error) {
			if (error instanceof AxiosError) {
				return !error.response ? 'Ошибка интернета' : 'Ошибка сервера';
			}
			return [];
		}

		response.data.near_earth_objects[date].forEach((item) => {
			try {
				const id = item.id;
				const name = item.name.match(/\((.+)\)/)?.splice(1, 1)[0] || item.name;
				const isDangerous = item.is_potentially_hazardous_asteroid;
				const minDiameter = item.estimated_diameter.meters.estimated_diameter_min;
				const maxDiameter = item.estimated_diameter.meters.estimated_diameter_max;
				const { lunar, kilometers } = item.close_approach_data[0].miss_distance;

				result.push({
					id,
					name,
					diameter: Math.round((minDiameter + maxDiameter) / 2),
					distance: { lunar: Math.round(+lunar), kilometers: Math.round(+kilometers) },
					isDangerous,
					date,
				});
			} catch {
				return;
			}
		});

		return result;
	},
	getAsteroid: async (key: string): Promise<IAsteroid | null | string> => {
		try {
			const response = await axios.get<INasaAsteroid>(`/neo/${key}`);

			const id = response.data.id;
			const name = response.data.name;
			const absoluteMagnitudeH = response.data.absolute_magnitude_h;
			const diameters = response.data.estimated_diameter.meters;
			const isDangerous = response.data.is_potentially_hazardous_asteroid;
			const closeApproachData: ICloseApproachData[] = [];

			response.data.close_approach_data.forEach((el, i) => {
				try {
					const date = el.close_approach_date;
					const speed = Math.round(+el.relative_velocity.kilometers_per_hour);
					const { kilometers, lunar } = el.miss_distance;
					const orbitingBody = el.orbiting_body;

					closeApproachData.push({
						id: i,
						date,
						speed,
						orbitingBody,
						distance: {
							kilometers: Math.round(+kilometers),
							lunar: Math.round(+lunar),
						},
					});
				} catch {
					return;
				}
			});

			return {
				id,
				name,
				absoluteMagnitudeH,
				isDangerous,
				closeApproachData,
				diameters: {
					min: Math.round(diameters.estimated_diameter_min),
					max: Math.round(diameters.estimated_diameter_max),
				},
			};
		} catch (error) {
			if (error instanceof AxiosError) {
				return !error.response ? 'Ошибка интернета' : 'Ошибка сервера';
			}
			return null;
		}
	},
};
