const routes = require("next-routes")();

routes
  .add("/send-add-money", "/components/pages/send-add-money")
;

module.exports = routes;
