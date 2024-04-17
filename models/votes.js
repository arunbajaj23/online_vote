module.exports = (sequelize, DataTypes) => {
  let votes = sequelize.define(
    "votes",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,

        references: {
          model: "users",
          key: "id",
        },
      },
      nomineeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,

        references: {
          model: "nominees",
          key: "id",
        },
      },
    },
    {
      freezeTableName: true,
    }
  );

  return votes;
};
