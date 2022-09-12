import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';

const Widgets = () => {
    return (
        <div className="px-2 mt-2 hidden lg:inline lg:col-span-2">
            <div className="flex items-center space-x-2 bg-gray-100 p-3 rounded-full mt-2">
                <SearchIcon className="w-5 h-5 text-gray-400" />
                <input className="bg-transparent outline-none flex-1 " type="text" placeholder="Search Twitter"/>
            </div>

            <TwitterTimelineEmbed
                sourceType="profile"
                screenName="elonmusk"
                options={{height: 1000}}
            />
        </div>
    );
};

export default Widgets;
