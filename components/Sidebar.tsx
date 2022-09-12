import React from 'react';
import {
    BellIcon,
    HashtagIcon,
    BookmarkIcon,
    MapIcon,
    UserIcon,
    HomeIcon,
} from "@heroicons/react/20/solid";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CollectionsIcon from '@mui/icons-material/Collections';
import SidebarRow from "./SidebarRow";

const Sidebar = () => {
    return (
        <div>
            <img src="https://links.papareact.com/drq" className="h-10 w-10" alt=""/>
            <SidebarRow Icon={HomeIcon} title="Home" />
            <SidebarRow Icon={HashtagIcon} title="Explore" />
            <SidebarRow Icon={BellIcon} title="Notifications" />
            <SidebarRow Icon={HomeIcon} title="Messages" />
            <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
            <SidebarRow Icon={MapIcon} title="Lists" />
        </div>
    );
};

export default Sidebar;
