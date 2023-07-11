const express = require('express');
require('dotenv').config();

require("@shopify/shopify-api/adapters/node");
const { shopifyApi, LATEST_API_VERSION } = require("@shopify/shopify-api");

const shopify = shopifyApi({
    apiKey: process.env.CLIENT_ID,
    apiSecretKey: process.env.CLIENT_KEY,
    scopes: ["read_products"],
    hostName: process.env.HOST_NAME,
});

const app = express();
const port = 3000;

const storefrontAccessToken = process.env.STOREFRONT_ACCESS_TOKEN;
const shop = process.env.STORE_URL;

const storefrontClient = new shopify.clients.Storefront({
    domain: shop,
    storefrontAccessToken,
});

app.get("/", async (req, res) => {
    const products = await storefrontClient.query({
        data: `{
            products (first: 3) {
            edges {
                node {
                    id
                    title
                }
            }
            }
        }`,
    });

    res.send(products);
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));