import {expect, test} from "@playwright/test";
import {Paths} from "../../enums/paths.enum";
import {responseToJSON} from "../../helpers";

test.describe('Authorization service - ', async () => {

    const data = [
        {
            "testPrefix": 'without password',
            "fieldAndValue": {"email": "eve.holt@reqres.in"},
            "errorMessage": 'Missing password'
        },
        {
            "testPrefix": 'without email',
            "fieldAndValue": {"password": "pistol"},
            "errorMessage": 'Missing email or username'
        },
        {
            "testPrefix": 'without email and password',
            "fieldAndValue": {},
            "errorMessage": 'Missing email or username'
        },
        {
            "testPrefix": 'with not existent user',
            "fieldAndValue": {"email": "not_exist", "password": "pistol"},
            "errorMessage": 'user not found'
        }
    ];

    test('successful log in', async ({request}) => {
        const response = await request.post(Paths.LOGIN, {
            data: {
                "email": "eve.holt@reqres.in",
                "password": "cityslicka"
            }
        });
        const responseBody = await responseToJSON(response);
        expect(response.status()).toBe(200);
        expect(responseBody.token).toBeTruthy();
    });

    for (const {testPrefix, fieldAndValue, errorMessage} of data) {
        test(`unsuccessful login ${testPrefix}`, async ({request}) => {
            const response = await request.post(Paths.LOGIN, {
                data: fieldAndValue
            });
            const responseBody = await responseToJSON(response)
            expect(response.status()).toBe(400);
            expect(responseBody.error).toBe(errorMessage);
        });
    }
});