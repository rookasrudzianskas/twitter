import React, {useState} from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import TweetBox from "./TweetBox";
import {Tweet} from "../typings";
import TweetComponent from './Tweet';
import {fetchTweets} from "../utils/fetchTweets";
import toast from "react-hot-toast";

interface Props {
    tweets: Tweet[]
}

const Feed = ({tweets: tweetsProp}: Props) => {
    const [tweets, setTweets] = useState<Tweet[]>(tweetsProp);
    const handleRefresh = async  () => {
        // @ts-ignore
        const refreshToast = toast.loading('Refreshing tweets...');
        const tweets = await fetchTweets();
        setTweets(tweets);
        toast.success('Tweets refreshed!', {id: refreshToast});
    }
    return (
        <div className="col-span-7 lg:col-span-5 border-x">
          <div className="flex items-center justify-between">
              <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
              <RefreshIcon onClick={handleRefresh} className="h-8 w-8 cursor-pointer text-twitter mt-5 mr-5 transition-all duration-500 ease-out hover:rotate-180 active:scale-125 duration-500" />
          </div>

            <div>
                <TweetBox />
            </div>

            <div>
                {tweets.map(tweet => (
                    <TweetComponent key={tweet._id} tweet={tweet} />
                ))}
            </div>

        </div>
    );
};

export default Feed;
