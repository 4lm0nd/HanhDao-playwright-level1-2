import { Locator } from '@playwright/test';

export type OccupancyOption = 'adults' | 'children' | 'rooms';

export type OccupancyControl = {
    value: Locator;
    increase: Locator;
    decrease: Locator;
};

export const OCCUPANCY_CONFIG: Record<OccupancyOption, { component: string; selenium: string }> = {
    rooms: { component: 'room', selenium: 'Rooms' },
    adults: { component: 'adult', selenium: 'Adults' },
    children: { component: 'children', selenium: 'Children' },
};
