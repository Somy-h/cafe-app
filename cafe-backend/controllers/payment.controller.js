
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.getStripe = () => {
  return stripe;
}

exports.createPaymentIntent = async (req, res) => {
  const { amount } = req.body;
  
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};
