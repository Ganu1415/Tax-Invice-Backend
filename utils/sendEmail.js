import axios from "axios";

const sendEmail = async (to, subject, content) => {
  try {
    const data = {
      sender: {
        name: "Vithai",
        email: process.env.EMAIL_FROM, // e.g. noreply@vithai.com
      },
      to: [{ email: to }],
      subject,
      htmlContent: `<p>${content}</p>`,
    };

    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      data,
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    // console.log("Email sent:", response.data);
  } catch (error) {
    console.error(
      "Error sending email:",
      error.response?.data || error.message
    );
    throw new Error("Email sending failed");
  }
};

export default sendEmail;

// import axios from "axios";
// const sendEmail = async (to, subject, content) => {
//   const data = {
//     sender: { name: "Vithai ", email: process.env.EMAIL_FROM },
//     to: [{ email: to }],
//     subject,
//     htmlContent: `<p>${content}</p>`,
//   };

//   await axios.post("https://api.brevo.com/v3/smtp/email", data, {
//     headers: {
//       "api-key": process.env.BREVO_API_KEY,
//       "Content-Type": "application/json",
//     },
//   });
// };

// export default sendEmail;
