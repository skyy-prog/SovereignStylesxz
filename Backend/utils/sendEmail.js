import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS  
  }
});

export const sendOrderStatusMail = async (to, orderId, status , productname) => {
  try {
    await transporter.sendMail({
      from: `"Sovereign Styles" <${process.env.EMAIL_USER}>`,
      to,
      subject: `Your Order #${orderId} is now ${status}`,
      html: `
        <h3>Hello,</h3>
        <p>Your order <b>${orderId} and product name ${productname} </b> has been updated.</p>
        <p><b>New Status:</b> ${status}</p>
        <p>Thank you for shopping with us ❤️</p>
      `,
    });
    console.log('Order status email sent to', to);
  } catch (err) {
    console.error('Error sending order status email:', err);
  }
};


export const sentmailjustafterplacingorder = async (
  email,
  name,
  productname,
  address
) => {
  try {
    await transporter.sendMail({
      from: `"Sovereign Styles" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thank you for your order! 🎉`,

      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          
          <img 
            src="cid:brandlogo" 
            alt="Sovereign Styles Logo" 
            width="120"
            style="margin-bottom: 15px; border-radius:10px"
          />

          <h2>Hello ${name},</h2>

          <p>
            Thank you for placing an order with <b>Sovereign Styles</b> ❤️
          </p>

          <p>
            Your order has been successfully placed for 
            <b>${productname}</b>.
          </p>

          <p>
            🚚 Sit back and relax! Your order will be delivered soon to
            <strong>${address}</strong>.
          </p>

          <p>We’ll keep you updated as it moves forward.</p>

          <h3>Cheers 👋</h3>
          <h3><b>Sovereign Style'sxz..</b></h3>

        </div>
      `,

      attachments: [
        {
          filename: 'logoo.png',
          path: './publics/logoo.png', // ✅ correct backend path
          cid: 'brandlogo', // ✅ SAME as img src
        },
      ],
    });

    console.log('Order confirmation email sent successfully');
  } catch (error) {
    console.error('Error sending order status email:', error);
  }
};
