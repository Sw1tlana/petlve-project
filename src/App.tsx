import './App.scss';
import AddPet from './components/AddPet/AddPet';
import Friends from './components/Friends/Friends';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import News from './components/News/News';
import Notices from './components/Notices/Notices';
import Registration from './components/Registration/Registration';
import Error from './components/Error/Error';

function App() {


  return (
    <>
    <Home/>
    <Login/>
    <Registration/>
    <AddPet/>
    <News/>
    <Notices/>
    <Friends/>
    <Error/>
    </>
  )
}

export default App
