module.exports = function (sequelize, DataTypes) {
    var Bps = sequelize.define('Bps', {
      date: {
        type: DataTypes.DATE
      },
      systolic: {
        type: DataTypes.INTEGER
      },
      diastolic: {
        type: DataTypes.INTEGER
      },
      pulse: {
        type: DataTypes.INTEGER
      }
    });
  /*
    Bps.associate = function (models) {
      Bps.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  */
    return Bps
  }
  