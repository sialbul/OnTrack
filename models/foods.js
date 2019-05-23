module.exports = function (sequelize, DataTypes) {
    var Foods = sequelize.define('Foods', {
      date: {
        type: DataTypes.DATE
      },
      meal: {
        type: DataTypes.STRING
      },
      name: {
        type: DataTypes.STRING
      },
      calorie: {
        type: DataTypes.INTEGER
      },
      sugar: {
          type: DataTypes.INTEGER
      },
      sodium: {
          type: DataTypes.INTEGER
      }
    })
    return Foods
  }
  