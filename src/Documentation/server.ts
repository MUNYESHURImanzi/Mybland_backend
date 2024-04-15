import express, { Application } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import routes from '../Routers';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

const DATABASE_URL: string = 'mongodb+srv://munyeshuri:Munyeshuri@cluster0.yqd0pr4.mongodb.net/mydatabase?retryWrites=true&w=majority';

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch((error: any) => console.error('MongoDB connection error:', error));

const app: Application = express();

app.use(express.json());
const cors = require("cors");
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions));

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const router = express.Router();
routes(router);
app.use("/", router);

const port: number = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
