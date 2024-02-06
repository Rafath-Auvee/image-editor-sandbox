const { createRouteHandler } = require("uploadthing/next");
const { ourFileRouter } = require("./core");

// Export routes for Next App Router
const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    /* Add your config here */
  },
});

module.exports = { GET, POST };
