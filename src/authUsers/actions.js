import hat from 'hat';
import Bluebird from 'bluebird';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import secrets from '../../config/secrets.json';
import models from '../models/index';

Bluebird.promisifyAll(bcrypt);
Bluebird.promisifyAll(jwt);

const Users = models.AuthUsers;

const usersIdValidation = Bluebird.coroutine(
  function* validationUsersId(id: string) {
    const results: Array = yield Users.findAll();
    const usersIds = results.map(usersId => usersId.id);
    return usersIds.includes(id);
  }
);

const list = async(req, res, next) => {
  const result: Array = await Users.findAll();

  res.status(200).send(result);
  await next;
}

const get = async(req, res, next) => {
  const { id }: { id: string } = req.params;
  const validationUsersId = await usersIdValidation(id);

  if (validationUsersId) {
    const result: Object = await Users.find({ where: { id }});
    res.status(200).send(result);
  }
  res.status(400).send({ info: `Users id ${id} is not found`});
  await next;
}

const create = async(req, res, next) => {
  const {
    email,
    username,
    password,
  }: {
    email: string,
    username: string,
    password: string
  } = req.body;

  const userId = hat();
  const salt = await bcrypt.genSaltSync(10);
  const rounds = await bcrypt.getRounds(salt);
  const passHash = await bcrypt.hashSync(password, rounds);
  console.log("ADADA")

  await Users.create({
    id: userId,
    email,
    username,
    password: passHash
  });

  res.status(201).send({ Info: `User with id: ${userId} has been created`})
  await next;
}

const update = async(req, res, next) => {
  const { id }: { id: string } = req.params;

  const updateData: {
    email: ?string,
    username: ?string,
    password: ?string,
  } = Object.assign({}, req.body);

  const validationUsersId = await usersIdValidation(id);
  if (!validationUsersId) {
    res.status(400).send({ info: `Users id ${id} is not found`});
  }
  
    await Users.update(updateData, { where: { id }})
    res.status(204).send({ info: `Users id ${id} has been updated`});
  await next;
}

const del = async(req, res, next) => {
  const { id }: { id: string } = req.params;

  const validationUsersId = await usersIdValidation(id);

  if (!validationUsersId) {
    res.status(400).send({ info: `Users id ${id} is not found`});
  }
    await Company.destroy({ where: { id }});
    res.status(202).send({ info: `Users id ${id} has been removed`});
  await next;
}

const login = async (req, res, next) => {
  const {
    username, email,  password
  }: { username: ?string, email: ?string, password: string } = req.body;

  if(!username & !email){
    res.status(404).send('Email or username is required!');
  } else {
      if (username) {
        const user = await Users.find({ where: { username }});
        if (!user) {
          res.status(404).send('User not found');
        } else {
          const passCheck = await bcrypt.compareSync(password, user.password);
        if (passCheck) {
          const secretKey = secrets[process.env.NODE_ENV || 'dev'];
          const token = jwt.sign({ user }, secretKey, { expiresIn: '1h' });
          const lastSignIn = { lastSignIn: Date.now(), resetPasswordToken: null, resetPasswordExpires: null, };
          const updateData = {
            lastSignIn,
            token
          }
          await Users.update(updateData, { where: { username } });

        res.status(200).send({ body: { token }, message: `Welcome ${username} to Code Academy. You have been successfully logged in.` });
        } else {
          res.status(403).send({ message: 'Incorrect password' });updateData
        }
      }
    } else {
      const user = await Users.find({ where: { email }});
        if (!user) {
          res.status(404).send('User not found');
        } else {
          const passCheck = await bcrypt.compareSync(password, user.password);
        if (passCheck) {
          const secretKey = secrets[process.env.NODE_ENV || 'dev'];
          const token = jwt.sign({ user }, secretKey, { expiresIn: '24h' });
          const lastSignIn = { lastSignIn: Date.now(), resetPasswordToken: null, resetPasswordExpires: null, };
          const updateData = {
            lastSignIn,
            token
          }
          await Users.update(updateData, { where: { email } });

        res.status(200).send({ body: { token }, message: `Welcome ${email} to Code Academy. You have been successfully logged in.` });
        } else {
          res.status(403).send({ message: 'Incorrect password' });
        }
      }
    }
    
  }
}

// const login = async (req, res, next) => {
//   const {
//     username, password
//   }: { username: string, password: string } = req.body;

//   if (username) {
//     const user = await Users.find({ where: { username }});
//     if (!user) {
//       const email = username;
//       const withEmail = await Users.find({ where: { email }});
//       if (withEmail){
//         const passCheck = await bcrypt.compareSync(password, withEmail.password);
//       if (passCheck) {
//         const secretKey = secrets[process.env.NODE_ENV || 'dev'];
//         const token = jwt.sign({ user }, secretKey, { expiresIn: '1h' });
//         const lastSignIn = { lastSignIn: Date.now(), resetPasswordToken: null, resetPasswordExpires: null, };
//         await Users.update(lastSignIn, { where: { email } });

//         res.status(200).send({ body: { token }, message: `Welcome ${username} to Code Academy. You have been successfully logged in.` });
//       } else {
//         res.status(403).send({ message: 'Incorrect password' });
//       }
//       }
      
//       res.status(404).send('User not found');
//     } else {
//       const passCheck = await bcrypt.compareSync(password, user.password);
//       if (passCheck) {
//         const secretKey = secrets[process.env.NODE_ENV || 'dev'];
//         const token = jwt.sign({ user }, secretKey, { expiresIn: '1h' });
//         const lastSignIn = { lastSignIn: Date.now(), resetPasswordToken: null, resetPasswordExpires: null, };
//         await Users.update(lastSignIn, { where: { username } });

//         res.status(200).send({ body: { token }, message: `Welcome ${username} to Code Academy. You have been successfully logged in.` });
//       } else {
//         res.status(403).send({ message: 'Incorrect password' });
//       }
//     }
//   } else {
//     res.status(404).send({ message: 'User is not found' });
//   }
// }

const resetPassword = async (req, res, next) => {
  const { 
    email, password
  }: {
    email: string, password: string
  } = req.body;

  if (email) {
    const user = await Users.find({ where: { email } });
    if (user) {
      const salt = await bcrypt.genSaltSync(10);
      const rounds = await bcrypt.getRounds(salt);
      const newPassword = await bcrypt.hashSync(password, rounds);

      await Users.update({ password: newPassword}, { where: { email } });
      res.send({message: `You have been successfully updated your password. Your new password is ${password}` });
      res.status(204);
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  }

  await next;
}



export default {
  list,
  get,
  create,
  update,
  del,
  login,
  resetPassword
}

// const email = username;
// const withEmail = await Users.find({ where: { email }});
// if (withEmail){
//   const passCheck = await bcrypt.compareSync(password, withEmail.password);
// if (passCheck) {
//   const secretKey = secrets[process.env.NODE_ENV || 'dev'];
//   const token = jwt.sign({ user }, secretKey, { expiresIn: '1h' });
//   const lastSignIn = { lastSignIn: Date.now(), resetPasswordToken: null, resetPasswordExpires: null, };
//   await Users.update(lastSignIn, { where: { email } });

//   res.status(200).send({ body: { token }, message: `Welcome ${username} to Code Academy. You have been successfully logged in.` });
// } else {
//   res.status(403).send({ message: 'Incorrect password' });
// }
// }