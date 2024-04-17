;
const db = require("../models");
module.exports = {
  getStat: async (req, res) => {
    try {
      const stat = await db.nominees.findAll({
        attributes: ['id', 'name', [db.sequelize.fn('COUNT', db.sequelize.col('votes.userId')), 'voteCount']],
        include:[
            {model:db.votes,as:'votes',attributes:[]}
        ],
        group:['nominees.id']
      });
      res.send({ response: 1, data: { stat }, sys_message: "Welcome" });
    } catch (e) {
      console.log(e);
      res.send({ response: 0, sys_message: "something went wrong" });
    }
  },
};
