//require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports.getStripe = () => {
  return stripe;
}

module.exports.createPaymentIntent = async (req, res) => {
  const { amount } = req.body;
  console.log("createPaymentIntent", amount);
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
    // automatic_payment_methods: {
    //   enabled: true,
    // },
  });


  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};
