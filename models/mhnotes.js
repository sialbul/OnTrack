module.exports = function (sequelize, DataTypes) {
    var Mhnotes = sequelize.define('Mhnotes', {
      date: {
        type: DataTypes.DATE
      },
      mood: {
        type: DataTypes.STRING
      },
      note: {
        type: DataTypes.STRING
      },
      })
    return Mhnotes
  }
  