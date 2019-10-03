export default (sequelize, DataType) => {
  const Lottery = sequelize.define('lottery',
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
    fondPrize: {
      type: DataType.INTEGER,
      allowNull: false
    },
    grandPrize: {
      type: DataType.STRING
    },
    owner: {
      type: DataType.STRING
    },
    startDate: DataType.STRING,
    endDate: DataType.STRING,
    createdAt: {
      type: DataType.DATE,
      default: new Date(Date.now()),
    },
    updatedAt: DataType.DATE,
    deletedAt: DataType.DATE,
  });

  return Lottery;
}