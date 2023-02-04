const nodemailer = require('nodemailer');
const path = require('path');
const logger = require('./Logger');

module.exports = {
  async sendMail(subject, receiverList) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'turnerbams@gmail.com',
          pass: 'batak123',
        },
      });

      const info = await transporter.sendMail({
        from: 'Dorayaki Factory <turnerbams@gmail.com>',
        // from: '"Fred Foo 👻" <vincent@serveu.id>', // sender address
        to: receiverList, // list of receivers
        // to: "bar@example.com, baz@example.com", // list of receivers
        subject, // Subject line
        // text: "Hello world?", // plain text body
        html: { path: path.join(__dirname, '../../../assets/templates/notification.html') }, // html body
      });

      logger.info(`Message sent: ${info.messageId}`);
    } catch (err) {
      logger.info('Error sending mail ', err, ' ', receiverList);
    }
  },
};
