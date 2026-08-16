import { Menu } from "lucide-react";

const categories = [
    "Man",
    "Woman",
    "Sports",
    "Formal",
    "Gym",
    "Prom",
    "SwimSuit"
];

const SecondaryBar = () => {
  return (
    <main className='py-6'>
        <div className='max-w-6xl mx-auto flex items-center gap-6'>
            <div className="flex items-center gap-2">
                <Menu/>
                <p className='text-lg font-semibold'>Categories</p>
            </div> 
            <div className="flex gap-6">
                {categories.map((category,index)=><p key={index}>{category}</p>)}
            </div>
        </div>
        
    </main>
  )
}

export default SecondaryBar