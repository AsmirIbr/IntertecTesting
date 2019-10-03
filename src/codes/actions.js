import Sequelize from 'sequelize';
import sequelize from '../db/sequelize';
import Bluebird from 'bluebird';

import models from '../models/index';

const Codes = models.Codes;
const Users = models.Users;
const Prize = models.Prize;
const Draw = models.Draw;
const Lottery = models.Lottery;

const codesValidation = Bluebird.coroutine(
  function* validationCodes(code: string) {
    const results: Array = yield Codes.findAll();
    const codes = results.map(codeFromCodes => codeFromCodes.code);
    return codes.includes(code);
  });

  const codesIdValidation = Bluebird.coroutine(
    function* validationIdCodes(id: number) {
      const results: Array = yield Codes.findAll();
      const codesIds = results.map(codesId => codesId.id);
      return codesIds.includes(id);
  });

const list = async(req, res, next) => { 
  const result: Array = await Codes.findAll({

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
  });

  res.status(200).send(result);
  await next;
}

const getByCode = async(req, res, next) => {
  const { code }: { code: string} = req.params;
  const validationCode = await codesValidation(code);

  if(validationCode){
    const codeData = await sequelize.query(
      'SELECT id, userId, code, status, rewardedAt FROM Codes c WHERE c.code = ?',  { replacements: [`${code}`]})

    if(codeData[0][0].status === `free`){
      const result: Object = {
        codeId: codeData[0][0].id,
        code: codeData[0][0].code,
        status: codeData[0][0].status
      }
      
      res.status(200).send(result)

    } else if (codeData[0][0].status === `rewarded`){

      const userData = await sequelize.query(
      'SELECT id, name, email FROM Users u WHERE u.id = ?',  { replacements: [`${codeData[0][0].userId}`]})

      const drawData = await sequelize.query(
      'SELECT prizeId, codeId, createdAt FROM Draws d WHERE d.codeId = ?',  { replacements: [`${codeData[0][0].id}`]})

      const prizeData = await sequelize.query(
      'SELECT * FROM Prizes p WHERE p.id = ?',  { replacements: [`${drawData[0][0].prizeId}`]})

      const result = {
            codeId: codeData[0][0].id,
            code: codeData[0][0].code,
            status: codeData[0][0].status,
            user: {
              userId: userData[0][0].id,
              name: userData[0][0].name,
              email: userData[0][0].email
            },
            drawDate: drawData[0][0].createdAt,
            prize: {
              prizeid : prizeData[0][0].id,
              name: prizeData[0][0].name,
              description: prizeData[0][0].description,
              status: prizeData[0][0].status
            }
      } 
        res.status(200).send(result)
    } else{
       const userData = await sequelize.query(
      'SELECT id, name, email FROM Users u WHERE u.id = ?',  { replacements: [`${codeData[0][0].userId}`]})

      const result = {
            codeId: codeData[0][0].id,
            code: codeData[0][0].code,
            status: codeData[0][0].status,
            user: {
              userId: userData[0][0].id,
              name: userData[0][0].name,
              email: userData[0][0].email
            },
      }
       res.status(200).send(result)
    }

  } else {
    res.status(404).send({Info: `There is no code with code: ${code}`});
  }
  
  await next;
}

const getById = async (req, res, next) => {
  const { id }: { id: string } = req.params;
  const newId = Number(id)
  const validateId = await codesIdValidation(newId);
   
  if(validateId){
      const getCode = await sequelize.query(
        `SELECT id, userId, code, status, rewardedAt FROM codes c WHERE id = ?`, { replacements: [`${newId}`]} )
        
        if(getCode){
          const getUser = await sequelize.query(
        `SELECT id, name, email, phone FROM users u WHERE id = ?`, { replacements: [`${getCode[0][0].userId}`]} )

          if(getUser === undefined || getUser[0].length == 0){
            res.status(200).send(getCode[0])
          } else {
            const result = {
            codeId: getCode[0][0].id,
            code: getCode[0][0].code,
            status: getCode[0][0].status,
            rewardedAt: getCode[0][0].rewardedAt,
            user: {
              userId: getUser[0][0].id,
              name: getUser[0][0].name,
              email: getUser[0][0].email,
              phone: getUser[0][0].phone,
            }
            } 
              res.status(200).send(result)
          }
        }
  } else {
    res.status(404).send({ Info: `There is no code with id: ${id}`});
  }
 
  await next;
}

const getByStatus = async(req, res, next) => {
  const { status }: { status: string } = req.params;

    const codeData = await sequelize.query('SELECT id, code, status, userId FROM codes c WHERE c.status = ?',  { replacements: [`${status}`]});

      if(codeData[0].length == 0){
        res.status(404).send({ Info: `There is no codes with status: ${status}`});
      } else{
        res.status(200).send(codeData[0])
      }
  await next;
}

const create = async(req, res, next) => {
  
  const {
    code,
    userId,
    lotteryId,
    status,
    rewardedAt
  }: {
    code: string,
    userId: ?number,
    lotteryId: number,
    status: ?string,
    rewardedAt: ?string
  } = req.body;

    await Codes.create({
    code,
    userId,
    lotteryId,
    status,
    rewardedAt
  })
  .then((codes) => {
    res.status(201).send({ Info: `Code with code: ${code} has been created`})
  })
  .catch((err) => {
    res.status(404).send({ Info: `Code must be unique`});
  });
  await next;
}

const update = async(req, res, next) => {
  const { id }: { id: string } = req.params;

  const updateData: {  
    code: ?string,
    userId: ?number,
    lotteryId: ?number,
    status: ?string,
    rewardedAt: ?string
  } = Object.assign({}, req.body);

  const newId = Number(id)
  const validateId = await codesIdValidation(newId);

  if (!validateId) {
    res.status(404).send({ info: `Code with id ${id} is not found`});

  } else {
    await Codes.update(updateData, { where: { id }})
    res.status(204)
    res.status(200).send({ info: `Code with id ${id} has been updated`});
  }
  await next;
}

const del = async(req, res, next) => {
  const { id }: { id: string } = req.params;
  const newId = Number(id)
  const validateId = await codesIdValidation(newId);

  if (!validateId) {
    res.status(404).send({ info: `Code with id ${id} is not found`});
  } else {
      const drawData = await sequelize.query(
      'DELETE FROM Draws WHERE draws.codeId = ?',  { replacements: [`${newId}`]})

      await Codes.destroy({ where: { id }});
      res.status(202).send({ info: `Code with id: ${id} has been removed`});

  }
  await next;
}

export default {
  list,
  create,
  getByCode,
  getByStatus,
  getById,
  update,
  del
}