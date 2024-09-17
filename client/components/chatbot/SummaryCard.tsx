import { useRouter } from "next/navigation"
import { FC, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setPublish, setShowModal, setProceed } from "@/app/GlobalRedux/Features/chat/chatSlice"
import { RootState } from "@/app/GlobalRedux/store"
import { carSummaryProps } from "@/types/chat"
import SummaryField from "./SummaryField"

const SummaryCard : FC<carSummaryProps> = ({ onProceed, product }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [isAuth, setIsAuth ] = useState(false)
  const chatSlice = useSelector((state:RootState)=>state.chatSlice)
  const isProceed = chatSlice.isProceed
  const isPublish = chatSlice.isPublish

  useEffect(()=>{
    const token = localStorage.getItem("toke")
    if(token){
      setIsAuth(true)
    }
  })

  const handlePublish = ()=>{
        dispatch(setPublish(false))
        if (!isAuth) router.push('/auth/login')
  }

  const handleProceed = ()=>{
    dispatch(setProceed(false))
    dispatch(setPublish(true))

  }

  const handleEditClick = () =>dispatch(setShowModal(true));
  
  return (
    <div className="flex flex-col gap-2 h-full">
        <div className="bg-slate-100 flex flex-col p-4 rounded-lg gap-2">
            <div>
                <p className="font-bold text-otpBlack">
                  Car Summary
                </p>
            </div>

            <div>
                <p className="w-full h-max resize-none text-md font-normal text-placeholder-color">
                  {product.description}
                </p>
            </div>

            <div className="grid grid-cols-3 w-full gap-2">
              <SummaryField title="Make" content={product.title}/>
              <SummaryField title="Make" content={product.description}/>
            </div>
        </div>

        <div className="flex flex-col gap-1">
            <button onClick = {handleEditClick} className={`${(isPublish || isProceed)? 'block':'hidden'} text-center px-2 py-0.5 rounded-lg w-full text-lg text-blue-600 bg-white border-blue-600 border-0.5 hover:bg-blue-600 hover:text-white hover:border-0.5 hover:border-blue-600`}>Edit Listing </button>
            <button onClick = {handlePublish} className={`${!isPublish?'hidden':'block'} text-center px-2 py-0.5 rounded-lg w-full text-lg text-white bg-blue-600 border-0.5 hover:text-blue-600 hover:bg-white hover:border-blue-600`}> Publish </button>
            <button onClick = {handleProceed} className={`${!isProceed?'hidden':"block"} text-center px-2 py-0.5 rounded-lg w-full text-lg text-white bg-blue-600 border-0.5 hover:text-blue-600 hover:bg-white hover:border-blue-600`}> Proceed </button>
        </div>
    </div>
        
  )
}

export default SummaryCard