import {expect, test} from "@playwright/test"
import {Paths} from "../../enums/paths.enum"
import {responseToJSON} from "../../helpers"
import {getPOSTUserTestData} from "../../data-providers/user-data.provider"

test.describe('Create User ', async () => {

    test('with credentials', async ({request}) => {
        const response = await request.post(Paths.USERS, {
            data: getPOSTUserTestData().withCredentials
        })
        const responseBody = await responseToJSON(response)
        expect(response.status()).toBe(201)
        expect(responseBody.name).toBe(getPOSTUserTestData().withCredentials.name)
        expect(responseBody.job).toBe(getPOSTUserTestData().withCredentials.job)
        expect(responseBody.id).toBeTruthy()
        expect(responseBody.createdAt).toBeTruthy()
    })

    test('with empty name and job', async ({request}) => {
        const response = await request.post(Paths.USERS, {
            data: getPOSTUserTestData().withoutNameAndJob
        })
        const responseBody = await responseToJSON(response)
        expect(responseBody.name).toBe(' ')
        expect(responseBody.job).toBe(' ')
        expect(response.status()).toBe(201)
        expect(responseBody.id).toBeTruthy()
        expect(responseBody.createdAt).toBeTruthy()
    })

    test('with empty body', async ({request}) => {
        const response = await request.post(Paths.USERS, {
            data: {}
        })
        const responseBody = await responseToJSON(response)
        expect(response.status()).toBe(201)
        expect(responseBody.id).toBeTruthy()
        expect(responseBody.createdAt).toBeTruthy()
        expect(responseBody.name).toBeUndefined()
        expect(responseBody.job).toBeUndefined()
    })

    test('with name and without job', async ({request}) => {
        const response = await request.post(Paths.USERS, {
            data: getPOSTUserTestData().withNameOnly
        })
        const responseBody = await responseToJSON(response)
        expect(response.status()).toBe(201)
        expect(responseBody.id).toBeTruthy()
        expect(responseBody.createdAt).toBeTruthy()
        expect(responseBody.name).toBe(getPOSTUserTestData().withNameOnly.name)
        expect(responseBody.job).toBeUndefined()
    })

    test('with job and without name', async ({request}) => {
        const response = await request.post(Paths.USERS, {
            data: getPOSTUserTestData().withJobOnly
        })
        const responseBody = await responseToJSON(response)
        expect(response.status()).toBe(201)
        expect(responseBody.id).toBeTruthy()
        expect(responseBody.createdAt).toBeTruthy()
        expect(responseBody.name).toBeUndefined()
        expect(responseBody.job).toBe(getPOSTUserTestData().withJobOnly.job)
    })
})