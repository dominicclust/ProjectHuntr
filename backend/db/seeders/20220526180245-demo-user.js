'use strict';
const { Op } = require('sequelize')
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {email: 'emma@demo.com', username: 'iEmmaDemo', hashedPassword: bcrypt.hashSync('password1')},
      {email: 'demo@user.io', username: 'Demo-lition', hashedPassword: bcrypt.hashSync('password2')},
      {email: 'user1@user.io', username: 'Fakerrr', hashedPassword: bcrypt.hashSync('password3')},
      {email: 'allenfaughn@gmail.com', username: 'allenfaughn', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'stili87@gmail.com', username: 'stili87', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'vallasac@gmail.com', username: 'vallasac', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'wilkinson94@gmail.com', username: 'wilkinson94', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'anthonyseo556@gmail.com', username: 'anthonyseo556', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'anthonyt3@sbcglobal.net', username: 'anthonyt3', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'brianshkim25@gmail.com', username: 'brianshkim', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'cbuenlucas@gmail.com', username: 'cbuenlucas', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'chaseriddick@outlook.com', username: 'chaseriddick', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'christiancarteno@hotmail.com', username: 'christiancarteno', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'christopherchueng@gmail.com', username: 'christopherchueng', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'chrispyohong@gmail.com', username: 'chrispyohong', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'cburns1993@gmail.com', username: 'cburns1993', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'connorwfitch@gmail.com', username: 'connorwfitch', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'dannytoan1@gmail.com', username: 'dannytoan1', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'daveman@gmail.com', username: 'daveman', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'daytonchen120@gmail.com', username: 'daytonchen120', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'dclust34@gmail.com', username: 'dclust34', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'd.peate63@gmail.com', username: 'd.peate63', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'ericgeagan@gmail.com', username: 'ericgeagan', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'elisaia55@yahoo.com', username: 'elisaia55', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'gracetrc7@gmail.com', username: 'gracetrc7@gmail.com', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'israelarvizuofficial@gmail.com', username: 'israelarvizuofficial', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: '012tjake@gmail.com', username: '012tjake', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: '7jaeshin@gmail.com', username: '7jaeshin', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'jkintner25@gmail.com', username: 'jkintner25', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'florakho123@gmail.com', username: 'florakho123', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'joel.irvin@cruz-family.ws', username: 'joel.irvin', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'jabistro@gmail.com', username: 'jabistro', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'wnsqoqo@gmail.com', username: 'wnsqoqo', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'jjavierdenis@gmail.com', username: 'jjavierdenis', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'jmartinezsal326@gmail.com', username: 'jmartinezsal326', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'joshuamkeim@gmail.com', username: 'joshuamkeim', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'qyliu10@gmail.com', username: 'qyliu10', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'jyi@ucsb.edu', username: 'j_yi', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'khali.hill@gmail.com', username: 'khali.hill', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'kmulloth@gmail.com', username: 'kmulloth', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'yems500@gmail.com', username: 'yems500', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'mzhang.142857@gmail.com', username: 'mzhang.142857', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'november12erika@gmail.com', username: 'november12erika', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'oliviabir19@gmail.com', username: 'oliviabir19', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'osvaldo.salo21@gmail.com', username: 'osvaldo.salo21', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'pmcginn@highlinefm.com', username: 'pmcginn', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'zhiqilinn@gmail.com', username: 'zhiqilinn', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'falk.shannon@gmail.com', username: 'falk.shannon', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'jasanisona@gmail.com', username: 'jasanisona', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'ukiworks034@gmail.com', username: 'ukiworks034', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'walkeradkins@gmail.com', username: 'walkeradkins', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'waseemalame45@gmail.com', username: 'waseemalame45', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'weiqimei@ucsb.edu', username: 'weiqimei', hashedPassword: bcrypt.hashSync('Feb_22')},
      {email: 'jorgexiaoyang@gmail.com', username: 'jorgexiaoyang', hashedPassword: bcrypt.hashSync('Feb_22')}
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['iEmmaDemo', 'Demo-lition', 'Fakerrr'] }
    }, {});
  }
};
