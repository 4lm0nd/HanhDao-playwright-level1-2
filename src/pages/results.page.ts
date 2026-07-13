import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ResultsPage extends BasePage {
    readonly hotelCards: Locator;
    
    constructor(page: Page) {
        super(page);
        this.hotelCards = page.locator('[data-element-name="property-card-info"]');
  
    }

    async verifySearchResults(destination: string): Promise<void> {         
        await expect.poll(async () => await this.hotelCards.count(), {
            timeout: 10000,
            message: 'No hotel cards were loaded within 10 seconds.'
        }).toBeGreaterThan(0);       
        await expect(this.hotelCards.first()).toBeVisible();
        const firstHotelLocation = this.hotelCards.first().locator('[data-selenium="area-city-text"]');
        await expect(firstHotelLocation).toContainText(destination, { timeout: 10000 });

    }


}