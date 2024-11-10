import React from 'react';
import { BrowserRouter ,Routes, Route } from 'react-router-dom';
import Signup from './components/SignUp/Signup';
import VerifyEmail from './components/VerifyEmail/VerifyEmail';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signup/>}></Route>
          <Route path='/verify' element={<VerifyEmail/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
