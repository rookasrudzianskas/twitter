import React, {useEffect, useState} from 'react';
import {Tweet, Comment} from '../typings';
import TimeAgo from 'react-timeago'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CameraswitchIcon from '@mui/icons-material/Cameraswitch';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {fetchComments} from "../utils/fetchComments";

interface Props {
    tweet: Tweet
}

const Tweet = ({tweet}: Props) => {

    const [comments, setComments] = useState<Comment[]>([]);
    const refreshComments = async () => {
        // console.log('This is the main id 🎫', tweet._id)
        const comments: Comment[] = await fetchComments(tweet._id);
        // @ts-ignore
        setComments(comments.comments);
    }

    useEffect(() => {
        refreshComments();
    }, []);

    console.log(comments);

    return (
        <div className="flex flex-col space-x-3 border-y p-5 border-gray-">
            <div className="flex space-x-3">
                <img src={tweet.profileImg} className="w-10 h-10 rounded-full object-cover" alt=""/>

                <div>
                    <div className="flex items-center space-x-1">
                        <p className="mr-1 font-bold">{tweet.username}</p>
                        <p className="hidden text-sm text-gray-500 sm:inline">@{tweet.username.replace(/\s+/g, '').toLowerCase()} • </p>

                        <TimeAgo date={tweet._createdAt} className="text-sm text-gray-500" />
                    </div>

                    <p className="pt-1">{tweet.text}</p>
                    {tweet.image && (
                        <img src={tweet.image} className="m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm" alt=""/>
                    )}
                </div>
            </div>

            <div className="mt-5 flex justify-between">
                <div className="flex cursor-pointer space-x-3 items-center text-gray-400">
                    <ChatBubbleOutlineIcon className="w-5 h-5" />
                    <p className="">{comments.length}</p>
                </div>
                <div className="flex cursor-pointer space-x-3 items-center text-gray-400">
                    <FavoriteBorderIcon className="w-5 h-5" />
                </div>
                <div className="flex cursor-pointer space-x-3 items-center text-gray-400">
                    <CameraswitchIcon className="w-5 h-5" />
                </div>
                <div className="flex cursor-pointer space-x-3 items-center text-gray-400">
                    <CloudUploadIcon className="w-5 h-5" />
                </div>
            </div>

            {comments?.length > 0 && (
                <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5">
                    {comments.map(comment => (
                        <div key={comment._id} className="relative flex space-x-2">
                            <hr className="absolute left-5 top-10 h-8 border-x border-twitter/30"/>
                            <img src={comment.profileImg} className="mt-2 h-7 w-7 rounded-full object-cover" alt=""/>
                            <div className="">
                                <div className="flex items-center space-x-1">
                                    <p className="mr-1 font-bold">{comment.username}</p>
                                    <p className="hidden text-sm text-gray-500 lg:inline">@{comment.username.replace(/\s+/g, '').toLowerCase()} •</p>
                                    <TimeAgo className="text-sm text-gray-500" date={comment._createdAt} />
                                </div>
                                <p>{comment.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
};

export default Tweet;
