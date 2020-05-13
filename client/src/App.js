import React,{useEffect,createContext,useReducer,useContext} from 'react';
import Navbar from './components/Navbar';
import "./App.css" 
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'

import Home from "./components/screens/Home"
import Signin from "./components/screens/Login"
import Profile from "./components/screens/Profile"
import Signup from "./components/screens/Signup"
import Createpost from "./components/screens/Createpost"
import UserProfile from "./components/screens/UserProfile"
import SubscribedUserPosts from "./components/screens/SubscribedUserPosts"
import Reset from "./components/screens/Reset"
import Newpassword from "./components/screens/Newpassword"
import {reducer,initialState} from './reducers/userReducer'

export const UserContext=createContext()

const Routing=()=>{
  const history=useHistory()
  const {state,dispatch}=useContext(UserContext)
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      //history.push('/')
    }
    else{
      if(!history.location.pathname.startsWith('/reset'))
          history.push('/signin')
    }
  },[])
  return(
    <Switch>
      <Route exact path="/">
        <Home/>
      </Route>
      <Route path="/signin">
        <Signin/>
      </Route>
      <Route path="/signup">
        <Signup/>
      </Route>
      <Route exact path="/profile">
        <Profile/>
      </Route>
      <Route path="/create">
        <Createpost/>
      </Route>
      <Route path="/profile/:userid">
        <UserProfile/>
      </Route>
      <Route path="/myfollowingspost">
        <SubscribedUserPosts/>
      </Route>
      <Route exact path="/reset">
        <Reset/>
      </Route>
      <Route path="/reset/:token">
        <Newpassword/>
      </Route>
    </Switch>
  )
}

function App() {
  const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <Navbar/>
        <Routing/>
      </BrowserRouter>
    </UserContext.Provider>

  );
}

export default App;
