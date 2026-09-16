const resend = require("../config/mail");

const sendEnquiry = async (req, res) => {

    try {

        const { name,email,phone,message} = req.body;
        if (!name || !email || !phone) {
            return res.status(400).json({
                success: false,
                message: "Name, email and phone are required"
            });

        }

        const { data, error } = await resend.emails.send({
            from: "Website Enquiry <onboarding@resend.dev>",
            to: [process.env.OWNER_EMAIL],
            replyTo: email,
            subject: `New Customer Enquiry - ${name}`,
            html: `
                <div style="
                    font-family: Arial, sans-serif;
                    max-width: 600px;
                    margin: auto;
                    padding: 25px;
                    background: #f8fafc;">
                    <div style="
                        background: #ffffff;
                        padding: 25px;
                        border-radius: 10px;
                        border: 1px solid #e5e7eb;">
                        <h2 style="
                            color: #111827;
                            margin-top: 0;">
                            New Customer Enquiry
                        </h2>
                        <p style="color: #6b7280;">
                            You received a new enquiry from your website.
                        </p>
                        <hr style="
                            border: 0;
                            border-top: 1px solid #e5e7eb;
                            margin: 20px 0;">
                        <p>
                            <strong>Name:</strong>
                            ${name}
                        </p>
                        <p>
                            <strong>Email:</strong>
                            ${email}
                        </p>
                        <p>
                            <strong>Phone:</strong>
                            ${phone}
                        </p>
                        <p>
                            <strong>Message:</strong>
                        </p>
                        <div style="
                            background: #f9fafb;
                            padding: 15px;
                            border-radius: 8px;
                            color: #374151;">
                            ${message || "No message provided"}
                        </div>

                        <hr style="
                            border: 0;
                            border-top: 1px solid #e5e7eb;
                            margin: 20px 0;">
                        <p style="
                            font-size: 12px;
                            color: #9ca3af;">
                            This enquiry was submitted from your website.
                        </p>
                    </div>
                </div>
            `
        });
        if (error) {
            console.error("Resend Error:", error);
            return res.status(500).json({
                success: false,
                message: "Unable to send enquiry email"
            });
        }
        console.log("Email sent:", data.id);
        return res.status(200).json({
            success: true,
            message: "Enquiry submitted successfully"
        });
    } catch (error) {
        console.error("Email Error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to submit enquiry"
        });

    }
};
module.exports = {
    sendEnquiry
};