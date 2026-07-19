import { expect, Locator, Page } from '@playwright/test';
import { CurrencyUtils } from '../utils/currency.utils';

export class ResultsPage {
    readonly page: Page;
    readonly hotelCards: Locator;
    readonly maxPriceHandle: Locator;
    readonly sliderTrack: Locator;
    readonly maxPriceLabel: Locator;
    readonly holtelPrices: Locator;

    constructor(page: Page) {
        this.page = page;
        this.hotelCards = page.locator('[data-element-name="property-card-info"]');
        this.maxPriceHandle = this.page
            .locator(':not(#stickyBoxFilters) > [data-element-name="search-filter-price"]')
            .getByRole('slider', { name: 'MAX' });
        this.sliderTrack = this.page.locator('.rc-slider-track.rc-slider-track-1');
        this.maxPriceLabel = this.page.locator('.Maximum price filter');
        this.holtelPrices = this.page.locator('[data-selenium="display-price"]');
    }

    async verifySearchResults(destination: string, index: number): Promise<void> {
        await expect.poll(async () => await this.hotelCards.count(), {
            timeout: 10000,
            message: 'No hotel cards were loaded within 10 seconds.'
        }).toBeGreaterThan(0);


        for (let i = 0; i < index; i++) {
            await expect(this.hotelCards.nth(i)).toBeVisible();
            await expect(this.page.locator('[data-selenium= "area-city-text"]').nth(i)).
                toContainText(destination, { timeout: 10000 });
        }
    };

    async adjustSliderPrice(targetValue: number): Promise<number> {

        await this.page.waitForLoadState('domcontentloaded');
        await this.maxPriceHandle.waitFor({ state: 'visible', timeout: 5000 });

        const handle = this.maxPriceHandle;
        await handle.focus();
        const currentValueStr = await handle.getAttribute('aria-valuenow');
        const currentValue = currentValueStr ? parseInt(currentValueStr, 10) : 35;
        const steps = Math.abs(targetValue - currentValue);
        const key = targetValue > currentValue ? 'ArrowRight' : 'ArrowLeft';

        for (let i = 0; i < steps; i++) {
            await handle.press(key);
            await this.page.waitForTimeout(50);
        }

        const maxPriceStr = await this.maxPriceHandle.getAttribute('aria-valuetext') ?? '';
        const actualMaxPrice = CurrencyUtils.parseCurrency(maxPriceStr);
        return actualMaxPrice
    };

    async verifyPrice(expectedMaxPrice: number): Promise<void> {
        await expect.poll(async () => await this.holtelPrices.count(), {
            timeout: 10000,
            message: 'No results were loaded within 10 seconds.'
        }).toBeGreaterThan(0);

        for (let i = 0; i < 3; i++) {
            await expect(this.holtelPrices.nth(i)).toBeVisible();
            const priceText = await this.holtelPrices.nth(i).textContent() ?? '';
            const actualPrice = CurrencyUtils.parseCurrency(priceText);
            expect(actualPrice).toBeLessThanOrEqual(expectedMaxPrice);
        }
    };

}

