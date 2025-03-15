
import './App.scss'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import UserNav from './components/UserNav/UserNav'
import Loader from './shared/components/Loader.tsx/Loader'

function App() {


  return (
    <>
    <Loader/>
    <UserNav/>
    <Home/>
    <Login/>
    </>
  )
}

export default App
