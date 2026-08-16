import { Star } from "lucide-react"

interface ratingConverterProps {
    count : number
}

const RatingConverter = ({count}:ratingConverterProps) => {
  return (
    <div className="flex items-center gap-1 mb-2">
        {Array.from({length : count}).map((_,i) => 
    (
        <Star className="fill-yellow-400 text-yellow-400 w-4 h-4 " key={i}/>
    ))}</div>
  )
}

export default RatingConverter