import { ShoppingBag, User } from 'lucide-react'


interface toggleProps {
  toggleCart() : void;
}

const TopBar = ({toggleCart}:toggleProps) => {
  return (
    <main className='text-white bg-black py-6'>
        <div className='max-w-6xl mx-auto flex items-center justify-between'>
            <h2 className='font-bold text-2xl'>Aura Farming</h2>
        <div className='flex gap-2'>
            <ShoppingBag onClick={toggleCart}/>
            <User/>
        </div>
        </div>
        
    </main>
  )
}

export default TopBar