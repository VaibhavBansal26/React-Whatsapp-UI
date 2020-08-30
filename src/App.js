import React  from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import {Switch,BrowserRouter as Router,Route} from 'react-router-dom'
import Login from './Login'
import { useStateValue } from './StateProvider';

function App() {
  const [{user},dispatch] = useStateValue();
  //const [user, setUser] = useState(null);

  return (
    <div className="app">
      {console.log(user?.user)}
      {!user ? (
        <Login/>
      ):(
        <div className="app__body">
        <Router>
          <Sidebar/>
              <Switch>
                  <Route path="/rooms/:roomId">      
                    <Chat/>
                  </Route>

                  <Route path="/">
                    <Chat/>
                  </Route>
              </Switch>
        </Router>
        
      </div>

      )}

      
      
    </div>
  );
}

export default App;
