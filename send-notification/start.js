const Chance = require('chance');
const subject = require('./index.js');

let context = {
  done: function () {
  }, res: {body: {}, status: {}},
};
context.done = function () {
  console.log(context.res.body.data);
};

const chance = new Chance();

subject(context, {
  body: {
    title: 'Pablo',
    message: chance.sentence(),
    link: chance.url(),
    deviceIds: [],
  },
});

console.log(JSON.stringify(context));

