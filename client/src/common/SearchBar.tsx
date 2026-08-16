import { Search } from 'lucide-react'

const SearchBar = () => {
  return (
    <main className='mt-4 py-2'>
    <div className='w-96 relative max-w-6xl mx-auto flex items-center'>
        <form>
            <input type="text" className='bg-white focus:outline-0 py-2 ps-10 text-black text-sm w-full rounded-full shadow'/>
            <Search className='absolute top-1.5 left-2 text-black'/>
        </form>
    </div>
    </main>
  )
}

export default SearchBar