import express from 'express';
import routes from './cart-routes';
import cors from 'cors';
const app = express();


app.use(express.json());
app.use("/", routes);
app.use(cors());

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});