import { expect, Locator, Page, test } from '@playwright/test';
import { DateUtils } from '../utils/date.utils';
import { ResultsPage } from './results.page';
import type { OccupancyOption, OccupancyControl } from '../data/occupancy.type';
import { OCCUPANCY_CONFIG } from '../data/occupancy.type';
import { parse } from 'date-fns';
import { CurrencyUtils } from '../utils/currency.utils';
export type OccupancyConfig = Partial<Record<OccupancyOption, number>>;

export class HomePage {
    readonly page: Page;
    readonly destinationInput: Locator;
    readonly autocompleteDropdown: Locator;
    readonly suggestionItems: Locator;
    readonly searchButton: Locator;
    readonly searchErrorMessage: Locator;
    readonly checkInDateInput: Locator;
    readonly checkOutDateInput: Locator;
    readonly dropdownContainer: Locator;
    readonly occupancyBox: Locator;
    readonly sortDropDown: Locator;



    constructor(page: Page) {
        this.page = page;
        this.destinationInput = page.locator('[data-selenium="textInput"]');
        this.autocompleteDropdown = page.getByTestId('autocomplete-list-box');
        this.suggestionItems = this.autocompleteDropdown.locator('li');
        this.searchButton = page.locator('[data-element-name="search-button"]');
        this.searchErrorMessage = page.locator('[data-element-name="search-box-modal-message"]');
        this.checkInDateInput = page.locator('[data-selenium="checkInText"]');
        this.checkOutDateInput = page.locator('[data-selenium="checkOutText"]');
        this.dropdownContainer = page.locator('div[data-selenium="autocompletePanel"]');
        this.occupancyBox = page.locator('[data-element-name="occupancy-box"]');
        this.sortDropDown = page.locator('[data-element-name="search-sort-dropdown"]');


    }

    async searchDestination(destination: string): Promise<void> {
        await test.step('Search destination: "${destination}"', async () => {
            await this.destinationInput.click();
            await this.destinationInput.pressSequentially(destination, { delay: 100 });
        });
    }

    async getSearchErrorMessage(): Promise<string> {
        return (await this.searchErrorMessage.innerText()).trim();
    }

    async selectDateFromDatePicker(offset: number,): Promise<void> {
        await test.step('Select date from Datepicker with offset: "${offset}"', async () => {

            const dateText = await this.checkInDateInput.innerText();
            const selectedDate = DateUtils.getRelativeDate(offset);
            const selectedMonth = CurrencyUtils.parseCurrency(selectedDate.month);
            const monthCheckInText = DateUtils.parseDate(dateText, 'd MMM yyyy').month;
            const monthCheckIn = CurrencyUtils.parseCurrency(monthCheckInText);

            if (monthCheckIn < selectedMonth) {
                const nextBtn = this.page.locator('[aria-label="Next Month"]');
                await nextBtn.click();
                await this.page.waitForTimeout(500);
            }
            else if (monthCheckIn > selectedMonth) {
                const prevBtn = this.page.locator('[aria-label="Previous Month"]');
                await prevBtn.click();
                await this.page.waitForTimeout(500);
            }

            const dateCell = this.page.locator(`span[data-selenium-date="${selectedDate.fullDate}"]`);
            await dateCell.click();
        });
    }

    async selectDate({
        checkInDate,
        checkOutDate,
    }: {
        checkInDate: number;
        checkOutDate: number;
    }): Promise<void> {
        await this.selectDateFromDatePicker(checkInDate);
        await this.selectDateFromDatePicker(checkOutDate);
    }


    async verifyDateIsDisabled(offset: number): Promise<void> {
        await test.step('Verify date with offset: "${offset}" is disabled', async () => {

            const checkOutDate = DateUtils.getRelativeDate(offset);
            const dayOfMonth = checkOutDate.day

            if (dayOfMonth === '01') {
                const previousMonthButton = this.page.locator('[aria-label="Previous Month"]');
                expect(previousMonthButton).toBeDisabled();
            } else {
                const invalidCheckOutDate = DateUtils.getRelativeDate(offset - 1);
                const pastDateCell = this.page.locator(`span[data-selenium-date="${invalidCheckOutDate.fullDate}"]`);
                const rootDayCell = this.page
                    .getByRole('button')
                    .filter({ has: pastDateCell });
                expect(rootDayCell).toBeDisabled
            }

        });
    }

    async selectAutocompleteItem(keyword: string): Promise<void> {
        await test.step('Select autocomplete item with keyword: "${keyword}"', async () => {
            await this.autocompleteDropdown.waitFor({ state: 'visible' });
            const targetItem = this.dropdownContainer.locator(`li[data-element-suggestion-label="${keyword}"]`);
            await targetItem.click()
        });
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

    async selectOccupancy(config: OccupancyConfig): Promise<void> {
        const entries = Object.entries(config) as [OccupancyOption, number][];
        for (const [option, targetValue] of entries) {
            await this.selectOccupancyOption(option, targetValue);
        }
    }

    async selectOccupancyOption(option: OccupancyOption, targetValue: number): Promise<void> {

        await test.step('Select occupancy option "${option}" with target value: ${targetValue}', async () => {
            if (!Number.isInteger(targetValue) || targetValue < 0) {
                throw new Error(`Invalid target value: ${targetValue}. Must be a non-negative integer.`);
            }

            const control = this.getOccupancyControl(option);
            let currentValue = await this.getOccupancyValue(control);

            while (currentValue !== targetValue) {
                const isIncreasing = currentValue < targetValue;
                const button = isIncreasing ? control.increase : control.decrease;

                if (await button.isDisabled()) {
                    throw new Error(
                        `Cannot reach target ${targetValue} for "${option}". The ` +
                        `"${isIncreasing ? 'plus' : 'minus'}" button is disabled at current value: ${currentValue}.`
                    );
                }

                await button.click();

                await expect
                    .poll(async () => {
                        currentValue = await this.getOccupancyValue(control);
                        return currentValue;
                    }, {
                        timeout: 3000,
                        message: `UI failed to update when clicking "${isIncreasing ? 'plus' : 'minus'}" for "${option}" from ${currentValue}.`
                    })
                    .not.toBe(currentValue);
            }
        });
    }

    private async getOccupancyValue(control: OccupancyControl): Promise<number> {
        const text = await control.value.textContent();
        return Number(text?.trim() || '0');
    }

    private getOccupancyControl(option: OccupancyOption): OccupancyControl {
        const { component, selenium } = OCCUPANCY_CONFIG[option];

        return {
            value: this.page.locator(`[data-component="desktop-occ-${component}-value"]`),
            increase: this.page.locator(`[data-selenium="occupancy${selenium}"] [data-selenium="plus"]`),
            decrease: this.page.locator(`[data-selenium="occupancy${selenium}"] [data-selenium="minus"]`),
        };
    }


}
