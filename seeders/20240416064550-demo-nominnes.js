"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("nominees", [
      {
        name: "nominne1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "nominne2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "nominne3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "nominne4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "nominne5",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
