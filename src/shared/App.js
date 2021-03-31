import React from 'react'
import {Route} from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configStore";
import Login from '../pages/Login';
import PostList from "../pages/PostList";
import SignUp from '../pages/SignUp';
import Header from '../components/Header';
import PostWrite from '../pages/PostWrite';
import { Button } from '../elements';
import Permit from "./Permit";
import PostDetail from '../pages/PostDetail';
import Notification from '../pages/Notification';

// import NotFound from '../pages/NotFound';

function App() {
  return (
    <>
        <Header/>
        <ConnectedRouter history={history}>
          <Route path="/" exact component={PostList} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={SignUp}/>
          <Route path="/write" exact component={PostWrite} />
        <Route path="/write/:id" exact component={PostWrite} />
        <Route path="/post/:id" exact component={PostDetail} />
        <Route path='/noti' exact component={Notification} />
        </ConnectedRouter>  
        <Permit>
      <Button is_float text='+' _onClick={()=>history.push('/write')}/>
      </Permit>
 
         </>
  );
}

export default App;
