const dotenv = require('dotenv').config();
const MailJet = require('node-mailjet')
const mailjet = MailJet.apiConnect(
    process.env.API_KEY, process.env.SECRET_KEY
)


const sendMail = async (recipient,id) => {

  try {
    const result = await mailjet
    
      .post("send", { 'version': 'v3.1' })
      .request({
        "Messages": [
          {
            "From": {
              "Email": "notifications@ant-buddy.com",
              "Name": "Cinnamon Hotels"
            },
            "To": [
              {
                "Email": recipient,
                
              }
            ],
            "Subject": "Account Invitation",
            "HTMLPart": `
                        <p>This email for creating new user account. Please complete and activate your account though following link.</p>
                        <a href="http://localhost:3000/create-account/${id}">Click here to complete account.</a> <br/>
                        <p>Thank you!</p>
            `,
            
          }
        ]
      });

    console.log("Email body:",result.body);
    return result.body;
  } catch (err) {
    console.log("Email Error",err);
    return err;
  }
};

module.exports = sendMail
