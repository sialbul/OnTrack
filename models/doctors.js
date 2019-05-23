module.exports = function (sequelize, DataTypes) {
    var Doctors = sequelize.define('Doctors', {
      name: {
        type: DataTypes.STRING
      },
      location: {
        type: DataTypes.STRING
      },
    })
    return Doctors
  }
  