export function createWelcomEmailTemplate(name, clientURL){
    //give me an email template which should like a welcome template with user name and email and subject with image and description and link to redirect to the application here
   return `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="background-color: #fff; border-radius: 10px; padding: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333;">Welcome to our application, ${name}!</h2>
            <p style="color: #666;">Thank you for signing up. We're excited to have you on board.</p>
            <p style="color: #666;">Click the button below to get started:</p>
            <a href="${clientURL}" style="display: inline-block; background-color: #007bff; color: #fff; padding: 10px 20px; border-radius: 5px; text-decoration: none;">Get Started</a>
            <p style="color: #666; margin-top: 20px;">If you didn't sign up, please ignore this email.</p>
        </div>
    </div>
    `;
}