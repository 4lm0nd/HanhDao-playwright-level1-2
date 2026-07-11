import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { DateUtils } from '../utils/date.utils';

export class HomePage extends BasePage {

    readonly destinationInput: Locator;
    readonly autocompleteDropdown: Locator;
    readonly suggestionItems: Locator;
    readonly searchButton: Locator;
    readonly searchErrorMessage: Locator;
    readonly checkInDateInput: Locator;
    readonly checkOutDateInput: Locator;
    readonly datePicker: Locator;

    constructor(page: Page) {
        super(page);
        this.destinationInput = page.locator('[data-selenium="textInput"]');
        this.autocompleteDropdown = page.getByTestId('autocomplete-list-box');
        this.suggestionItems = this.autocompleteDropdown.locator('li');
        this.searchButton = page.locator('[data-element-name="search-button"]');
        this.searchErrorMessage = page.locator('[data-element-name="search-box-modal-message"]');
        this.checkInDateInput = page.locator('[data-selenium="checkInBox"]');
        this.checkOutDateInput = page.locator('[data-selenium="checkOutBox"]');
        this.datePicker = page.locator('[role="tabpanel"]');
    }

    async searchDestination(destination: string): Promise<void> {
       await this.destinationInput.click();
       await this.destinationInput.pressSequentially(destination, { delay: 100 });
    }

    async verifySuggestionsRelatedTo(destination: string): Promise<void> {
        const suggestions = await this.suggestionItems.allTextContents();
        const relatedSuggestions = suggestions.filter(
            suggestion => suggestion.toLowerCase().includes(destination.toLowerCase()));
       
    }

    async getSearchErrorMessage(): Promise<string> {
    return (await this.searchErrorMessage.innerText()).trim();
}

    async selectDate(offset: number): Promise<void> {
        const selectedDate = DateUtils.getRelativeDate(offset);
        const dateCell= this.page.locator(`span[data-selenium-date="${selectedDate.fullDate}"]`);
        await dateCell.waitFor({ state: 'visible' });
        await dateCell.click();     
    }

    async verifyDateIsDisabled(offset: number): Promise<void> {
     const invalidCheckOutDate = DateUtils.getRelativeDate(offset - 1);   
     const pastDateCell = this.page.locator(`span[data-selenium-date="${invalidCheckOutDate.fullDate}"]`);
     await pastDateCell.waitFor({ state: 'visible' });
     const rootDayCell = pastDateCell.locator('..').locator('..');
     await expect(rootDayCell).toHaveAttribute('aria-disabled', 'true');       
}
}

