const Stripe = require("stripe");

console.log(
  "Stripe Key:",
  process.env.STRIPE_SECRET_KEY ? "Loaded" : "Missing"
);

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
console.log(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res) => {

  try {

    const { items } = req.body;


    const session = await stripe.checkout.sessions.create({

      payment_method_types: ["card"],

      mode: "payment",


      line_items: items.map((item) => ({

        price_data: {

          currency: "zar",

          product_data: {
            name: item.name
          },

          unit_amount:
            Number(item.price) * 100

        },


        quantity:
          Number(item.qty) || 1


      })),


      success_url:
        "http://localhost:5173/success",


      cancel_url:
        "http://localhost:5173/cart"

    });


    console.log("STRIPE SESSION CREATED");


    res.json({
      url: session.url
    });


  } catch (err) {

    console.log("STRIPE ERROR:", err);


    res.status(500).json({
      message: err.message
    });

  }

};