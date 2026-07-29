import { HomePage } from '../pages/home.page';
import { ResultsPage } from '../pages/results.page';

export type SearchHotelOptions = {
    destination: string;
    suggestion: string;
    checkInDate?: number;
    checkOutDate?: number;
};

export class HotelSearchWorkflow {
    constructor(private readonly homePage: HomePage) { }
    async searchHoltel({
        destination,
        suggestion,
        checkInDate,
        checkOutDate,
    }: SearchHotelOptions): Promise<ResultsPage> {
        await this.homePage.searchDestination(destination);
        await this.homePage.selectAutocompleteItem(suggestion);
        await this.homePage.selectDateFromDatePicker(checkInDate);
        await this.homePage.selectDateFromDatePicker(checkOutDate);
        const resultsPage = await this.homePage.clickSearch();
        return resultsPage;

    }
}