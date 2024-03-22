import {APIResponse} from "@playwright/test";

async function responseToJSON(response: APIResponse) {
    return JSON.parse(await response.text());
}

export {responseToJSON}