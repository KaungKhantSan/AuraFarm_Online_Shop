import { Send } from "lucide-react"

const Footer = () => {
  return (
    <main>
        <footer className='max-w-6xl mt-16 mb-4 mx-auto flex items-center justify-between'>
        <div>
            <h2 className="font-bold">KAUNG</h2>
        </div>
        <div className="flex gap-4">
            <Send />
            <p className="text-gray-400">Telegram</p>
        </div>
    </footer>
    </main>
  )
}

export default Footer