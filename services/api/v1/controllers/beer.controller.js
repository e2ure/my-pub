const {Beer} = require('@my-pub/drinks')

const create = async (req,res,next)=>{
  try{
    const data = await Beer.create(req.body)
    res.success({
      message: 'Bebida ingresada exitosamente!',
      data,
    })
  }catch(err){
    next(err)
  }
}

const update = async (req,res,next)=>{
  try{

    const {id} = req.params

    if(!id){
      throw new StandardError('El id de la bebida es requerido!', {
        status: 400,
      })
    }

    const beer = req.body
    beer.id=id

    const data = await Beer.update(beer)
    
    res.success({
      message: 'Bebida actualizada exitosamente!',
      data,
    })
  }catch(err){
    next(err)
  }
}

const findAll = async (req,res,next)=>{
  try{
    
    const data = await Beer.findAll()
    
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
    
    const data = await Beer.findOne({
      where: id
    })
    
    res.success({
      message: 'Consulta de bebidas exitosa!',
      data,
    })
  }catch(err){
    next(err)
  }
}

module.exports={create, update, findAll, findOne}