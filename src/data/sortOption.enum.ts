import { Locator } from '@playwright/test';


export interface ISortOption {
    readonly component: string;
    readonly selenium: string;
}

export const SortOptions = {
    BestMatch: { component: 'Best match', selenium: '0' },
    LowestPrice: { component: 'Lowest price', selenium: '1' },
    HighestPrice: { component: 'Highest price', selenium: '2' },
    TopRatings: { component: 'Top guest ratings', selenium: '3' },
    SecretDeals: { component: 'Secret deals', selenium: '4' },
} as const satisfies Record<string, ISortOption>;

export type SortOption = typeof SortOptions[keyof typeof SortOptions];