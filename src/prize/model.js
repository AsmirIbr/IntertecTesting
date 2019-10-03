export default (sequelize, DataType) => {
  const Prize = sequelize.define('prize',
  {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataType.STRING,
      allowNull: false
    },
    description: {
      type: DataType.STRING,
      allowNull: false
    },
    status: {
      type: DataType.ENUM,
      values: [
        'perDay',
        'perWeek',
        'final'
    ],
    defaultValue: 'perDay'
    },
    numberOfPrizes: {
      type: DataType.INTEGER,
      allowNull: false
    },
    createdAt: {
      type: DataType.DATE,
      default: new Date(Date.now()),
    },
    updatedAt: DataType.DATE,
    deletedAt: DataType.DATE,
  });

  return Prize;
}