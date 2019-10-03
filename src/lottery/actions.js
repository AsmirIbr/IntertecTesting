import Sequelize from 'sequelize';
import sequelize from '../db/sequelize';
import models from '../models/index';
import Bluebird from 'bluebird';

const Lottery = models.Lottery;
const Results = models.Results;
const Draw = models.Draw;
const Prize = models.Prize;
const Codes = models.Codes;
const Users = models.Users;

const lotteryIdValidation = Bluebird.coroutine(
  function* validationLotteryId(id: number) {
    const results: Array = yield Lottery.findAll();
    const lotteryIds = results.map(lotteryId => lotteryId.id);
    return lotteryIds.includes(id);
  }
);

const list = async(req, res, next) => {
  const result: Array = await Lottery.findAll({

    include: [{
      model: models.Codes,
      include: [
        {
          model: models.Users
        },
        {
          model: models.Draw,
          include: [{
            model: models.Prize
          }]
        }
      ]
    }]
  });

  res.status(200).send(result);
  await next;
}

const getById = async (req, res, next) => {
  const { id }: { id: string } = req.params;
  const newId = Number(id)
  const validateId = await lotteryIdValidation(newId);
   
  if(validateId){
      const getLottery = await sequelize.query(
        `SELECT * FROM lotteries WHERE id = ?`, { replacements: [`${newId}`]} )
        
        if(getLottery){
          const getCode = await sequelize.query(
        `SELECT * FROM codes c WHERE c.lotteryId = ?`, { replacements: [`${newId}`]} )

            const result = {
            LotteryId: getLottery[0][0].id,
            name: getLottery[0][0].name,
            fondPrize: getLottery[0][0].fondPrize,
            grandPrize: getLottery[0][0].grandPrize,
            owner: getLottery[0][0].owner,
            startDate: getLottery[0][0].startDate,
            endDate: getLottery[0][0].endDate,
            Codes: getCode[0]
            } 
              res.status(200).send(result)
          
        }
  } else {
    res.status(404).send({ Info: `There is no Lottery with id: ${id}`});
  }
 
  await next;
}

const create = async(req, res, next) => {
  
  const {
    name,
    fondPrize,
    grandPrize,
    owner,
    startDate,
    endDate
  }: {
    name: string,
    fondPrize: number,
    grandPrize: string,
    owner: string,
    startDate: string,
    endDate: string
  } = req.body;

    await Lottery.create({
    name,
    fondPrize,
    grandPrize,
    owner
  });

  res.status(201).send({ Info: `Lottery has been created`})
  await next;
}

const update = async(req, res, next) => {
  const { id }: { id: string } = req.params;

  const updateData: {  
    name: ?string,
    fondPrize: ?number,
    grandPrize: ?string,
    owner: ?string,
    startDate: ?string,
    endDate: ?string
  } = Object.assign({}, req.body);

  const newId = Number(id)
  const validateId = await lotteryIdValidation(newId);

  if (!validateId) {
    res.status(404).send({ info: `Lottery with id ${id} is not found`});

  } else {
    await Lottery.update(updateData, { where: { id }})
    res.status(204)
    res.status(200).send({ info: `Lottery with id ${id} has been updated`});
  }
  await next;
}

const del = async(req, res, next) => {
  const { id }: { id: string } = req.params;
  const newId = Number(id)
  const validateId = await lotteryIdValidation(newId);

  if (!validateId) {
    res.status(404).send({ info: `Lottery with id ${id} is not found`});
  } else {
      const getCodeId = await sequelize.query(
      'SELECT id, userId FROM codes WHERE codes.lotteryId = ?',  { replacements: [`${newId}`]})
      if(getCodeId[0].length === 0){
        res.status(202).send({ info: `Lottery with id: ${id} has been removed`});
      } else {
        const codeId = getCodeId[0][0].id;
        const userId = getCodeId[0][0].userId

        const drawData = await sequelize.query(
        'DELETE FROM draws WHERE draws.codeId = ?',  { replacements: [`${codeId}`]})

        const userData = await sequelize.query(
        'DELETE FROM users WHERE users.id = ?',  { replacements: [`${userId}`]})

        const codeData = await sequelize.query(
        'DELETE FROM codes WHERE codes.lotteryId = ?',  { replacements: [`${newId}`]})

        await Lottery.destroy({ where: { id }});
        res.status(202).send({ info: `Lottery with id: ${id} has been removed`});
      }
      

  }
  await next;
}


export default {
  list,
  getById,
  del,
  update,
  create
}