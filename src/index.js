import React from "react";
import ReactDOM from "react-dom";

import Form from "./components/Form";
import Greeter from "./components/Greeter";

import "./css/style.css";


const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<Form />, wrapper) : false;


const greeting = document.getElementById("greeting");
ReactDOM.render(<Greeter name="deethree" />, greeting);