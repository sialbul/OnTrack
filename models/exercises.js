module.exports = function (sequelize, DataTypes) {
    var Exercises = sequelize.define('Exercises', {
      date: {
        type: DataTypes.DATE
      },
      type: {
        type: DataTypes.STRING
      },
      duration: {
        type: DataTypes.INTEGER
      }
    })
    return Exercises
  }
  