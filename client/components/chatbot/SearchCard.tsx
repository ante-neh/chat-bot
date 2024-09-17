import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { searchCardProps } from "@/types/chat";
import Rating from "../service/Rating";

const SearchCard: FC<searchCardProps> = ({ rate, location, title, price, imageUrl, provider, id }) => {
  
  return (
    <Link href={`/products/${id}`} className="w-full flex relative h-34 gap-2 bg-slate-100 rounded-lg pr-2">
      <div className="h-34 relative rounded-lg w-44">
        <Image src={imageUrl} layout="fill" className="object-cover rounded-l-lg" alt={''} />
      </div>
      <div className="flex flex-col w-full p-2 gap-2">
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-2">
            <Image src="/images/productPage/location.svg" width={15} height={15} alt="location icon" />
            <p className="text-sm text-customGray max-w-32 truncate">{location}</p>
          </div>
        </div>
        <p className="max-w-32 truncate text-lg font-normal text-productTypeColor">{title}</p>
        <div className="w-full flex justify-between items-center">
          <p className="text-blue-500 max-w-24 truncate">{`ETB ${price}`}</p>
          <div className={`border-0.5 rounded-lg px-2 py-0.5 ${provider == "Individual"?"text-blue-600 border-blue-600":"text-yellow-600 border-yellow-600"}`}>{provider}</div>
        </div>
        {
          rate && <div> <Rating rate={rate}/></div>
        }
      </div>
    </Link>
  );
};

export default SearchCard;
