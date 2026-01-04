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
  console.log("ADDRESS TYPE →", typeof address, address);
  try {

    const formattedAddress = typeof address === "object"
      ? `${address.street}, ${address.city}, ${address.state} - ${address.pincode}`
      : address;

    await transporter.sendMail({
      from: `"Sovereign Styles" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thank you for your order! 🎉`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Hello ${name},</h2>

          <p>Thank you for placing an order with <b>Sovereign Styles</b> ❤️</p>

          <p>Your order has been successfully placed for
            <b>${productname}</b>.
          </p>

          <p>
            🚚 Your order will be delivered soon to:
            <br/>
            <strong>${formattedAddress}</strong>
          </p>

          <p>We’ll keep you updated as it moves forward.</p>

          <h3>Cheers 👋</h3>
          <h3><b>Sovereign Styles</b></h3>
        </div>
      `,
    });

    console.log("Order confirmation email sent successfully");
  } catch (error) {
    console.error("Order confirmation mail error →", error.message);
  }
};

 export const Welcomefortheuser= async(name , email)=>{
  try {
   await transporter.sendMail({
    from: `"Sovereign Styles" <${process.env.EMAIL_USER}>`,
    to:email,
    subject:"Welcome",
    html:`
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
  <h2>Hello ${name},</h2>

  <p>
    Welcome to <b>Sovereign Styles</b> ❤️
  </p>

  <p>
    We’re thrilled to have you on board! Your account has been successfully created,
    and you’re now part of our fashion-forward community.
  </p>

  <p>
    ✨ Explore premium collections, exclusive styles, and seamless shopping — all designed just for you.
  </p>

  <p>
    If you ever need help, feel free to reach out. We’re always here for you.
  </p>

  <p>
    Happy Shopping 🛍️
  </p>

  <h3>Cheers 👋</h3>
  <h3><b>Sovereign Styles</b></h3>
</div>
`

   })
  } catch (error) {
    
  }
}