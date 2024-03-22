import {expect, test} from "@playwright/test";
import {Paths} from "../../enums/paths.enum";
import {responseToJSON} from "../../helpers";

test.describe('Authorization service -', () => {

    const data = [
        {
            "testPrefix": 'password',
            "fieldAndValue": {"email": "eve.holt@reqres.in"},
            "errorMessage": 'Missing password'
        },
        {
            "testPrefix": 'email',
            "fieldAndValue": {"password": "pistol"},
            "errorMessage": 'Missing email or username'
        },
        {
            "testPrefix": 'email and password',
            "fieldAndValue": {},
            "errorMessage": 'Missing email or username'
        }
    ];

    test('successful registration', async ({request}) => {
        const response = await request.post(Paths.REGISTER, {
            data: {
                "email": "eve.holt@reqres.in",
                "password": "pistol"
            },
        });
        const responseBody = await responseToJSON(response)
        expect(response.status()).toBe(200);
        expect(responseBody.id).toBeTruthy();
        expect(responseBody.token).toBeTruthy();
    })

    for (const {testPrefix, fieldAndValue, errorMessage} of data) {
        test(`unsuccessful registration without ${testPrefix}`, async ({request}) => {
            const response = await request.post(Paths.REGISTER, {
                data: fieldAndValue
            });
            const responseBody = await responseToJSON(response)
            expect(response.status()).toBe(400);
            expect(responseBody.error).toBe(errorMessage);
        });
    }
});