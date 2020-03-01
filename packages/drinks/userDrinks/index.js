const StandardError = require('standard-error')
const { 
  Beer,
  UserDrink,
  ConsumptionHistory,
  Sequelize,
} = require('@my-pub/db')

const create = async (drinkId,userId,cuantity,) => {
  const drink = await Beer.findOne({
    where: {
        id:drinkId
    }
  })

  if(!drink){
    throw new StandardError('No se logró encontrar una bebida con el id indicado!', {
        status: 400,
    })
  }

  const userDrink = await UserDrink.findOne({
    where: {
      userId,
      beerId:drink.id,
    }
  })

  let data
  if(userDrink){
    await userDrink.update({
      totalConsume: userDrink.totalConsume + (cuantity ? cuantity : 1),
      lastConsumption: new Date(),
    })
    data = userDrink.toJSON()
  }else{
    const newUserDrink = await UserDrink.create({
      userId,
      beerId:drink.id,
      totalConsume: cuantity ? cuantity : 1,
    })

    data = newUserDrink.toJSON()
  }

  await ConsumptionHistory.create({
    userId,
    beerId:drink.id,
  })

  return data
}

const findAll = async (queryOptions) => {
  const userDrinks = await UserDrink.findAll({...queryOptions})

  const data = await Promise.all(
    userDrinks.map( async userDrink => {
      const userDrinkData = userDrink.toJSON()

      const consumptionHistory = await ConsumptionHistory.findAll({
        userId:userDrinkData.userId,
        beerId:userDrinkData.beerId,
      })

      userDrinkData.ConsumptionHistory = consumptionHistory

      return userDrinkData
    })
  )

  return data
}

const findOne = async (queryOptions) => {
  const userDrink = await UserDrink.findOne({...queryOptions})

  const data = userDrink ? userDrink.toJSON() : userDrink
  if(userDrink){
    const consumptionHistory = await ConsumptionHistory.findAll({
      userId:userDrink.userId,
      beerId:userDrink.beerId,
    })

    data.ConsumptionHistory = consumptionHistory
  }
  

  return data
}

module.exports = {
  create,
  findOne,
  findAll,
}