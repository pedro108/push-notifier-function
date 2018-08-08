var main = require('./index.js');

let context = { done: function() {}, res: { body: {}, status: {} } };
context.done = function() { console.log(context); }
main(context, { body: { name: "Menezes" } });

console.log(context);

