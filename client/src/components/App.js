import React from 'react';
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Signin from './Signin';
import Signup from './Signup';
import NotFound from './NotFound';



const App = () =>(

  <BrowserRouter>
     <Header />
     <main>
      <Routes>
        <Route exact path='/' Component={Home} />
        <Route exact path='/signup' Component={Signup} />
        <Route exact path='/signin' Component={Signin} />
        <Route Component={NotFound} />
      </Routes>
     </main>
  </BrowserRouter>
);


export default App;
