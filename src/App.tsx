import './App.scss';
import AddPet from './components/AddPet/AddPet';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import News from './components/News/News';
import Notices from './components/Notices/Notices';
import Registration from './components/Registration/Registration';

function App() {


  return (
    <>
    <Home/>
    <Login/>
    <Registration/>
    <AddPet/>
    <News/>
    <Notices/>
    </>
  )
}

export default App
