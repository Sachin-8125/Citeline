import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Landing from './pages/Landing';
import { PublicOnlyRoute } from './components/PublicOnlyRoute';


function App() {

  return (
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route element={<PublicOnlyRoute/>}>
        <Route element={<Signin/>} path="/signin" />
      </Route>
      <Route element={<PublicOnlyRoute/>}>
        <Route element={<Signup/>} path="/signup" />
      </Route>
      <Route element={<Navigate to="/" replace />} path="*" />
    </Routes>
  )
}

export default App