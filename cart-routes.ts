import express from "express";
import CartItem from "./CartItem";
const routes = express.Router();

let cartItems: CartItem[] = [
    {id:1, product:"cheese", price: 2, quantity:3},
    {id:2, product:"crackers", price: 4, quantity:5},
    {id:3, product:"pretzels", price: 3, quantity:1},
    {id:4, product:"pickles", price: 6, quantity:2},
    {id:5, product:"blueberries", price: 5, quantity:2},
    {id:6, product:"strawberries", price: 4, quantity:2},
    {id:7, product:"fancy pretzels", price: 8, quantity:1},
]

let nextID:number = 8;



routes.get("/cart-items", (req, res) => {
    let maxPrice: number = parseInt(req.query.maxPrice as string);
    let prefix: string = req.query.prefix as string;
    let pageSize: number = parseInt(req.query.pageSize as string);
  
    let results = cartItems;
    if (maxPrice) {
        results = results.filter(item => item.price <= maxPrice);
    }
    if (prefix) {
      prefix = prefix.toLowerCase();
      results = results.filter(
          item => item.product.toLowerCase().startsWith(prefix));
    }
    if (pageSize) {
      results = results.slice(0, pageSize);
    }
    res.status(200);
    res.json(results);
  });

  routes.get("/cart-items/:id", (req, res) => {
    const id: number = parseInt(req.params.id);
    const item:CartItem|undefined = cartItems.find(item => item.id === id);
    if (item) {
        res.status(200);
        res.json(item);
    } else {
        res.status(404);
        res.send(`ID Not Found`);
    }
  });

  routes.post("/cart-items", (req, res) => {
    let item: CartItem = req.body;
    item.id = nextID;
    nextID++;
    cartItems.push(item);
    res.status(201);
    res.json(item);
  });


  routes.put("/cart-items/:id", (req, res) => {
    const id: number = parseInt(req.params.id);
    let item: CartItem = req.body;
    item.id = id;
    const index: number = cartItems.findIndex(item => item.id === id);
    if (index !== -1) { 
      cartItems[index] = item;
      res.status(200);
      res.json(item);
    } else {
      res.status(404);
      res.send(`ID Not Found`);
    }
  });

  routes.delete("/cart-items/:id", (req, res) => {
    const id: number = parseInt(req.params.id);
    const index: number = cartItems.findIndex(item => item.id === id);
    if (index !== -1) {
      cartItems.splice(index, 1);
    }
    res.status(204);
    res.send();
  });





export default routes;