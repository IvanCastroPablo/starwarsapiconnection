"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("movies", {
      imdbID: {
        type: Sequelize.TEXT,
      },
      year: {
        type: Sequelize.INTEGER,
        unique: true,
      },
      title: {
        type: Sequelize.STRING,
      },
      plot: {
        type: Sequelize.STRING,
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("movies");
  },
};