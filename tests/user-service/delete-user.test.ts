import {expect, test} from "@playwright/test";
import {Paths} from "../../enums/paths.enum";

test.describe('Delete ', async () => {

    test('existent user', async ({request}) => {
        const response = await request.delete(`${Paths.USERS}/2`)
        expect(response.status()).toBe(204)
    })

})