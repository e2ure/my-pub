module.exports = (sequelize, DataTypes) => {
    const UserDrink = sequelize.define(
      'UserDrink',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        totalConsume: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        lastConsumption: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Users',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        },    
        beerId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
              model: 'Beers',
              key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },    
      },
      {
        tableName: 'UserDrinks',
      }
    )

    UserDrink.associate = models => {
      UserDrink.belongsTo(models.User, {
        foreignKey: 'userId',
      })
      UserDrink.belongsTo(models.Beer, {
        foreignKey: 'beerId',
      })
    }
  
    return UserDrink
  }
  