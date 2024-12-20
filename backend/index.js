const connectToMongo = require('./db');
const express = require('express') // require to connect to MongoDB
const cors = require('cors');

connectToMongo();
const app = express()
const port = 5000

app.use(cors());
app.use(express.json()); // it is a middleware that used to show req.body in terminal

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
}) 