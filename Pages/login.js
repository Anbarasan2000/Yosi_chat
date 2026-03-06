
exports.login = class login {


    location = "India";

    constructor(page) {
        this.page = page;
        this.username = '#email';
        this.password = '#password';
        this.loginButton = '#lgn_sub';
        this.locationSelectionButton = 'div[class="modal-body"] select + div';
        this.locationSelectionDropdown = `//div[@class="modal-body"]//li[text()="${this.location}"]`;


        this.CMSusername = '[name="user_email"]';
        this.CMSpassword = '[name="user_password"]';
        this.CMSloginButton = '#login_submit';
        this.practiceID = '#search_id';

        this.surveyModule = 'img[title="edit workflow"]';
    }

    async navigateToDashboardPage(page, url) {
        await this.page.goto(`${url}`);
    }

    async navigateToCMSPage(page, url) {
        await this.page.goto(`${url}`);
    }


   async loginToApp(email, password) {
    // Ensure the page is fully loaded
    await this.page.waitForLoadState('networkidle');
    // Fill credentials and click login
    await this.page.fill(this.username, email);
    await this.page.fill(this.password, password);
    await this.page.click(this.loginButton);
}

    async CMSloginToApp(email, password) {
        await this.page.fill(this.CMSusername, email);
        await this.page.fill(this.CMSpassword, password);
        await this.page.click(this.CMSloginButton);

        // Replace 'your_practice_id' with the actual practice ID
    }

    async navigateToSurveyModule(practiceID) {
        await this.page.goto("https://preprodinternal.yosicare.com/page-cms/reputation");
        await this.page.fill(this.practiceID, practiceID);
        await this.page.click(this.surveyModule);
    }

    async locationSelection() {

        await this.page.click(this.locationSelectionButton);
        await this.page.click(this.locationSelectionDropdown);
    }

    async yosiChatModule() {

        await this.page.click(this.chatModule);
        await this.page.click(this.locationSelectionDropdown);
    }
}