import { FC } from "react"

interface summaryFieldProps{
    title:string,
    content:string
}
const SummaryField : FC<summaryFieldProps>  = ({title, content}) => {
  return (
    <div className="grid grid-cols-3 w-full gap-2">
        <div className="flex flex-col">
            <p className="text-md text-customGray font-noraml w-max">{title}:</p>
            <p className="brounded-sm w-max  text-md text-customGray font-bold overflow-hidden outline-none"> {content} </p>
        </div>
    </div>
  )
}

export default SummaryField