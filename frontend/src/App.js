import React, { Component } from "react";
import logo from "./logo.svg";
import BeneficiaryRoutes from "./routes/routes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BeneficiaryRoutes />
        <ToastContainer position="top-center" />
      </div>
    );
  }
}

export default App;
