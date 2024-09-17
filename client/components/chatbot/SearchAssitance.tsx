import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useImageSearchMutation, useSearchAssistanceMutation, useSendChatRequestMutation } from "@/app/GlobalRedux/Features/chat/chatAPI";
// import { setEndpoint, setImage, setImageParam, setProceed, setShowModal } from "@/app/GlobalRedux/Features/chat/chatSlice";
// import { RootState } from "@/app/GlobalRedux/store";
import { getCurrentTime } from "@/utils/chatbot";
import BotMessage from "./BotMessage";
import ChatLanding from "./ChatLanding";
import EditingOption from "./EditingOption";
import Modal from "./Modal";
import UserMessage from "./UserMessage";
import Cookies from 'js-cookie' 
import { v4 as uuid} from 'uuid'
import { product } from "@/types/chat";
import { ServiceData } from "@/types/service";

type toggleAIType = (state: boolean) => void;

type Message = {
  text: string | string[];
  time: string;
  sender: string;
  products:product[];
  services:ServiceData[];
  // businesses:any[]
};


const SearchAssistance = ({ toggleAI, showAI }: { toggleAI: toggleAIType; showAI: boolean }) => {
  const dispatch = useDispatch();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [textAreaHeight, setTextAreaHeight] = useState("48");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [initial, setInitial] = useState<boolean>(false);
  const [sendRequest, { isLoading }] = useSendChatRequestMutation();
  const [sendSearchQuery] = useSearchAssistanceMutation();
  const [lastBotMessageIndex, setLastBotMessageIndex] = useState<number>(-1);
  const [whichEndpoint, setWhichEndpoint] = useState<string | null>()
  const chatSlice = useSelector((state : RootState)=>state.chatSlice);
  const jsonString = chatSlice.jsonString;
  const showModal = chatSlice.showModal;
  let responseMessage : Message = {text:'', time:'', sender:'bot',products:[],services:[]}
  let firstImageUrl = ''
  let userId = Cookies.get("userId")
  const[imageSearch] = useImageSearchMutation()


  useEffect(()=>{
    setWhichEndpoint(localStorage.getItem("whichEndpoint"))
  }, [])

  if(!userId){
    userId = uuid()
    Cookies.set("userId", userId, {expires:365})
  }
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages, lastBotMessageIndex]); // Add `lastBotMessageIndex` to dependencies
  

  // useEffect(() => {
  //   if (messagesEndRef.current) {
  //     messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  //   }
  // }, [messages]);

  const handleTextAreaChange = () => {
    if (textAreaRef.current) {
      const currentHeight = textAreaRef.current.scrollHeight;

      if (currentHeight > parseInt(textAreaHeight)) {
        setTextAreaHeight("auto");
      }

      const maxHeight = 100;
      const scrollHeight = textAreaRef.current.scrollHeight;

      if (scrollHeight > maxHeight) {
        textAreaRef.current.style.height = `${maxHeight}px`;
        setIsScrollable(true);
      } else {
        textAreaRef.current.style.height = `${scrollHeight}px`;
        setIsScrollable(false);
      }

      if (textAreaRef.current.value === "") {
        textAreaRef.current.style.height = "48px";
      }
      setMessage(textAreaRef.current.value);
    }
  };

  const handleSendMessage = async () => {
    if (message.trim() !== "") {
      const newMessage = { text: message, time: getCurrentTime(), sender: "user", products:[], services:[], businesses:[] };
      setMessages([...messages, newMessage]);
      setMessage("");

      if (textAreaRef.current) {
        textAreaRef.current.value = "";
        textAreaRef.current.style.height = "48px";
      }

      const placeholderBotMessage = { text: "", time: getCurrentTime(), sender: "bot", isLoading: true, products:[], services:[], businesses:[] };
      setMessages((prevMessages) => [...prevMessages, placeholderBotMessage]);
      setLastBotMessageIndex(messages.length); 
      
      try {
        responseMessage = {text:"", time:"", sender:"bot", products:[], services:[]}
        if (whichEndpoint == "list"){
          console.log("list from listing 99999999999999999999999999999999999999 handleMessage")
          const response = await sendRequest({ userQuestion: message }).unwrap();
          responseMessage = { text: response.value.text, time: getCurrentTime(), sender: "bot", products:response.value.products?Array(response.value.products) : [], services:response.value.services?Array(response.value.services) : [],};
         
        }else{
          console.log("from search 9999999999999999999999999999999999999999999 handleMessage")
          const result = await sendSearchQuery({ message: message, cookieId: userId }).unwrap();
          console.log("result",result)
          responseMessage = {
            text: result.response,
            time: getCurrentTime(),
            sender: "bot",
            products:result.products,
            services:result.services,
            //businesses:result.businesses 
          };
          
        }
        
        setMessages((prevMessages) =>
          prevMessages.map((msg, index) =>
            index === prevMessages.length - 1 ? responseMessage : msg
          )
        );

        
      } catch (err) {
        setMessages((prevMessages) =>
          prevMessages.map((msg, index) =>
            index === prevMessages.length - 1 ? { ...msg, isLoading: false, error: "Failed to get response" } : msg
          )
        );
      }
    }
  };

  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleClick = () => {
    toggleAI(!showAI);
  };

  
  const handleProceed = () => {
    const botMessage = "Please upload images of the product.";
    const newBotMessage = {
      text: botMessage,
      time: getCurrentTime(),
      sender: "bot",
      products:[],
      services:[],
      businesses:[]
    };
    dispatch(setProceed(true))
    setMessages((prevMessages) => [...prevMessages, newBotMessage]);
  };

  
  
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      const uploadedImages = filesArray.map((file) =>
        URL.createObjectURL(file)
      );
      
      firstImageUrl = uploadedImages[0]
      const newMessage = {
        text: uploadedImages.length === 1 ? uploadedImages[0] : uploadedImages,
        time: getCurrentTime(),
        sender: "user",
        products:[],
        services:[],
        // businesses:[]
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      
      if (uploadedImages.length >= 4) {
        const botMessage = jsonString
        const newBotMessage = {
          text: botMessage,
          time: getCurrentTime(),
          sender: "bot",
          products:[],
          services:[],
          businesses:[]
        };
        setMessages((prevMessages) => [...prevMessages, newBotMessage]);
      }
      
      filesArray.forEach(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "BazarCloudinary");
        
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dd092znjl/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        
        const data = await response.json();
        dispatch(setImage(data.secure_url));
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.text === uploadedImages
              ? { ...msg, text: data.secure_url }
              : msg
            )
        );

        setTimeout(() => {
          if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
          }
        }, 100);
      });
    }
  };

  const handleInitial = async (status: boolean, initialMessage: string, endPoint:boolean ) => {
    setInitial(status);
    if (initialMessage) {
      const newMessage = { text: initialMessage, time: getCurrentTime(), sender: 'user', products:[], services:[], businesses:[] };
      setMessages([...messages, newMessage]);
      
      const placeholderBotMessage = { text: "", time: getCurrentTime(), sender: "bot", isLoading: true, products:[], services:[], businesses:[]};
      setMessages((prevMessages) => [...prevMessages, placeholderBotMessage]);
      
      
      try {
        responseMessage = {text:'hello there', time:'12', sender:'bot', products:[], services:[]}
        if (whichEndpoint == "list"){
          console.log("from listing 33333333333333333333333333333333333333333333333 handleInt")
          const response = await sendRequest({ userQuestion: initialMessage }).unwrap();
          responseMessage = { text: response.value.text, time: getCurrentTime(), sender: "bot", products:response.value.products? Array(response.value.products) : [], services:response.value.services?Array(response.value.services) : [] };
          
        }else{
          console.log("from search 3333333333333333333333333333333333333333333333 handleInti")
          userId = Cookies.get("userId")
          if(!userId){
            userId = uuid()
            Cookies.set("userId", userId, {expires:365})
          }
          
          const result = await sendSearchQuery({ message: initialMessage, cookieId: userId }).unwrap();
          responseMessage = {
            text: result.response,
            time: getCurrentTime(),
            sender: "bot",
            products:result.products,
            services:result.services,
                // businesses:result.businesses,        
              };
              
            }
            
            setMessages((prevMessages) =>
              prevMessages.map((msg, index) =>
                index === prevMessages.length - 1 ? responseMessage : msg
          )
        );
        
        
      } catch (err) {
        setMessages((prevMessages) =>
          prevMessages.map((msg, index) =>
            index === prevMessages.length - 1 ? { ...msg, isLoading: false, error: "Failed to get response" } : msg
      )
    );
  }
    }
  };
  

  
  const handleImageSearch = (event: React.ChangeEvent<HTMLInputElement>)=>{
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      const uploadedImages = filesArray.map((file) =>
        URL.createObjectURL(file)
    );
    
    const newMessage = {
      text: uploadedImages.length === 1 ? uploadedImages[0] : uploadedImages,
      time: getCurrentTime(),
      sender: "user",
      products:[],
      services:[],
        // businesses:[]
      };
      const placeholderBotMessage = { text: "", time: getCurrentTime(), sender: "bot", isLoading: true, products:[], services:[], businesses:[] };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessages((prevMessages) => [...prevMessages, placeholderBotMessage]);
      setLastBotMessageIndex(messages.length); 
      
      
      filesArray.forEach(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "BazarCloudinary");
        
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dd092znjl/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        


        
        const data = await response.json()
        
        try {
          const searchResult = await imageSearch(data.secure_url).unwrap();
          dispatch(setImageParam(data.secure_url))
          responseMessage = {
            ...responseMessage,
            text: "Here are the search results",
            products: searchResult.products,
            services: searchResult.services,
          };
  
          setMessages((prevMessages) =>
            prevMessages.map((msg, index) =>
              index === prevMessages.length - 1 ? responseMessage : msg
        )
      );
        } catch (error) {
          setMessages((prevMessages) =>
            prevMessages.map((msg, index) =>
              index === prevMessages.length - 1
          ? { ...msg, isLoading: false, text: "Failed to get response" }
          : msg
        )
      );
    }
  });
}
}




