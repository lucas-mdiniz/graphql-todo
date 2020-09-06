const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://lucasmdiniz:32120720@cluster0.l91lh.mongodb.net/graphql-todo?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongo connected');
});
