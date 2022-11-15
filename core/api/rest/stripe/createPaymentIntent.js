// eslint-disable-next-line consistent-return
module.exports = async (req, res) => {
    // eslint-disable-next-line global-require
    const stripe = require('stripe')('sk_test_51LKw7aGh8sLxmaRZ6Q01xdjigPt0RS7zueXUB0pT8nZXRwQB7pdtd9L2qjc9EyifgK62sJhcBGKlAHOP2zXMeXi600mXB7F8QU', {
        apiVersion: '2022-08-01',
    });

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            currency: 'idr',
            amount: 19200000,
            automatic_payment_methods: { enabled: true },
            customer: 'cus_MlZv4wZvAQeq8l',
            description: 'Cart Test',
            shipping: {
                address: {
                    line1: 'Jl. Aja',
                    state: 'Sumatera Utara',
                    city: 'Medan, Medan Johor, Gedung Johor',
                    postal_code: '20143',
                    country: 'ID',
                },
                phone: '08123123123',
                name: 'Fakhri Rizha Ananda',
            },
        });

        // Send publishable key and PaymentIntent details to client
        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (e) {
        return res.status(400).send({
            error: {
                message: e.message,
            },
        });
    }
};
