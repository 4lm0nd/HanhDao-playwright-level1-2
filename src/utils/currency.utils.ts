export class CurrencyUtils {
    static parseCurrency(value: string): number {
        return Number(value.replace(/[^\d]/g, ''));
    }
}