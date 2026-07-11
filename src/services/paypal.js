require('dotenv').config();
const axios = require('axios'); 

async function generatePaypalAccessToken() {
    const response = await axios({
        url: process.env.PAYPAL_BASE_URL + '/v1/oauth2/token',
        method: 'post',
        data: 'grant_type=client_credentials',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        auth: {
            username: process.env.PAYPAL_CLIENT_ID,
            password: process.env.PAYPAL_SECRETE
        }
    });

    return response.data.access_token;
}

async function createOrder(productName, productDescription, productPrice, currencyCode) {
    const accessToken = await generatePaypalAccessToken();

    const response = await axios({
        url: process.env.PAYPAL_BASE_URL + '/v2/checkout/orders',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
        data: JSON.stringify({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    items: [
                        {
                            name: productName,
                            description: productDescription,
                            quantity: 1,
                            unit_amount: {
                                currency_code: currencyCode,
                                value: productPrice
                            }
                        }
                    ],
                    amount: {
                        currency_code: currencyCode,
                        value: productPrice,
                        breakdown: {
                            item_total: {
                                currency_code: currencyCode,
                                value: productPrice
                            }
                        }
                    }
                }
            ],
            application_context: {
                return_url: process.env.BASE_URL + `/api/order_complete?productName=${productName}`,
                cancel_url: process.env.BASE_URL + '/in/carts/carts.html',
                user_action: 'PAY_NOW',
                brand_name: 'GoBuyExpress'
            }
        })
    });

    return response.data.links.find(link => link.rel === 'approve').href;
}

async function capturePayment(orderId) {
    const accessToken = await generatePaypalAccessToken();

    const response = await axios({
        url: process.env.PAYPAL_BASE_URL + `/v2/checkout/orders/${orderId}/capture`,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    });

    return response.data;
}

module.exports = {
    createOrder,
    capturePayment
};