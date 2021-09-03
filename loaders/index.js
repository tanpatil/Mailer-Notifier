const expressLoader = require("./express");

module.exports = {
    load: async (app) => {
        // start node server
        app = await expressLoader.loader(app);
    }
}