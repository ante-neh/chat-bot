import Image from "next/image";
import { FC } from "react";
import { chatLandingProps } from "@/types/chat";

const ChatLanding: FC<chatLandingProps> = ({ handleInitial }) => {
  const handleOnClick = (endpoint: string) => {
    handleInitial(true, "Hello", false);
    localStorage.setItem('whichEndpoint', endpoint);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 px-6 w-full">
      <div className="relative h-40 w-40">
        <Image
          src="/images/AI-assistant/landingChat.svg"
          layout="fill"
          alt="landing page chat icon"
          className="object-cover"
        />
      </div>
      <div>
        <p className="text-base font-normal text-667085 text-center">
          Hey, I am your assistant. Tell me what you are looking for today, and I will help you find the perfect match!
        </p>
      </div>
      <div className="flex gap-2 flex-wrap justify-center">
        <button
          className="py-1 px-3 border-0.5 border-blue-600 text-blue-600 rounded-lg outline-none w-32 hover:bg-blue-500 hover:text-white"
          onClick={() => handleOnClick("list")}
        >
          List
        </button>
        <button
          className="py-1 px-3 border-0.5 border-blue-600 text-blue-600 rounded-lg outline-none w-32 hover:bg-blue-500 hover:text-white"
          onClick={() => handleOnClick("explore")}
        >
          Explore
        </button>
      </div>
      {/* <SearchCard rate = {5} location={"Addis Ababa"} title ="Toyota Yaris" price={"2000000"} imageUrl="/product/productPage/location.svg" provider="Individual" id="3"/> */}
    </div>
  );
};

export default ChatLanding;
