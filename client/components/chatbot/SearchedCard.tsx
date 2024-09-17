import Image from "next/image"
import Link from "next/link"
import { FC } from "react"
import { useSelector } from "react-redux"
import { RootState } from "@/app/GlobalRedux/store"
import { searchedCardProps } from "@/types/chat"
import { formatPrice } from "@/utils/chatbot"
import Rating from "../service/Rating"

const SearchedCard:FC<searchedCardProps> = ({imageUrl}) => {
  const summary = useSelector((state:RootState)=>state.chatSlice.summary)

  
  return (
        <Link href="/" className="w-full flex relative h-34 gap-2 bg-slate-100 rounded-lg shadow-lg pr-2">
            <div className="flex relative h-32 w-44">
                <Image src={imageUrl} layout="fill" alt="car picture" className="object-cover rounded-l-lg"/>
            </div>

            <div className="flex flex-col gap-2 w-full py-2">
                <div className="w-full flex justify-between items-center">
                    <p className="flex gap-2 text-sm text-slate-400">
                        <Image src="/images/productPage/location.svg" width={10} height={10} alt="location icon"/>
                        {summary.location}
                    </p>
                    <button>
                        <Image src="/images/AI-assistant/favorite.svg" width={20} height={20} alt="favorite icon"/> 
                    </button>
                </div>

                <p>{summary.model}</p>

                <div className="w-full flex justify-between">
                    <p className="text-blue-600">{formatPrice(summary.price)}</p>
                    <p className="text-blue-600 border-0.5 border-blue-600 rounded-lg p-[1px]">Individual</p>
                </div>
                {/* {
                    rate && <Rating rate={3}/>
                } */}
                
            </div>
        </Link>
  )
}

export default SearchedCard