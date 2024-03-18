import {expect, test} from "@playwright/test";
import {Paths} from "../enums/paths.enum";
import {DateProvider} from "../services/date-provider.service";

const apodURL: string = `/planetary/${Paths.APOD}?api_key=${process.env.API_TOKEN}`
const currentDate: string = new DateProvider().getCurrentDate();

test.describe('APOD service', () => {

    test('should return Astronomy Picture of the Day', async ({request}) => {
        const picture = await request.get(apodURL);
        const responseBody = JSON.parse(await picture.text());
        expect(picture.ok()).toBeTruthy();
        expect(responseBody).toHaveProperty('date', currentDate)
    });

    test('should return 50 Astronomy Picutre of the Day', async ({request}) => {
        const pictures = await request.get(`${apodURL}&count=50`);
        const responseBody = JSON.parse(await pictures.text());
        expect(responseBody).toHaveLength(50);
    });

});
