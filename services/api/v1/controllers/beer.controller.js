const {Beer} = require('@my-pub/drinks')

const create = async (req,res,next)=>{
  try{
    const data = await Beer.create(req.body)
    res.success({
      message: 'Cerverza ingresada exitosamente!',
      data,
    })
  }catch(err){
    next(err)
  }
}

module.exports={create}