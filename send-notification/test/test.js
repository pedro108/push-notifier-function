const Chance = require('chance');
const subject = require('../index.js');

let context = {
  done: function () {
  }, res: {body: {}, status: {}},
};
context.done = function () {
  console.log(context);
};

const chance = new Chance();

subject(context, {
  body: {
    name: chance.name(),
    message: chance.sentence(),
    title: chance.word(),
    subtitle: chance.sentence(),
  },
});

console.log(JSON.stringify(context));

