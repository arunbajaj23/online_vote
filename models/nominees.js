module.exports = (sequelize, DataTypes) => {
  let nominees = sequelize.define(
    "nominees",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );

  nominees.associate = (models) => {
    nominees.hasMany(models.votes, {
      foreignKey: "nomineeId",
      as: "votes",
    });
  };

  return nominees;
};
