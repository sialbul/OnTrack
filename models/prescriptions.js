module.exports = function (sequelize, DataTypes) {
    var Prescriptions = sequelize.define('Prescriptions', {
      name: {
        type: DataTypes.STRING
      },
      dosage: {
        type: DataTypes.STRING
      }
  })
    return Prescriptions
  }
  