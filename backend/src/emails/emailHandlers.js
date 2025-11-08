import { resendClient, sender } from "../lib/resend.js";
import { createWelcomEmailTemplate } from "../emails/emailTemplates.js";

export const sendWelcomeEmail = async(email, name, clientURL) =>{
    const {data, error} = await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: email,
        subject: "Welcome to Bujjigadu",
        html: createWelcomEmailTemplate(name, clientURL)
    });
    if(error){
       console.error("Error sending email", error);
       throw new Error("Could not send welcome email");
    }

    console.log("Welcome email sent successfully to", data);
}