const { defineConfig } = require("cypress");
const { configurePlugin } = require('cypress-mongodb');

module.exports = defineConfig({
  env: {
    mongodb: {
        uri: 'mongodb+srv://qax:xperience@cluster0.bthgy.mongodb.net/HopeDB?retryWrites=true&w=majority&appName=Cluster0',
        database: 'HopeDB',
        // collection:'orphanages'
            }
      },
  e2e: {
    setupNodeEvents(on, config) {
      configurePlugin(on);
    },
  }
});
