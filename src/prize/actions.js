import Bluebird from 'bluebird';
import sequelize from '../db/sequelize'

import models from '../models/index';

const Prize = models.Prize;

const prizeIdValidation = Bluebird.coroutine(
  function* validationPrizeId(id: number) {
    const results: Array = yield Prize.findAll();
    const prizeIds = results.map(prizeId => prizeId.id);
    return prizeIds.includes(id);
  }
);

const list = async(req, res, next) => {
  const result: Array = await Prize.findAll({

    include: [{
      model: models.Draw,
      include: [{
        model: models.Codes
      }]
    }]
  });

  res.status(200).send(result);
  await next;
}

const getById = async (req, res, next) => {
  const { id }: { id: string } = req.params;
  const newId = Number(id)
  const validateId = await prizeIdValidation(newId);
   
  if(validateId){
      const getPrize = await sequelize.query(
        `SELECT id, name, description FROM prizes WHERE prizes.id = ?`, { replacements: [`${newId}`]} )

      const getDraw = await sequelize.query(
        `SELECT id, codeId, createdAt FROM draws WHERE draws.prizeId = ?`, { replacements: [`${newId}`]} )
        
        if(getDraw){
            const result = {
            PrizeId: getPrize[0][0].id,
            name: getPrize[0][0].name,
            description: getPrize[0][0].description,
            Draw: getDraw[0]
            } 
              res.status(200).send(result)
        }
  } else {
    res.status(404).send({ Info: `There is no Prize with id: ${id}`});
  }
 
  await next;
}

const create = async(req, res, next) => {
  
  const {
    name,
    description,
    numberOfPrizes,
    status
  }: {
    name: string,
    description: string,
    numberOfPrizes: number,
    status: ?string
  } = req.body;

  await Prize.create({
    name,
    description,
    numberOfPrizes,
    status
  });

  res.status(201).send({ Info: `Prize with name: ${name} has been created`})
  await next;
}

const update = async(req, res, next) => {
  const { id }: { id: string } = req.params;

  const updateData: {  
    name: ?string,
    description: ?string,
    status: ?string,
    numberOfPrizes: ?number
  } = Object.assign({}, req.body);

  const newId = Number(id)
  const validateId = await prizeIdValidation(newId);

  if (!validateId) {
    res.status(404).send({ info: `Prize with id ${id} is not found`});

  } else {
    await Prize.update(updateData, { where: { id }})
    res.status(204)
    res.status(200).send({ info: `Lottery with id ${id} has been updated`});
  }
  await next;
}

const del = async(req, res, next) => {
  const { id }: { id: string } = req.params;
  const newId = Number(id)
  const validateId = await prizeIdValidation(newId);

  if (!validateId) {
    res.status(404).send({ info: `Prize with id ${id} is not found`});
  } else {
      await Prize.destroy({ where: { id }});
      res.status(202).send({ info: `Prize with id: ${id} has been removed`});

  }
  await next;
}

export default {
  list,
  getById,
  update,
  del,
  create
}