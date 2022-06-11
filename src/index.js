import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import { HashRouter, Switch, Route } from "react-router-dom";
import ProductsList from "./components/ProductsList";
import ProductForm from "./components/ProductForm";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Switch>
        <Route exact path='/' component={App}></Route>
        <Route exact path='/products' component={ProductsList}></Route>
        <Route exact path='/form' component={ProductForm}></Route>
        <Route exact path='/form/:id' component={ProductForm}></Route>
      </Switch>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
