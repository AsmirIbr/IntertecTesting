import sequelize from '../db/sequelize';

const bla = [
"INSERT INTO lotterydb.lotteries (name, fondPrize, grandPrize, owner, startDate, endDate) VALUES ('CodeAcademyLottery', '150', 'MacBook Pro', 'CodeAcademy', '04.04.2019', '05.05.2019');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('asdte', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('yrewv', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('psien', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('sbvud', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('cvnjy', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('sdfvr', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('vsdbg', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('gdfym', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('vnlpf', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('wqgqg', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('dfjii', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('kloii', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('asdbr', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('vsdrt', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('vfdnd', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('vxetb', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('bsrff', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('vssth', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('fcbnm', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('caefv', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('caseg', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('caeeg', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('capeg', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('caseh', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('vkopr', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('aqqvq', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('vcxnt', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('vswey', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('ljgft', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('bvdrf', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('llpiu', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('jbvde', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('cxsrg', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('bnkir', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('sdqvz', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('xcbhy', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('vaffr', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('vlahe', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('vlaje', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('cpqda', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('vales', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('valev', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('bepej', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('vaeks', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('valek', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('vaoej', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('vekse', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('cajen', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('cejka', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('nyewa', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('asvnu', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('vdlpy', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('vsdhj', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('vvtur', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('aeety', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('vsbvj', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('vaeet', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('nhngn', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('vsdtn', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('sdtrd', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('vsdfh', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('bfjtd', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('dfgjy', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('dfgtr', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('vvxzz', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('qered', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('cvxhr', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('xcvww', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('vxswq', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('vsdwq', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('dfsey', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('bbcrt', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('vsetd', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('vsety', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('vseed', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('vsetv', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('vsedd', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('vsetj', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('dshjt', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('vetyd', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('vaetd', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('qwryy', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('sdguu', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('cgrre', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('bvccx', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('nnnvd', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('xcses', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('xcvnm', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('vxses', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('vxcsr', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('ljjhh', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('liiiu', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('hjhtg', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('mnbgy', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('mnbtr', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('lyurr', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('qqwer', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('eddqw', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('fdsee', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('gdfer', '1');",

"INSERT INTO lotterydb.codes (code, lotteryId) VALUES ('dvczx', '1');",

"INSERT INTO lotterydb.prizes (name, description, numberOfPrizes, status) VALUES ('10% discount from tuition', 'asdfghjk', '60', 'perDay');",

"INSERT INTO lotterydb.prizes (name, description, numberOfPrizes, status) VALUES ('50% discount from tuition', 'wetyfd', '8', 'perWeek');",

"INSERT INTO lotterydb.prizes (name, description, numberOfPrizes, status) VALUES ('Full scholarship', 'asdfghjk', '1', 'final');"
].join(' ')


const createLottery = async(req, res, next) => {

    const getLottery = await sequelize.query(`${bla}`)
        .then((success) => {
    res.status(201).send({ Info: `Lottery, codes and prizes has been created`})
  })
  .catch((err) => {
    console.log(err)
    res.status(404).send({ Info: `Something went wrong`});
  });
  await next;
}

export default {createLottery};