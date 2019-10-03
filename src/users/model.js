export default (sequelize, DataType) => {
  const Users = sequelize.define('users',
  {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    lastCode: {
      type: DataType.STRING,
      allowNull: false
    },
    name: {
      type: DataType.STRING,
      allowNull: false
    },
    email: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
          isEmail : true
      }
    },
    phone: {
      type: DataType.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataType.DATE,
      default: new Date(Date.now()),
    },
    updatedAt: DataType.DATE,
    deletedAt: DataType.DATE,
  });

  return Users;
}