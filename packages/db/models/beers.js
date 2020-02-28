module.exports = (sequelize, DataTypes) => {
    const Beer = sequelize.define(
      'Beer',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        brand: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        volumenOfAlcohol: {
          type: DataTypes.DOUBLE,
          allowNull: false,
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
        },        
      },
      {
        tableName: 'Beers',
      }
    )
  
    return Beer
  }
  