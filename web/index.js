// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";

import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import PrivacyWebhookHandlers from "./privacy.js";

const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || "3000",
  10
);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: PrivacyWebhookHandlers })
);

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js

app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(express.json());

app.get("/api/orders/all", async(req, res) => {
  const data = await shopify.api.rest.Order.all({
    session: res.locals.shopify.session,
    status: "any",
  });
  res.status(200).send(data);
});

app.get("/api/products/count", async (_req, res) => {
  const data = await shopify.api.rest.Product.count({
    session: res.locals.shopify.session,
  });
  res.status(200).send(data);
});
app.get("/api/collections/count", async (_req, res) => {
  const data = await shopify.api.rest.CustomCollection.count({
    session: res.locals.shopify.session,
  });
  res.status(200).send(data);
});

app.get("/api/store/info", async (_req, res) => {
  const data = await shopify.api.rest.Shop.all({
    session: res.locals.shopify.session,
  });
  res.status(200).send(data);
});
app.get("/api/store/products", async (_req, res) => {
  const data = await shopify.api.rest.Product.all({
    session: res.locals.shopify.session,
  });
  res.status(200).send({ products: data });
});
// app.put("/api/store/products/:id", async (req, res) => {
//   const client = new shopify.api.clients.Graphql({
//     session: res.locals.shopify.session, // Ensure session is properly passed here
//   });

//   const { id } = req.params;
//   const { title, description, handle, price, variantId } = req.body;

//   // Check if session exists
//   if (!res.locals.shopify.session) {
//     return res.status(400).send({ error: 'No shop session provided' });
//   }

//   try {
//     const response = await client.request(`
//       mutation productUpdate($input: ProductInput!) {
//         productUpdate(input: $input) {
//           product {
//             id
//             title
//             descriptionHtml
//             handle
//             variants(first: 1) {
//               edges {
//                 node {
//                   id
//                   price
//                 }
//               }
//             }
//           }
//           userErrors {
//             field
//             message
//           }
//         }
//       }
//     `, {
//       input: {
//         id: id,
//         title: title,
//         descriptionHtml: description,
//         handle: handle,
//         variants: [
//           {
//             id: variantId,
//             price: price.toString(),
//           }
//         ]
//       }
//     });

//     if (response.data.productUpdate.userErrors.length > 0) {
//       console.error("User errors:", response.data.productUpdate.userErrors);
//       return res.status(400).send({
//         errors: response.data.productUpdate.userErrors,
//       });
//     }

//     res.status(200).send({ product: response.data.productUpdate.product });
//   } catch (error) {
//     console.error("Error updating product:", error);
//     res.status(500).send({ error: "Failed to update product" });
//   }
// });




app.post("/api/products", async (_req, res) => {
  let status = 200;
  let error = null;

  try {
    await productCreator(res.locals.shopify.session);
  } catch (e) {
    console.log(`Failed to process products/create: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error });
});

app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(
      readFileSync(join(STATIC_PATH, "index.html"))
        .toString()
        .replace("%VITE_SHOPIFY_API_KEY%", process.env.SHOPIFY_API_KEY || "")
    );
});

app.listen(PORT);
