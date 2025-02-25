const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Movies extends Model {}

  Teacher.init(
    {
        imdbID: {
            type: DataTypes.STRING,
      },
        title: {
            type: DataTypes.STRING,
      },
        year: {
            type: DataTypes.INTEGER,
            unique: true,
      },
        plot: {
            type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "movies",
      tableName: "movies",
    }
  );

  return Movies;
};