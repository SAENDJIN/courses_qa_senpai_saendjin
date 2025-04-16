import { test } from "@playwright/test"



const fixtures = {
    signInPage: async({}, use) => {
        const signUpPage = new SignUpPage(page);
    };
}
const spec = test.extend({})



