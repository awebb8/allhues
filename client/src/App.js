import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";
import ContentCreatorUpload from "./pages/ContentCreatorUpload";
import ContentCreatorPortal from "./pages/ContentCreatorPortal";
import ConsumerViewAll from "./pages/ConsumerViewAll";
import ConsumerViewOne from "./pages/ConsumerViewOne";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/upload" component={ContentCreatorUpload}></Route>
          <Route exact path="/portal" component={ContentCreatorPortal}></Route>
          <Route exact path="/viewall" component={ConsumerViewAll}></Route>
          <Route exact path="/viewone" component={ConsumerViewOne}></Route>
        </Switch>
        <Footer />
      </Router> 
    </div>
  );
}

export default App;
