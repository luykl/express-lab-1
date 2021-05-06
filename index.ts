import express from 'express';
import routes from './cart-routes';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", routes);


const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});