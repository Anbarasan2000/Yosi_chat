exports.yosiChat = class yosiChat {

    patientName = "baker";
    patientNumber = "9172384712";

    constructor(page) {
        this.page = page;
        this.chatModule = "#pc_patient_chat_menu";
        this.startConvo = "//button/span[text()='Start Conversation']";
        this.newConversationInputBox = "#search__all_patient_input";
        this.noChatList = "#search__all_patient_wrapper p";
        this.patientList = "#search__all_patient_wrapper li[data-two_initials]";
        this.closeDialogButton = "button[aria-label='Close dialog']";
        this.patientConvoContinueButton = "#form_search_by_patient_button";

        this.existingPatientList = "#pc_existing_patient_list li[data-mobile-number]";


        this.patientId = `div div [class=pc_patient_info_box] div span#pc_patient_info_emr_id`;
        this.patientDob = `div div [class=pc_patient_info_box] div span#pc_patient_info_dob`;
        this.disabled_Chat_Resolved_Btn = `div [class='chat_view_type_box_right_resolve chat_view_type_box_right'] button[disabled]`;
        this.patientCoversationChat = `#pc_textarea`;
        this.enabled_Chat_Resolved_Btn_R = `div [class='chat_view_type_box_right_resolve chat_view_type_box_right'] button[data-type='resolve']`;
        this.enabled_Chat_Resolved_Btn_O = `div [class='chat_view_type_box_right_resolve chat_view_type_box_right'] button[data-type='open']`;

        this.staff_sent_message = `div[data-page-no='1'] span[class='typed_msg_html']`;

        this.resolved_close_btn=`div[class="pc_modal_content"] div button#chat_view_info_close_button`;




    }

    async searchPatient(value) {
        await this.page.fill(this.newConversationInputBox, value);
        await this.page.locator(this.newConversationInputBox).press('Enter');

        // Wait for results to update
        await this.page.waitForTimeout(5000);

        const patientsNotFound = this.page.locator(this.noChatList);
        const countNotFound = await patientsNotFound.count();

        if (countNotFound == 1) {

            const text = await this.page.locator(this.noChatList).textContent().catch(() => null);

            if (text?.includes("No matches found")) {
                console.log(`No patient found for: ${value}`);
                return false;
            }
        }
        const patients = this.page.locator(this.patientList);
        const count = await patients.count();

        if (count > 0) {
            for (let i = 0; i < count; i++) {
                const name = await patients.nth(i).innerText();
                console.log("Patient found:", name);
            }
            return true;
        }

        console.log("Unexpected state.");
        return false;
    }

    async yosiChatModule_StartConversation_Patient_Search_By_Name_And_Number() {

        await this.page.click(this.chatModule);
        await this.page.waitForLoadState('networkidle');
        await this.page.click(this.startConvo);

        // First search by name
        const foundByName = await this.searchPatient(this.patientName);

        // If not found, search by number
        if (!foundByName) {
            await this.searchPatient(this.patientNumber);
        }

        await this.page.click(this.closeDialogButton);

        await this.page.click(this.startConvo);
        await this.page.fill(this.newConversationInputBox, this.patientName);
        await this.page.locator(this.newConversationInputBox).press('Enter');

        await this.page.waitForTimeout(5000);

        // Wait for patient list to appear
        await this.page.locator(this.patientList).first().waitFor({ state: 'visible' });

        // Extract phone from search result
        const new_Patient = this.page.locator(this.patientList).first();
        const phone = await new_Patient.getAttribute('data-patient-phone');
        console.log("Extracted phone number:", phone);
        await new_Patient.click();
        await this.page.click(this.patientConvoContinueButton);

        // Wait for existing patient list
        await this.page.locator(this.existingPatientList).first().waitFor({ state: 'visible' });

        // Extract phone from conversation page
        const existing_patient = this.page.locator(this.existingPatientList).first();
        const existingPhone = await existing_patient.getAttribute('data-mobile-number');
        console.log("Extracted phone number:", existingPhone);
        if (phone === existingPhone) {
            console.log("Phone numbers match. Conversation started with correct patient.");
        } else {
            console.log("Phone numbers do not match. There might be an issue with patient search or conversation initiation.");
        }



    }

    async send_Message() {

        try {
            const locator = this.page.locator(this.patientId);
            await locator.waitFor({ state: 'visible', timeout: 5000 });

            const patientId = await locator.textContent();
            console.log("Patient ID:", patientId?.trim());
        } catch (error) {
            console.log("Patient ID not found or not visible.");
        }

        try {
            const locator = this.page.locator(this.patientDob);
            await locator.waitFor({ state: 'visible', timeout: 5000 });

            const patientDob = await locator.textContent();
            console.log("Patient DOB:", patientDob?.trim());
        } catch (error) {
            console.log("Patient DOB not found or not visible.");
        }


        // Add code to send a message in the chat here
        await this.page.fill(this.patientCoversationChat, "Hello, this is a test message.");
        await this.page.locator(this.patientCoversationChat).press('Enter');

        await this.page.waitForTimeout(5000);


        // Check if Chat Resolved button is enabled
        const resolvedBtn = this.page.locator(this.enabled_Chat_Resolved_Btn_R);

        if (await resolvedBtn.count() > 0 && await resolvedBtn.isEnabled()) {
            console.log("Chat Resolved Button is enabled after sending message.");
        } else {
            console.log("Chat Resolved Button is not enabled after sending message.");
        }


        // Check if sent message is visible
        const sentMessage = this.page.locator(this.staff_sent_message);

        // Check if sent message exists and is visible
        const sentMessageCount = await sentMessage.count();

        if (sentMessageCount > 0) {
            if (await sentMessage.first().isVisible()) {

                let text=await sentMessage.textContent().then(text => console.log("Sent message content:", text?.trim()));
                console.log("Sent message is visible in the chat: ", text);
            } else {
                console.log("Sent message exists but is not visible.");
            }
        } else {
            console.log("Sent message is not present in the chat.");
        }


        // Better wait (instead of fixed 5 seconds)
        await this.page.waitForLoadState('networkidle');


        const resolved_chat=this.page.locator(this.enabled_Chat_Resolved_Btn_R);
        await resolved_chat.click();

        const resolved_cls_btn=this.page.locator(this.resolved_close_btn);
        await resolved_cls_btn.click();


        // Check if Chat Resolved button is present and disabled
        const disabledBtn = this.page.locator(this.enabled_Chat_Resolved_Btn_O);
        const disabledBtnCount = await disabledBtn.count();

        if (disabledBtnCount > 0) {
            if ((await disabledBtn.first().isEnabled())) {
                console.log("Chat Resolved Button is present and Chat Closed.");
            } else {
                console.log("Chat Resolved Button is present and disabled.");
            }
        } else {
            console.log("Chat Resolved Button is not present.");
        }



    }
}
