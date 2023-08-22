interface INasaCloseApproachData {
	close_approach_date: string;
	close_approach_date_full: string;
	epoch_date_close_approach: number;
	relative_velocity: INasaRelativeVelocity;
	miss_distance: INasaMissDistance;
	orbiting_body: string;
}

export interface INasaRelativeVelocity {
	kilometers_per_second: string;
	kilometers_per_hour: string;
	miles_per_hour: string;
}

interface INasaMissDistance {
	astronomical: string;
	lunar: string;
	kilometers: string;
	miles: string;
}

interface INasaDiameters {
	kilometers: INasaFeet;
	meters: INasaFeet;
	miles: INasaFeet;
	feet: INasaFeet;
}

interface INasaFeet {
	estimated_diameter_min: number;
	estimated_diameter_max: number;
}

export interface INasaAsteroid {
	links: {
		self: string;
	};
	id: string;
	name: string;
	estimated_diameter: INasaDiameters;
	absolute_magnitude_h: number;
	is_potentially_hazardous_asteroid: boolean;
	close_approach_data: INasaCloseApproachData[];
	is_sentry_object: boolean;
}

export interface INasaAsteroidsData {
	links: {
		next: string;
		previous: string;
		self: string;
	};
	element_count: number;
	near_earth_objects: { [key: string]: INasaAsteroid[] };
}

export interface IReducedAsteroid {
	id: string;
	name: string;
	diameter: number;
	distance: IDistance;
	date: string;
	isDangerous: boolean;
}

export interface IAsteroid {
	id: string;
	name: string;
	absoluteMagnitudeH: number;
	diameters: {
		min: number;
		max: number;
	};
	isDangerous: boolean;
	closeApproachData: ICloseApproachData[];
}

export interface ICloseApproachData {
	id: number;
	date: string;
	speed: number;
	distance: IDistance;
	orbitingBody: string;
}

export interface IDistance {
	lunar: number;
	kilometers: number;
}
