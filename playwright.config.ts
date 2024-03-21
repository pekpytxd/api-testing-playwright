import {defineConfig} from '@playwright/test';

require('dotenv').config();

export default defineConfig({
    testDir: './tests',
    forbidOnly: !!process.env.CI,
    fullyParallel: true,
    retries: process.env.CI ? 1 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [['html', {open: 'never'}]],
    use: {
        baseURL: 'https://reqres.in/'
    }
});
