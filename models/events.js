module.exports = function (sequelize, DataTypes) {

  var events = sequelize.define("events",
   {
    id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
    title: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
          len: [1, 140]}
          },
    start: {
          type: DataTypes.STRING
           },
    end: {
          type: DataTypes.STRING
          }
    },
          {
      timestamps: false // this makes it not make the createdAt and updatedAt fields
           });

  return events;
};








