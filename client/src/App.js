import { Route } from "react-router-dom";
import "./App.css";
import Home from "./views/Home/Home";
import Landing from "./views/Landing/Landing";
import Detail from "./views/Detail/Detail";
import Create from "./views/Create/Create";

function App() {
  return (
    <div className="App">
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route path="/home/:id" component={Detail} />
        <Route path="/create" component={Create} />
    </div>
  );
}

export default App;
