import { Outlet } from 'react-router'
import NavBar from '../common/NavBar'
import SearchBar from '../common/SearchBar'
import SecondaryBar from '../components/SecondaryBar'
import Footer from '../common/Footer'

const Main = () => {
  return (
    <section className='bg-gray-100'>
        <NavBar/>
        <SearchBar/>
        <SecondaryBar/>
        <main className='max-w-6xl mx-auto'>
        <Outlet/>
        </main>
        <Footer/>
    </section>
    
  )
}

export default Main