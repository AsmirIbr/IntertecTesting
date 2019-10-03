import sequelize from '../db/sequelize';
import shuffle from 'shuffle-array';
import nodemailer from 'nodemailer';
import Bluebird from 'bluebird';
import Cron from 'node-cron';

import models from '../models/index';

const Draw = models.Draw;
const Codes = models.Codes;
const Prize = models.Prize;

const drawIdValidation = Bluebird.coroutine(
    function* validationIdDraw(id: number) {
      const results: Array = yield Draw.findAll();
      const drawIds = results.map(drawId => drawId.id);
      return drawIds.includes(id);
  });

const list = async(req, res, next) => {
  const result: Array = await Draw.findAll({

    include: [{
      model: models.Prize
    },{
      model: models.Codes,
      include: [{
        model: models.Users
      }]
    }]
  });

  res.status(200).send(result);
  await next;
};

const getByPrizeId = async(req, res, next) => {
  const { id }: { id: string} = req.params;

  const getPrizeId = await sequelize.query(
    `SELECT max(d.createdAt) FROM prizes p INNER JOIN draws d WHERE d.prizeId = ?`, { replacements: [`${id}`]} )

  res.status(200).send(getPrizeId[0]);
  await next;
};

const get = async(req, res, next) => {
  const { id }: { id: string} = req.params;
  const newId = Number(id)
  const validateId = await drawIdValidation(newId);
   
  if(validateId){
      const getDraw = await sequelize.query(
        `SELECT codeId, prizeId FROM draws WHERE id = ?`, { replacements: [`${newId}`]} )
        
        if(getDraw){
          const getCode = await sequelize.query(
          `SELECT userId, code, status, rewardedAt FROM codes WHERE id = ?`, { replacements: [`${getDraw[0][0].codeId}`]} )

          const getPrize = await sequelize.query(
          `SELECT name, description, status FROM prizes WHERE id = ?`, { replacements: [`${getDraw[0][0].prizeId}`]} )

          const getUser = await sequelize.query(
          `SELECT id, name, email, phone FROM users u WHERE id = ?`, { replacements: [`${getCode[0][0].userId}`]} )

            const result = {
            DrawId: getDraw[0][0].id,
            CodeId: getDraw[0][0].codeId,
            PrizeId: getDraw[0][0].prizeId,
            Prize: {
              userId: getPrize[0][0].id,
              name: getPrize[0][0].name,
              status: getPrize[0][0].status
            },
            Code: {
              code: getCode[0][0].code,
              status: getCode[0][0].status,
              rewardedAt: getCode[0][0].rewardedAt,
                User: {
                  userId: getUser[0][0].id,
                  name: getUser[0][0].name,
                  email: getUser[0][0].email,
                  phone: getUser[0][0].phone,
                }
            }
            } 
              res.status(200).send(result)
        }
  } else {
    res.status(404).send({ Info: `There is no draw with id: ${id}`});
  }
  await next;
}


const create = async(req, res, next) => {
  const createDraw = async (id) => {
  const prizeId = parseInt(id);
    try{  
        const getCodeStatus = await sequelize.query('SELECT id, userId, status FROM codes WHERE status = ?',  { replacements: [`taken`]})

      if(getCodeStatus[0].length > 0){
    const randomCode: Object = shuffle.pick(getCodeStatus[0]);
  
    await Draw.create({
    codeId: randomCode.id,
    prizeId: prizeId
    });

    const id = randomCode.id;
    const newDate = new Date(Date.now());
  
    await Codes.update({ status: 'rewarded', rewardedAt: newDate }, { where: { id } })

  const getUserId = await sequelize.query(
      'SELECT userId, code FROM codes WHERE codes.id = ?',  { replacements: [`${id}`]})

  const userMail = await sequelize.query(
      'SELECT id, name, email FROM users WHERE users.id = ?',  { replacements: [`${getUserId[0][0].userId}`]})

  const getPrizeName = await sequelize.query(
      'SELECT name FROM Prizes WHERE prizes.id = ?',  { replacements: [`${prizeId}`]})
  
  const mail = userMail[0][0].email

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'codeacademy.winprize@gmail.com',
        pass: 'codeacademy2019'
      }
    });

    const mailOptions = {
      from: 'codeacademy.winprize@gmail.com', // sender address
      to: `${mail}`, // list of receivers
      subject: 'CodeAcademyLottery', // Subject line
      html: `<p>Dear ${userMail[0][0].name}. <br> Your code '${getUserId[0][0].code}' won ${getPrizeName[0][0].name}</p>`// plain text body
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if(err)
        console.log(err)
      else
        console.log(info);
    });

    res.status(204);
    res.status(201).send({ Info: `Has been drawn up for prize: ${getPrizeName[0][0].name}, the winning code is '${getUserId[0][0].code}'`})
  }
  
  }
  catch(err){
  res.status(400).send(err);
  }
}
  if(req.params){
    const { id }: { id: string } = req.params;
    createDraw(id)
  } else {
    const id  = req;
    createDraw(id)
  }
   Cron.schedule('1 * * * *', () => {
    create("1");
  });

  Cron.schedule('0 21 * * 5', () => {
    create("2");
  });
  await next;
}

 

export default {
  list,
  get,
  create,
  getByPrizeId
}