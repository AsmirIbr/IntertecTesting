export default (sequelize, DataType) => {
  const Draw = sequelize.define('draw',
  {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    codeId: {
      type: DataType.INTEGER
    },
    prizeId: {
      type: DataType.INTEGER
    },
    createdAt: {
      type: DataType.DATE,
      default: new Date(Date.now()),
    },
    updatedAt: DataType.DATE,
    deletedAt: DataType.DATE,
  });

  return Draw;
}