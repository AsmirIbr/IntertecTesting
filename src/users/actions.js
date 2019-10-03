import hat from 'hat';
import sequelize from '../db/sequelize';
import Bluebird from 'bluebird';
import nodemailer from 'nodemailer';

import models from '../models/index';

const User = models.Users;
const Codes = models.Codes;

const userEmailValidation = Bluebird.coroutine(
  function* validationUserEmail(email: string) {
    const results: Array = yield User.findAll();
    const userEmail = results.map(userEmail => userEmail.email);
    return userEmail.includes(email);
  }
);

const codesValidation = Bluebird.coroutine(
  function* validationCodes(code: string) {
    const results: Array = yield Codes.findAll();
    const codes = results.map(codes => codes.code);
    return codes.includes(code);
  }
);

const list = async(req, res, next) => {
  const result: Array = await User.findAll({

    include: [{
      model: models.Codes
    }]
  });

  res.status(200).send(result);
  await next;
}

const getByEmail = async(req, res, next) => {
  const { email }: { email: string} = req.params;
  const validationEmail = await userEmailValidation(email);

  if(validationEmail){
    const userData = await sequelize.query(
      'SELECT id, name, email FROM users WHERE users.email = ?',  { replacements: [`${email}`]})

    const codeData = await sequelize.query(
      'SELECT id, code, status FROM codes WHERE codes.userId = ?',  { replacements: [`${userData[0][0].id}`]})
      const result = {
            userId: userData[0][0].id,
            name: userData[0][0].name,
            email: userData[0][0].email,
            Code: codeData[0]
      }
       res.status(200).send(result)

    } else {
      res.status(404).send({Info: `There is no User with email: ${code}`});
    }
  
  await next;
}

const create = async(req, res, next) => {
  
  const {
    lastCode,
    name,
    email,
    phone
  }: {
    lastCode: string,
    name: string,
    email: string,
    phone: string
  } = req.body;

   const validationUserEmail = await userEmailValidation(email);
   const validationCodes = await codesValidation(lastCode);
    if(!validationCodes){
      res.status(404).send({ message: 'Invalid code' });
    } else{
      const getCodesStatus = await sequelize.query(`SELECT code, status FROM codes WHERE code = ?`,  { replacements: [`${lastCode}`]})
        if(getCodesStatus[0][0].status === `free`){

          if(!validationUserEmail){
     
            await User.create({
            name,
            lastCode,
            email,
            phone
          });

      const updateCodes = await sequelize.query(`SELECT id, email FROM users WHERE email = ?`,  { replacements: [`${email}`]})
        if(updateCodes){
            await Codes.update({ userId: updateCodes[0][0].id, status: 'taken ' }, { where: { code: lastCode } });
            res.status(204);
            res.status(201).send({ Info: `User with name: ${name} has been created`})

            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'codeacademy.winprize@gmail.com',
                pass: 'codeacademy2019'
              }
            });
        
            const mailOptions = {
              from: 'codeacademy.winprize@gmail.com', // sender address
              to: `${email}`, // list of receivers
              subject: 'CodeAcademyLottery', // Subject line
              html: `<p>Dear ${name}. <br> Your code '${lastCode}' successfully saved </p>`// plain text body
            };
        
            transporter.sendMail(mailOptions, function (err, info) {
              if(err)
                console.log(err)
              else
                console.log(info);
            });
          }
        } else {
          await User.update({ lastCode: lastCode }, { where: { email } });
          res.status(204);

        const updateCodes = await sequelize.query(`SELECT id, email FROM users WHERE email = ?`,  { replacements: [`${email}`]})
          if(updateCodes){
            await Codes.update({ userId: updateCodes[0][0].id, status: 'taken ' }, { where: { code: lastCode } });
            res.status(204);
            res.status(201).send({ Info: `User with id: ${updateCodes[0][0].id} has been updated`})

            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'codeacademy.winprize@gmail.com',
                pass: 'codeacademy2019'
              }
            });
        
            const mailOptions = {
              from: 'codeacademy.winprize@gmail.com', // sender address
              to: `${email}`, // list of receivers
              subject: 'CodeAcademyLottery', // Subject line
              html: `<p>Dear ${name}. <br> Your code '${lastCode}' successfully saved </p>`// plain text body
            };
        
            transporter.sendMail(mailOptions, function (err, info) {
              if(err)
                console.log(err)
              else
                console.log(info);
            });
          }
        } 
      } else {
        res.status(403).send({ message: 'Code is taken' });
      }
  }
   
  await next;
}

export default {
  list,
  getByEmail,
  create
}