const certificationSendMailTemplate = (Username,certificationName, issuedBy, certificateIssuedDate) => {


    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Certification Approved</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f3f4f6;
                margin: 0;
                padding: 0;
                color: #333333;
            }
            .email-container {
                max-width: 600px;
                margin: 30px auto;
                background: #ffffff;
                border-radius: 10px;
                box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .header {
                background-color: #ACCBEE; /* Professional navy blue */
                color: #000;
                padding: 20px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 26px;
            }
            .content {
                padding: 20px;
                text-align: center;
            }
            .content h2 {
                color: #000;
                margin: 0 0 10px;
                font-size: 22px;
            }
            .content p {
                margin: 10px 0;
                font-size: 16px;
                line-height: 1.6;
                color: #555555;
            }
            .ribbon {
                background-color: #ACCBEE; /* Bold blue ribbon */
                color: #000;
                display: inline-block;
                padding: 10px 20px;
                font-size: 18px;
                font-weight: bold;
                border-radius: 5px;
                margin: 20px auto;
            }
            .congrats-image {
                width: 100%;
                max-width: 500px;
                margin: 20px auto;
                display: block;
            }
            .footer {
                background-color: #f9fafb;
                padding: 15px;
                text-align: center;
                font-size: 12px;
                color: #6b7280;
            }
            .footer a {
                color: #ACCBEE;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <!-- Header Section -->
            <div class="header">
                <h1>🎓 Certification Approved 🎓</h1>
            </div>
            
            <!-- Content Section -->
            <div class="content">
                <h2>Congratulations, ${Username}!</h2>
                <p>Your certification <strong>${certificationName}</strong> issued by <strong>${issuedBy}</strong> on <strong>${new Date(certificateIssuedDate)}</strong> has been <span style="color: #1e3a8a; font-weight: bold;">approved</span> by the Careersheets Admin Team!</p>
                
                <div class="ribbon">✅ Certification Approved Successfully</div>
                
                <p>We are proud to recognize your accomplishment. Keep reaching for the stars!</p>
                 <p>You can download the Generated certificate from your careersheets profile</p>
               
            </div>
             
            <!-- Footer Section -->
            <div class="footer">
                <p>Need help? Visit our <a href="https://www.ibacustech.com/">support page</a> or contact us at <a href="mailto:support@careersheets.com">info@ibacustech.com</a>.</p>
                <p>© 2024 Careersheets. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

module.exports = { certificationSendMailTemplate };
