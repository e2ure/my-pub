module.exports = (sequelize, DataTypes) => {
    const ConsumptionHistory = sequelize.define(
      'ConsumptionHistory',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
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
        tableName: 'ConsumptionHistorys',
      }
    )

    ConsumptionHistory.associate = models => {
      ConsumptionHistory.belongsTo(models.User, {
        foreignKey: 'userId',
      })
      ConsumptionHistory.belongsTo(models.Beer, {
        foreignKey: 'beerId',
      })
    }
  
    return ConsumptionHistory
  }
  