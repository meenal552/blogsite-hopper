import "./App.css";
import Navbar from "./components/Navbar";
import FillterPost from './components/FavouritePosts'
import SearchPost from './components/SearchPosts'
import Homepage from "./components/Homepage";
import Login_out from "./container/Login_out";
import Userprofile from "./components/UserProfile";
import Addblog from "./components/AddBlog";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
function App() {


  
  return (
    <Router>
      <div>
        <Navbar />

        <Route path="/Addblog" component={Addblog} exact />
        <Route path="/UserProfile" component={Userprofile} exact />
        <Route path="/Register" component={Login_out} exact />
        <Route path="/FilterPost" component={FillterPost} exact />
        <Route path="/searchPage/:keyword" exact component={SearchPost}  />
        
        <Route path="/" component={Homepage} exact />
      </div>
    </Router>
  );
}

export default App;
