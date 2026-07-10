import { addDays, format, subDays } from 'date-fns';

export const DateUtils = {
  /**   
   * @param offset number of days to add (positive) or subtract (negative) from the current date
   * @param formatStr (default 'yyyy-MM-dd')
   */
 
    getRelativeDate(offset: number) {
    const today = new Date();
    const targetDate = offset >= 0 ? addDays(today, offset) : subDays(today, Math.abs(offset));

    return {
      day: format(targetDate, 'dd'),       
      month: format(targetDate, 'MM'),     
      year: format(targetDate, 'yyyy'),    
      fullDate: format(targetDate, 'yyyy-MM-dd')
    };
  }

};