const handleOnClose = ()=> dispatch(setShowModal(false))

const handleBackClick = () => {
    dispatch(setEndpoint(!chatSlice.endpoint))
    setInitial(false);
    setMessages([]);
    dispatch(setProceed(false));
    localStorage.setItem("whichEndpoint", "list")
  };

  return (
    <div className="flex flex-col gap-4 fixed bottom-4 right-4 z-50 h-[80vh] w-[23.4vw] bg-white rounded-2xl shadow-2xl p-4">
      <Modal onClose={handleOnClose} show={showModal} children={<EditingOption/>} />
      <div className="flex flex-col w-full gap-6">
        <div className="flex justify-between items-center">
          {initial && (
            <button onClick={handleBackClick}>
              <Image src="/images/AI-assistant/Back.svg" width={20} height={20} alt="back icon" />
            </button>
          )}

          <p className="text-667085 font-normal text-lg">Bazar Chat</p>
          <div className="flex items-center">
            <button onClick={() => toggleAI(!showAI)}>
              <Image src="/images/productPage/cancelIcon.svg" width={35} height={35} alt="close icon" />
            </button>
          </div>
        </div>
        <div className="w-full h-0.5 bg-slate-200"></div>
        <div className="flex items-center gap-4">
          <Image src="/images/AI-assistant/Avatar.svg" width={50} height={50} alt="chat icon" />
          <div className="flex flex-col">
            <p className="text-dataListedColor font-normal text-lg">Chatbot</p>
            <p className="text-667085 font-noraml text-md">Supper Agent</p>
          </div>
        </div>
      </div>

      <div className=" h-full w-full flex flex-col overflow-hidden">
        <div ref={messagesEndRef} className="max-h-[60vh] w-full flex flex-col gap-2 overflow-y-auto flex-grow"> 
          {initial ? (
            messages.map((msg, index) =>
              msg.sender === "user" ? (
                <UserMessage key={index} message={msg.text} time={msg.time} products={msg.products} services={msg.services} />
              ) : (
                <BotMessage
                  key = {index}
                  message = {msg.text}
                  time = {msg.time}
                  isLoading = {index === lastBotMessageIndex && isLoading}
                  onProceed = {handleProceed}
                  imageUrl = {firstImageUrl}
                  products = {msg.products}
                  services = {msg.services}
                  // businesses={msg.businesses}
                />
              )
            )
          ) : (
            <ChatLanding handleInitial={handleInitial} />
          )}
        
        </div>
        {initial && (
          <div className="w-full relative flex bottom-0 mt-2 flex-grow-0">
            <textarea
              className={`w-full resize-none border border-slate-300 outline-none rounded-lg p-3 h-12 pr-20 ${
                isScrollable ? "overflow-y-auto" : "overflow-hidden"
              }`}
              onChange={handleTextAreaChange}
              ref={textAreaRef}
              onKeyDown={handleKeyDown}
              style={{ maxHeight: "200px" }}
              placeholder="Write a message"
            />
            <div className="flex gap-2 items-center absolute right-4 bottom-2">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={whichEndpoint == "list" ? handleImageChange : handleImageSearch}
                style={{ display: "none" }}
                id="fileInput"
              />
              <label htmlFor="fileInput">
                <Image
                  src="/images/productPage/uploadFile.svg"
                  width={30}
                  height={30}
                  alt="upload file icon"
                />
              </label>

              <button onClick={handleSendMessage}>
                <Image src="/images/productPage/sendMessage.svg" width={30} height={30} alt="send message" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAssistance;
