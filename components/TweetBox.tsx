import React, {useState} from 'react';
import {
    CalendarIcon,
} from '@heroicons/react/20/solid';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SearchIcon from '@mui/icons-material/Search';
import {useSession} from "next-auth/react";

const TweetBox = () => {
    const [input, setInput] = useState<string>('');
    const {data: session} = useSession();
    const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false);

    return (
        <div className="flex space-x-2 p-5">
            <img src={session ? session?.user?.image : 'https://yt3.ggpht.com/-CDERLAq3BNY7murpWzg3z9Qde3c9ZrRx59LlLEb1UzKDKZ_ckpTAOlYVQ5TJo9XTgJl2kh9bw=s900-c-k-c0x00ffffff-no-rj'} className="h-14 w-14 rounded-full object-cover mt-4" alt=""/>
            <div className="flex flex-1 items-center pl-2">
                <form className="flex flex-1 flex-col">
                    <input value={input} onChange={(e) => setInput(e.target.value)} type="text" className="h-24 w-full text-xl outline-none placeholder:text-xl" placeholder="What's happening?"/>
                    <div className="flex items-center">
                        <div className="flex space-x-2 text-twitter flex-1">
                            <PhotoCameraIcon onClick={() => setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)} className="h-5 w-5 hover:cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
                            <SearchIcon className="w-5 h-5" />
                            <SentimentVerySatisfiedIcon className="w-5 h-5" />
                            <CalendarIcon className="w-5 h-5" />
                            <LocationOnIcon className="w-5 h-5" />
                        </div>

                        <button disabled={!input || !session} className="bg-twitter px-5 py-2 font-bold text-white rounded-full disabled:opacity-40">Tweet</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TweetBox;
