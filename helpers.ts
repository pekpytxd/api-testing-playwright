import {APIResponse} from "@playwright/test";

async function stringToJSON(response: APIResponse) {
    return JSON.parse(await response.text());
}

export {stringToJSON}