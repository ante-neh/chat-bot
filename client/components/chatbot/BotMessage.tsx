import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { messageProps } from "@/types/chat";
import SearchCard from "./SearchCard";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";

const BotMessage: FC<messageProps> = ({ message, time, onProceed, products, services }) => {
   const router = useRouter()
   const[whichEndpoint, setWhichEndPoint] = useState<string | null>(null)
   const imageUrl = useSelector((state:RootState)=>state.chatSlice.imageParam) 

   useEffect(()=>{
    setWhichEndPoint(localStorage.getItem("whichEndponit"))
   },[])


   const handleMore = ()=>{
    router.push(`/search?q=${encodeURIComponent(imageUrl)}&type=products`);
   }

  return (
    <div className={`p-4 self-start flex flex-col gap-2 overflow-hidden flex-shrink-0 ${(products.length > 0 || services.length > 0 ) ? 'max-w-full' : 'max-w-72'} `}>
       
      <div className="flex gap-2">
        <Image src="/images/productPage/searchAssistance.svg" width={15} height={15} alt="bot icon" />
        <p className="text-sm font-normal text-909098">Live chat <span>{time}</span></p>
      </div>
      <div className="">
        {message ? (
          <div className="flex flex-col gap-2 rounded-lg">
            <p className="text-909098 font-normal bg-slate-100 border-slate-200 text-md rounded-lg px-4 py-2 overflow-hidden break-words">
              {message}
            </p>
            {(products && products.length > 0) && (
              <div className="flex flex-col gap-3 rounded-lg border-2 border-slate-200 p-2">
                {products?.map((product) => (
                  <SearchCard key={product.id} id={product.id} title={product.title} imageUrl ={product.images[0]} rate={null} price={String(product.price)} provider={product.provider == "1" ? "Business" : "Individual"} location={`${product.address.city} ${" "} ${product.address.street}` }/>
                ))}
                <button className="text-primary font-light text-sm w-max self-end" onClick={handleMore}>More</button>
              </div>
            )}
            {(services && services.length > 0 ) && (
              <div className="flex flex-col gap-3 rounded-lg border-2 border-slate-200 p-2">
                {services?.map((service) => (
                   <SearchCard key={service.id} id={service.id} title={service.serviceName} imageUrl={service.images[0]} rate={service.rating} price={String(service.price)} provider={String(service.provider)} location={`${service.address.city} ${" "} ${service.address.street}`} />
                ))}
              </div>
            )}
            {
            // (businesses.length > 0) && (
            //   <div className="flex flex-col gap-3 rounded-lg border-2 border-slate-200 p-2">
            //     {businesses?.map((business, index) => (
            //       <SearchCard
            //         key={index}
            //         location="Addis ABaba"
            //         title="Car"
            //         provider="Business"
            //         price="2000000"
            //         imageUrl="/"
            //       />
            //     ))}
            //   </div>
            // )
            
            }
          </div>) : (
          <div className="flex gap-1">
            <div className="animate-bounce-slow h-2 w-2 bg-slate-300 rounded-full"></div>
            <div className="animate-bounce-medium h-2 w-2 bg-slate-300 rounded-full"></div>
            <div className="animate-bounce-fast h-2 w-2 bg-slate-300 rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BotMessage;
