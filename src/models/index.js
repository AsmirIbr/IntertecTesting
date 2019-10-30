import Sequelize from 'sequelize';
import connection from '../db/sequelize';

const models = {
  AuthUsers: connection.import('../authUsers/model'),
  Lottery: connection.import('../lottery/model'),
  Users: connection.import('../users/model'),
  Codes: connection.import('../codes/model'),
  Prize: connection.import('../prize/model'),
  Draw: connection.import('../draw/model')
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.Users.hasMany(models.Codes);
models.Codes.belongsTo(models.Users);

models.Draw.belongsTo(models.Codes);
models.Codes.hasMany(models.Draw);

models.Draw.belongsTo(models.Prize);
models.Prize.hasMany(models.Draw);

models.Lottery.hasMany(models.Codes);
models.Codes.belongsTo(models.Lottery);

models.connection = connection;
models.Sequelize = Sequelize;

export default models;