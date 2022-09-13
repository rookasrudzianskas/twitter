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
import { useSession, signIn, signOut } from "next-auth/react"

const Sidebar = () => {
    const {data: session} = useSession();
    return (
        <div className="flex flex-col col-span-2 items-center px-4 md:items-start">
            <img src="https://links.papareact.com/drq" className="m-3 h-10 w-10" alt=""/>
            <SidebarRow Icon={HomeIcon} title="Home" />
            <SidebarRow Icon={HashtagIcon} title="Explore" />
            <SidebarRow Icon={BellIcon} title="Notifications" />
            <SidebarRow Icon={HomeIcon} title="Messages" />
            <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
            <SidebarRow Icon={MapIcon} title="Lists" />
            <SidebarRow onClick={session ? signOut : signIn} Icon={UserIcon} title={session ? 'Sign Out' : "Sign In"} />
            <SidebarRow Icon={MapIcon} title="More" />
        </div>
    );
};

export default Sidebar;
