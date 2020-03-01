const {UserDrink,} = require('@my-pub/drinks')
const {Beer:BeerDB,} = require('@my-pub/db')

const create = async (req,res,next)=>{
  try{
    const {drinkId,cuantity,} = req.body
    const {id} = req.user
    const data = await UserDrink.create(drinkId,id,cuantity)
    res.success({
      message: 'Bebida ingresada exitosamente!',
      data,
    })
  }catch(err){
    next(err)
  }
}

const findAll = async (req,res,next)=>{
  try{
    
    const queryParams = {
      where:{
          userId:req.user.id,
      },
      include:[
        {model:BeerDB}
      ],
    }

    const data = await UserDrink.findAll(queryParams)
    
    res.success({
      message: 'Consulta de bebidas exitosa!',
      data,
    })
  }catch(err){
    next(err)
  }
}

const findOne = async (req,res,next)=>{
  try{

    const {id} = req.params

    if(!id){
      throw new StandardError('El id de la bebida es requerido!', {
        status: 400,
      })
    }

    const queryParams = {
      where:{
          userId:req.user.id,
          beerId:id,
      },
      include:[
        {model:BeerDB}
      ],
    }
    
    const data = await UserDrink.findOne(queryParams)
    
    res.success({
      message: 'Consulta de bebidas exitosa!',
      data,
    })
  }catch(err){
    next(err)
  }
}

module.exports={create, findAll, findOne}