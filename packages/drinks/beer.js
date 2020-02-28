const StandardError = require('standard-error')
const { 
  Beer,
} = require('@my-pub/db')

const create = async (beer) => {
  const {name,brand,type,volumenOfAlcohol,description,} = beer

  if(!name){
    throw new StandardError('El nombre de la cerveza es requerido!', {
      status: 400,
    })
  }
  if(!brand){
    throw new StandardError('La marca de la cerveza es requerida!', {
      status: 400,
    })
  }
  if(!type){
    throw new StandardError('El tipo de la cerveza es requerido!', {
      status: 400,
    })
  }
  if(!volumenOfAlcohol){
    throw new StandardError('El volumen de alcohol de la cerveza es requerido!', {
      status: 400,
    })
  }

  const data = await Beer.create({
    name,
    brand,
    type,
    volumenOfAlcohol,
    description
  })

  return data ? data.toJSON() : data
}

module.exports={
  create,
}