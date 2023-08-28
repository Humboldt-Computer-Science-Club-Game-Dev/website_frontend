export default function sendEmail({ name, email, message } = {}) {
  let formatedMessage = `${name} whos email is ${email} compleated your form and said\n${message}`;
  let toEmail = "delairebaptist@gmail.com";
  let subject = "Delairebc.org email!";

  let body = JSON.stringify({
    toEmail: toEmail,
    fromEmail: email,
    subject: subject,
    message: formatedMessage,
  });

  return new Promise((resolve, reject) => {
    fetch(`https://delaireemail.singularitydevelopment.com/sendMail`, {
      method: "post",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((status) => {
        resolve(status);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
