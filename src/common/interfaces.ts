import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IReducedAsteroid } from '@/services/services.interface';

export interface IHtmlProps<T extends HTMLElement = HTMLDivElement>
	extends DetailedHTMLProps<HTMLAttributes<T>, T> {}

export type updateCartValueType = {
	action: 'add' | 'delete';
	item: IReducedAsteroid;
};

export type DistanceUnitType = 'lunar' | 'kilometers';
