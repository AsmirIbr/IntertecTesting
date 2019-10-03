export default (sequelize, DataType) => {
  const Codes = sequelize.define('codes',
  {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataType.STRING,
      allowNull: false,
      unique: true
    },
    userId: {
      type: DataType.INTEGER
    },
    lotteryId: {
      type: DataType.INTEGER,
      allowNull: false
    },
    status: {
      type: DataType.ENUM,
      values: ['free', 'taken', 'rewarded'],
      defaultValue: 'free'
    },
    rewardedAt: DataType.DATE,
    createdAt: {
      type: DataType.DATE,
      default: new Date(Date.now()),
    },
    updatedAt: DataType.DATE,
    deletedAt: DataType.DATE,
  });

  return Codes;
}