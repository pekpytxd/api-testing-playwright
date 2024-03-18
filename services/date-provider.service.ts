// @ts-ignore
import moment from 'moment';
export class DateProvider {

    getCurrentDate(): string {
        return moment().format('YYYY-MM-DD');
    }

    getFormattedDate(date: string, format: string): string {
        return moment(date).format(format);
    }
}