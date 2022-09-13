import React, {Dispatch, SetStateAction, useRef, useState} from 'react';
import {
    CalendarIcon,
} from '@heroicons/react/20/solid';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SearchIcon from '@mui/icons-material/Search';
import {useSession} from "next-auth/react";
import {Tweet, TweetBody} from "../typings";
import {fetchTweets} from "../utils/fetchTweets";
import toast from "react-hot-toast";

interface Props {
    setTweets: Dispatch<SetStateAction<Tweet[]>>
}

const TweetBox = ({setTweets}: Props) => {
    const [input, setInput] = useState<string>('');
    const {data: session} = useSession();
    const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState('');

    const addImageToTweet = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if(!imageInputRef.current?.value) return;
        setImage(imageInputRef.current?.value);
        imageInputRef.current.value = '';
        setImageUrlBoxIsOpen(false);
    }

    const postTweet = async () => {
        const tweetInfo: TweetBody = {
            text: input,
            username: session?.user?.name || "Unknown User",
            profileImg: session?.user?.image || "https://links.papareact.com/gll",
            image: image,
        }

        const result = await fetch(`/api/addTweet`, {
            body: JSON.stringify(tweetInfo),
            method: 'POST',
        });

        const json = await result.json();

        const newTweets = await fetchTweets();
        setTweets(newTweets);

        toast('Tweet added!', {
            icon: '👍',
        })

        return json;

    }
    // @ts-ignore
    const handleSubmit = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault();
        if(!input) return;

        postTweet();
        setInput('');
        setImage('');
        setImageUrlBoxIsOpen(false);
    }

    return (
        <div className="flex space-x-2 p-5">
            {/* @ts-ignore */}
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

                        <button onClick={handleSubmit} disabled={!input || !session} className="bg-twitter px-5 py-2 font-bold text-white rounded-full disabled:opacity-40">Tweet</button>
                    </div>
                    {imageUrlBoxIsOpen && (
                        <form className="mt-5 flex rounded-lg bg-twitter/80 py-4 px-4" action="">
                            <input ref={imageInputRef} placeholder="Enter image Url" type="text" className="flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white"/>
                            <button onClick={addImageToTweet} type="submit" className="font-bold text-white">Add Image</button>
                        </form>
                    )}

                    {image && (
                        <img src={image} className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg" alt=""/>
                    )}

                </form>
            </div>
        </div>
    );
};

export default TweetBox;
