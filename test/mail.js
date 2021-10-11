const nodemailer = require('nodemailer');

async function main() {
    const transporter = nodemailer.createTransport({
        host: "edle.software",
        port: 587,
        secure: false,
        auth: {
            user: 'mail@hquasar.com',
            pass: 'BCg0QIIdTIvVLcjzguh0jP7ogsY2Li9f'
        }
    })

    const response = await transporter.sendMail({
        from: '"HQuasar" <mail@hquasar.com>', // sender address
        to: "pilzpfanne2003@gmail.com", // list of receivers
        subject: "Hello", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    })

    console.log("Message sent: %s", response.messageId);
}

main().catch(console.error);