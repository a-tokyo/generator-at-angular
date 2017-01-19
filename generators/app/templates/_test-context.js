var context = require.context('./src', true, /-spec\.js$/);
context.keys().forEach(context);
console.log(context.keys());