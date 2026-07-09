import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {

    readonly destinationInput: Locator;
    readonly autocompleteDropdown: Locator;
    readonly suggestionItems: Locator;
    readonly searchButton: Locator;
    readonly searchErrorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.destinationInput = page.locator('[data-selenium="textInput"]');
        this.autocompleteDropdown = page.getByTestId('autocomplete-list-box');
        this.suggestionItems = this.autocompleteDropdown.locator('li');
        this.searchButton = page.locator('[data-element-name="search-button"]');
        this.searchErrorMessage = page.locator('[data-element-name="search-box-modal-message"]');
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

    async clickSearchButton(): Promise<void> {
        await this.searchButton.click();
    }

    async getSearchErrorMessage(): Promise<string> {
    return (await this.searchErrorMessage.innerText()).trim();
}
   
}

