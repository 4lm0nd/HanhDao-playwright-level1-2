import { Locator } from '@playwright/test';

export type OccupancyOption = 'adults' | 'children' | 'rooms';

export type OccupancyControl = {
    value: Locator;
    increase: Locator;
    decrease: Locator;
};