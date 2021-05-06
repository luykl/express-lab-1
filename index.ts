import express from 'express';
import routes from './cart-routes';
const app = express();


app.use(express.json());
app.use("/", routes);

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});