const transporter = require("../config/mail");

const sendEnquiry = async (req, res) => {

    try {
        const { name, email,phone,message} = req.body;

        if (!name || !email || !phone) {
            return res.status(400).json({
                success: false,
                message: "Name, email and phone are required"
            });

        }

        const mailOptions = {
            from: process.env.MAIL_USER,
            to: process.env.OWNER_EMAIL,
            subject: `New Customer Enquiry - ${name}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>New Customer Enquiry</title>
                </head>

                <body style="margin: 0;
                    padding: 0;
                    background-color: #f4f4f5;
                    font-family: Arial, Helvetica, sans-serif;">

                    <div style="
                        max-width: 650px;
                        margin: 40px auto;
                        background: #ffffff;
                        border-radius: 16px;
                        overflow: hidden;
                        box-shadow: 0 8px 30px rgba(0,0,0,0.08);
                    ">
                        <div style=" background: #111827; padding: 30px 35px;">
                            <div style="
                                font-size: 13px;
                                color: #a78bfa;
                                font-weight: bold;
                                letter-spacing: 2px;
                                margin-bottom: 10px;
                            ">
                                NEW ENQUIRY
                            </div>

                            <h1 style="
                                margin: 0;
                                color: #ffffff;
                                font-size: 28px;
                            ">
                                You have a new customer
                            </h1>

                            <p style=" margin: 10px 0 0; color: #cbd5e1; font-size: 14px;">
                                Someone has submitted an enquiry through your website.
                            </p>

                        </div>

                        <div style=" padding: 35px;">
                            <h2 style=" margin: 0 0 20px; color: #111827;
                                font-size: 20px;">
                                Customer Details
                            </h2>

                            <div style=" padding: 16px; margin-bottom: 12px;
                                background: #f9fafb; border: 1px solid #e5e7eb;
                                border-radius: 10px;">

                                <div style=" color: #6b7280; font-size: 12px;
                                    margin-bottom: 5px;">
                                    FULL NAME
                                </div>

                                <div style="  color: #111827;
                                    font-size: 15px; font-weight: 600;">
                                    ${name}
                                </div>
                            </div>

                            <div style="
                                padding: 16px;
                                margin-bottom: 12px;
                                background: #f9fafb;
                                border: 1px solid #e5e7eb;
                                border-radius: 10px;">

                                <div style="
                                    color: #6b7280;
                                    font-size: 12px;
                                    margin-bottom: 5px;">
                                    EMAIL ADDRESS
                                </div>
                                <div style="
                                    color: #111827;
                                    font-size: 15px;">
                                    ${email}
                                </div>

                            </div>

                            <div style="
                                padding: 16px;
                                margin-bottom: 12px;
                                background: #f9fafb;
                                border: 1px solid #e5e7eb;
                                border-radius: 10px;">

                                <div style="
                                    color: #6b7280;
                                    font-size: 12px;
                                    margin-bottom: 5px;">
                                    PHONE NUMBER
                                </div>

                                <div style="
                                    color: #111827;
                                    font-size: 15px;
                                    font-weight: 600;">
                                    ${phone}
                                </div>

                            </div>

                            <div style="
                                padding: 18px;
                                margin-top: 20px;
                                background: #fafafa;
                                border-left: 4px solid #8b5cf6;
                                border-radius: 6px;">

                                <div style="
                                    color: #6b7280;
                                    font-size: 12px;
                                    font-weight: bold;
                                    margin-bottom: 8px;">
                                    CUSTOMER MESSAGE
                                </div>

                                <div style="
                                    color: #374151;
                                    font-size: 14px;
                                    line-height: 1.7;">
                                    ${message || "No message provided"}
                                </div>

                            </div>


                            <div style="
                                margin-top: 30px;
                                padding: 18px;
                                background: #f5f3ff;
                                border-radius: 10px;
                                text-align: center;">
                                <p style="
                                    margin: 0;
                                    color: #5b21b6;
                                    font-size: 13px;">
                                    Please contact the customer at your earliest convenience.
                                </p>
                            </div>

                        </div>


                        <div style="
                            padding: 22px 35px;
                            background: #f9fafb;
                            border-top: 1px solid #e5e7eb;
                            text-align: center;">

                            <p style="
                                margin: 0;
                                color: #9ca3af;
                                font-size: 12px;">
                                This email was automatically generated from your website enquiry form.
                            </p>
                        </div>
                    </div>
                </body>
                </html>
            `
        };

        await transporter.sendMail(mailOptions);
        return res.status(200).json({
            success: true,
            message: "Enquiry submitted successfully"
        });
    } catch (error) {
        console.error("Email Error:",error);
        return res.status(500).json({
            success: false,
            message: "Unable to submit enquiry"
        });

    }

};


module.exports = {
    sendEnquiry
};