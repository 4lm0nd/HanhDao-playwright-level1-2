export class DataUtils {
    static parseNumber(value: string): number {
        return Number(value.replace(/[^\d]/g, ''));
    }
}