import {expect, test} from "@playwright/test";
import {Paths} from "../../enums/paths.enum";
import {responseToJSON} from "../../helpers";

test.describe('GET ', async () => {
    test('all users', async ({request}) => {
        const response = await request.get(Paths.USERS);
        const responseBody = await responseToJSON(response)
        expect(response.status()).toBe(200);
        expect(responseBody.total).toBeTruthy()
        expect(responseBody.data).toBeInstanceOf(Array)
        expect(responseBody.data[0].id).toBeTruthy()
    })

    test('single user', async ({request}) => {
        const response = await request.get(`${Paths.USERS}/2`)
        const responseBody = await responseToJSON(response)
        expect(response.status()).toBe(200)
        expect(responseBody.data.id).toBeTruthy()
        expect(responseBody.data.email).toBe("janet.weaver@reqres.in")
        expect(responseBody.data.first_name).toBe("Janet")
        expect(responseBody.data.last_name).toBe("Weaver")
        expect(responseBody.data.avatar).toBe("https://reqres.in/img/faces/2-image.jpg")
    })

    test('not existent user', async ({request}) => {
        const response = await request.get(`${Paths.USERS}/23`)
        const responseBody = await responseToJSON(response)
        expect(response.status()).toBe(401)
    })
})