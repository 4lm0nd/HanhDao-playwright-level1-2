import { expect, Locator, Page, test } from '@playwright/test';
import { BasePage } from './base.page';
import { DateUtils } from '../utils/date.utils';
import { ResultsPage } from './results.page';
import type { OccupancyOption, OccupancyControl } from '../data/occupancy.type';

export class HomePage extends BasePage {

    readonly destinationInput: Locator;
    readonly autocompleteDropdown: Locator;
    readonly suggestionItems: Locator;
    readonly searchButton: Locator;
    readonly searchErrorMessage: Locator;
    readonly checkInDateInput: Locator;
    readonly checkOutDateInput: Locator;
    readonly dropdownContainer: Locator;
    readonly occupancyBox: Locator;
 

    constructor(page: Page) {
        super(page);
        this.destinationInput = page.locator('[data-selenium="textInput"]');
        this.autocompleteDropdown = page.getByTestId('autocomplete-list-box');
        this.suggestionItems = this.autocompleteDropdown.locator('li');
        this.searchButton = page.locator('[data-element-name="search-button"]');
        this.searchErrorMessage = page.locator('[data-element-name="search-box-modal-message"]');
        this.checkInDateInput = page.locator('[data-selenium="checkInBox"]');
        this.checkOutDateInput = page.locator('[data-selenium="checkOutBox"]');
        this.dropdownContainer = page.locator('div[data-selenium="autocompletePanel"]');    
        this.occupancyBox = page.locator('[data-element-name="occupancy-box"]');
    }

    async searchDestination(destination: string): Promise<void> {
        await test.step('Search destination: "${destination}"', async () => {
            await this.destinationInput.click();
            await this.destinationInput.pressSequentially(destination, { delay: 100 });
        });
    }
      

    async verifySuggestionsRelatedTo(destination: string): Promise<void> {
        await test.step('Verify suggestions related to: "${destination}"', async () => {
        const suggestions = await this.suggestionItems.allTextContents();
        const relatedSuggestions = suggestions.filter(
            suggestion => suggestion.toLowerCase().includes(destination.toLowerCase()))});
       
    }

    async getSearchErrorMessage(): Promise<string> {
        return await test.step('Get search error message', async () => {
        return (await this.searchErrorMessage.innerText()).trim()});
}

    async selectDate(offset: number): Promise<void> {
        await test.step('Select date with offset: "${offset}"', async () => {
        const selectedDate = DateUtils.getRelativeDate(offset);
        const dateCell= this.page.locator(`span[data-selenium-date="${selectedDate.fullDate}"]`);
        await dateCell.waitFor({ state: 'visible' });
        await dateCell.click()});     
    }

    async verifyDateIsDisabled(offset: number): Promise<void> {
        await test.step('Verify date with offset: "${offset}" is disabled', async () => {
        const invalidCheckOutDate = DateUtils.getRelativeDate(offset - 1);   
        const pastDateCell = this.page.locator(`span[data-selenium-date="${invalidCheckOutDate.fullDate}"]`);
        await pastDateCell.waitFor({ state: 'visible' });
        const rootDayCell = pastDateCell.locator('..').locator('..');
        await expect(rootDayCell).toHaveAttribute('aria-disabled', 'true')});       
}

    async selectAutocompleteItem(keyword: string): Promise<void> {
        await test.step('Select autocomplete item with keyword: "${keyword}"', async () => {
        await this.autocompleteDropdown.waitFor({ state: 'visible' });        
        const targetItem = this.dropdownContainer.locator(`li[data-element-suggestion-label="${keyword}"]`);
        await targetItem.click()});
}

    async verifyAutocompleteDropdownContains(destination: string): Promise<void> {
        await test.step('Verify autocomplete dropdown is visible and contains: "${destination}"', async () => {       
        await expect(this.autocompleteDropdown).toBeVisible();   
        await expect(this.autocompleteDropdown).toContainText(destination);
    });
}

    async verifySearchErrorMessage(actualMessage: string, expectedMessage: string): Promise<void> {
     await test.step(`Verify search error message is: "${expectedMessage}"`, async () => {             
        expect(actualMessage).toBe(expectedMessage);
    });

}

    private getOccupancyControl(option: OccupancyOption): OccupancyControl {
        const controls: Record<OccupancyOption, OccupancyControl> = {
            rooms: {
                value: this.page.locator('[data-component="desktop-occ-room-value"]'),
                increase: this.page.locator('[data-selenium="occupancyRooms"] [data-selenium="plus"]'),
                decrease: this.page.locator('[data-selenium="occupancyRooms"] [data-selenium="minus"]'),
            },
            adults: {
                value: this.page.locator('[data-component="desktop-occ-adult-value"]'),
                increase: this.page.locator('[data-selenium="occupancyAdults"] [data-selenium="plus"]'),
                decrease: this.page.locator('[data-selenium="occupancyAdults"] [data-selenium="minus"]'),
            },
            children: {
                value: this.page.locator('[data-component="desktop-occ-children-value"]'),
                increase: this.page.locator('[data-selenium="occupancyChildren"] [data-selenium="plus"]'),
                decrease: this.page.locator('[data-selenium="occupancyChildren"] [data-selenium="minus"]'),
            },
        };

        return controls[option];
    }

 
    private async getOccupancyValue(control: OccupancyControl): Promise<number> {
        const text = await control.value.textContent();
        return Number(text?.trim() || '0');
    }

 
    async selectOccupancyOption(option: OccupancyOption, targetValue: number): Promise<void> {
        await test.step('Select occupancy option "${option}" with target value: ${targetValue}', async () => {
        if (!Number.isInteger(targetValue) || targetValue < 0) {
            throw new Error(`Invalid target value: ${targetValue}`);
        }

        const control = this.getOccupancyControl(option);
        let currentValue = await this.getOccupancyValue(control);

        while (currentValue !== targetValue) {
            const button = currentValue < targetValue ? control.increase : control.decrease;
            await button.click();
            await expect
                .poll(() => this.getOccupancyValue(control), {
                    timeout: 3000,
                    message: `UI did not update when changing "${option}" from ${currentValue}. It may have hit min/max limits.`,
                })
                .not.toBe(currentValue);

            currentValue = await this.getOccupancyValue(control);
        }
    });
}

    async clickSearch(): Promise<ResultsPage> {
       return await test.step('Click search button and wait for results page to load', async () => {
        const context = this.page.context();
        const pagePromise = context.waitForEvent('page');
        await this.searchButton.click();
        const newTab = await pagePromise;
        await newTab.waitForLoadState('load');
        return new ResultsPage(newTab);
    }); 
    }
}
