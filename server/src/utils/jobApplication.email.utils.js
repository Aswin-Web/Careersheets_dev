const generateHTML = (job, user) => {
  return `<!DOCTYPE html>
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title>Job Application Received</title>
  </head>
  <body class="body">
    <div class="es-wrapper-color">
      <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
        <tbody>
          <tr>
            <td class="esd-email-paddings" valign="top">
              <table cellpadding="0" cellspacing="0" class="es-content">
                <tbody>
                  <tr>
                    <td class="esd-stripe" align="center">
                      <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600">
                        <tbody>
                          <tr>
                            <td class="esd-structure es-p30t es-p20b es-p20r es-p20l" align="left">
                              <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                  <tr>
                                    <td width="560" class="esd-container-frame" align="center" valign="top">
                                      <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="esd-block-text es-p10b">
                                              <h1 style="font-size: 24px; line-height: 120%; font-weight: normal;">New Job Application Received</h1>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center" class="esd-block-text es-p10b">
                                              <p style="font-size: 16px;">A new application has been received for the following job:</p>
                                              <p style="font-size: 16px;"><strong>Company Name:</strong> ${job.companyName}</p>
                                              <p style="font-size: 16px;"><strong>Job Title:</strong> ${job.roleName}</p>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center" class="esd-block-text es-p10b">
                                              <p style="font-size: 16px;">Applicant Details:</p>
                                              <p style="font-size: 16px;"><strong>Name:</strong> ${user.name}</p>
                                              <p style="font-size: 16px;"><strong>Email:</strong> ${user.email}</p>
                                              <!-- Add more applicant details here if needed -->
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center" class="esd-block-text es-p10b">
                                              <p style="font-size: 16px;">Total Applications Received for this Job: </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
  </html>
  `;
};
module.exports = { generateHTML };
