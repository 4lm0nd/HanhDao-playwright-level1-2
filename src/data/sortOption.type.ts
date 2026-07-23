import { Locator } from '@playwright/test';

export type SortOption = 'BestMatch' | 'LowestPrice' | 'HighestPrice' | 'TopRatings' | 'SecretDeals';

export const OPTION_CONFIG: Record<SortOption, { component: string; selenium: string }> = {
    BestMatch: { component: 'Best match', selenium: '0' },
    LowestPrice: { component: 'Lowest price', selenium: '1' },
    HighestPrice: { component: 'Highest price', selenium: '2' },
    TopRatings: { component: 'Top guest ratings', selenium: '3' },
    SecretDeals: { component: 'Secret deals', selenium: '4' }
}