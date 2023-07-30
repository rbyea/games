import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Main from "./components/layouts/main";
import LoaderDate from "./components/ui/hoc/loaderDate";
import Catalog from "./components/layouts/catalog";
import Card from "./components/layouts/card";
import Basket from "./components/layouts/basket";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/layouts/login";
import ProtectedRoute from "./components/ui/protectedRoute";
import PersonalAccount from "./components/layouts/personalAccount";
import NotFound from "./components/layouts/NotFound";
import Navbar from "./components/ui/navbar";
import LogoJSHOP from "./assets/logo.svg";

function App() {
  return (
    <LoaderDate>
      <nav className="navbar navbar-expand navbar-dark bg-dark osahan-nav-top p-0 px-2 sticky-top">
        <div className="container">
          <Link className="navbar-brand mr-2" to="/">
            <img src={LogoJSHOP} alt="" />
          </Link>
          <Navbar />
        </div>
      </nav>
      <Switch>
        <Route path="/catalog" component={Catalog} />
        <Route path="/basket" component={Basket} />
        <Route path="/login/:type?" component={Login} />
        <Route path="/card/:gameId" component={Card} />
        <ProtectedRoute
          path="/account/:userId?/:edit?"
          component={PersonalAccount}
        />
        <Route exact path="/" component={Main} />
        <Route path="*" component={NotFound} />
      </Switch>
      <ToastContainer />
      <section className="footer py-5 bg-dark section-padding">
        <div className="container">
          <div className="row py-lg-4">
            <div className="col-lg-2 col-sm-6">
              <div className="footer-brand">
                <img className="img-fluid" src={LogoJSHOP} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </LoaderDate>
  );
}

export default App;
