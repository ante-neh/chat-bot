import { FC } from "react"
import { chatButtonInterafce } from "@/types/chat"

const ChatButton : FC<chatButtonInterafce> = ({title, handleClick, textColor, backgroundColor, borderColor, hoverBg ,hoverText, hoverBorder}) => {

  return (
    <button onClick={handleClick} className={`px-2 py-0.5 rounded-lg w-full text-lg ${textColor} ${backgroundColor} ${borderColor} border-0.5 hover:${hoverBg} hover:${hoverText} hover:border-0.5 hover:${hoverBorder}`}>
        {title}
    </button>
  )
}

export default ChatButton