const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true}
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const existingRouter = require('./routes/existing');
const newRouter = require('./routes/new');

app.use('/existing', existingRouter);
app.use('/new', newRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
