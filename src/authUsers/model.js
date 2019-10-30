 
export default (sequelize, DataType) => {
    const authusers = sequelize.define('authusers',
    {
      id: {
        type: DataType.STRING,
        primaryKey: true,
      },
      email: {
        type: DataType.STRING,
        allowNull: false,
          unique: true,
          validate: {
            len: {
              args: [6, 128],
              msg: "Email address must be between 6 and 128 characters in length"
            },
            isEmail: {
              msg: "Email address must be valid"
            }
          }
      },
      username: {
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isAlphanumeric: true,
          len: {
            args: [6, 128],
            msg: "Username must be between 6 and 128 characters in length"
          }
        }
      },
      password: {
        type: DataType.STRING,
        allowNull: false
      },
      token: {
        type: DataType.STRING
      },
       createdAt: {
        type: DataType.DATE,
        default: new Date(Date.now()),
      },
      updatedAt: {
        type: DataType.DATE
      },
      deletedAt: {
        type: DataType.DATE
      },
      lastSignIn: DataType.DATE
    });
    return authusers;
  }