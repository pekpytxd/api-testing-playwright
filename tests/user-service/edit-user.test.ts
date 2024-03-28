import {expect, test} from "@playwright/test"
import {Paths} from "../../enums/paths.enum"
import {getEditUserTestData} from "../../data-providers/user-data.provider"
import {responseToJSON} from "../../helpers"

// preconditions: User with name "morpheus" already created
test.describe('Edit User ', async () => {


    test('with PUT request', async ({request}) => {
        const response = await request.put(`${Paths.USERS}/2`, {
            data: getEditUserTestData().withNameAndJob
        })
        const responseBody = await responseToJSON(response)
        expect(response.status()).toBe(200)
        expect(responseBody.name).toBe(getEditUserTestData().withNameAndJob.name)
        expect(responseBody.job).toBe(getEditUserTestData().withNameAndJob.job)
        expect(responseBody.updatedAt).toBeTruthy()
    })

    test('with PATCH request', async ({request}) => {
        const response = await request.patch(`${Paths.USERS}/2`, {
            data: getEditUserTestData().withNameAndJob
        })
        const responseBody = await responseToJSON(response)
        expect(response.status()).toBe(200)
        expect(responseBody.name).toBe(getEditUserTestData().withNameAndJob.name)
        expect(responseBody.job).toBe(getEditUserTestData().withNameAndJob.job)
        expect(responseBody.updatedAt).toBeTruthy()
    })
})