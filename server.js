const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./Config/db');
const authRoutes = require('./Routes/authRoute.js');
const categoryRoutes = require('./Routes/CategoryRoute.js');
const productRoutes = require('./Routes/ProductRoute.js');
const cors = require('cors');
const path = require('path');
const {fileURLToPath} = require('url');

//configure env
dotenv.config();

//databse config
connectDB();

//esModeule fix
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname,'../frontend/dist')));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);


// app.get("/", (req, res) => {
//   res.send("<h1>Welcome to review app</h1>");
// });

app.use('*',function(req, res){
  res.sendFile(path.join(__dirname,'../frontend/dist/index.html'));
})

//PORT
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`.bgYellow);
});
