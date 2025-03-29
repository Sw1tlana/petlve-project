import './App.scss';
import AddPet from './components/AddPet/AddPet';
import Friends from './components/Friends/Friends';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import News from './components/News/News';
import Notices from './components/Notices/Notices';
import Registration from './components/Registration/Registration';
import Error from './components/Error/Error';
import Profile from './components/Profile/Profile';
import Layout from './components/Layout/Layout';


function App() {


  return (
    <>
    <Layout>
    <Home/>
    <Login/>
    <Registration/>
    <AddPet/>
    <News/>
    <Notices/>
    <Friends/>
    <Error/>
    <Profile/>
    </Layout>
    </>
  )
}

export default App
