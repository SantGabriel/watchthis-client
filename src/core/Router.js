import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavbarComponent from "../components/global/Navbar";
import PrivateRoute from "../components/global/PrivateRoute";
import roles from "../configs/roles";

import LoginPage from "../pages/auth/Login";
import RegisterPage from "../pages/auth/Register";
import Home from "../pages/home/Home";
import ObraListPage from "../pages/obra/obra-List";
import ObraDetailsPage from "../pages/obra/obra-Details";
import ItemListaListPage from "../pages/itemLista/itemLista-List";
import ItemListaDetailsPage from "../pages/itemLista/itemLista-Details";

export default class RouterComponent extends React.Component {
  render() {
    return (
      <Router>
        <NavbarComponent />
        <Switch>
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} />
          <PrivateRoute roles={[roles.Boss, roles.Servant]} exact path="/obra/list" component={ObraListPage} />
          <PrivateRoute roles={[roles.Boss, roles.Servant]} exact path="/user/list" component={ItemListaListPage} />
          <PrivateRoute
            roles={[roles.Boss, roles.Servant]}
            exact
            path="/obra/details/:id"
            component={ObraDetailsPage}
          />
          <PrivateRoute
            roles={[roles.Boss, roles.Servant]}
            exact
            path="/user/details/:id"
            component={ItemListaDetailsPage}
          />
          <Route path="*" component={Home} />
        </Switch>
      </Router>
    );
  }
}
