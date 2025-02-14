import { ToastContainer } from "react-toastify";
import "./App.css";
import Routing from "./AllRouting/Routing";
import { BrowserRouter } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <ToastContainer />
      <Routing />
    </>
  );
}

export default App;
