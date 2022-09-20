
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
    try{
        const { amount } = JSON.parse(event.body); //相当于从前端传message给后端，只需要message中的body中的amount

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            payment_method_types: ["card"],
        });    //后端create a paymentIntent,需要哪些内容以key & value paire 的形式表现

        return {
            statusCode: 200,
            body: JSON.stringify({ paymentIntent })
        }     //返回：200 代表成功，将paymentIntent 作为message body 返回

    } catch (error) {
        console.log({error});

        return {
            statusCode: 400,
            body: JSON.stringify({error}),
        };   //返回 400 代表失败， 将error 作为body返回
    }
}