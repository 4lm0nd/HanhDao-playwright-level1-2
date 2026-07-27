import { addDays, format, subDays } from 'date-fns';

export const DateUtils = {
  /**   
   * @param offset number of days to add (positive) or subtract (negative) from the current date
   * @param formatStr (default 'yyyy-MM-dd')
   */

  getRelativeDate(offset: number, formatStr: string = 'yyyy-MM-dd') {
    const today = new Date();
    const targetDate = addDays(today, offset);

    return {
      day: format(targetDate, 'dd'),
      month: format(targetDate, 'MM'),
      year: format(targetDate, 'yyyy'),
      fullDate: format(targetDate, 'yyyy-MM-dd')
    };
  }
};





