import { createProxyMiddleware } from "http-proxy-middleware";

module.exports = function (app) {
  app.use(
    "/api", // Specify the path you want to proxy
    createProxyMiddleware({
      target: "https://ship365-api.onrender.com", // Specify the target URL of the backend
      changeOrigin: true,
    })
  );
};
