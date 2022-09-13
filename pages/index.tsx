import type {GetServerSideProps, NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Widgets from "../components/Widgets";
import {fetchTweets} from "../utils/fetchTweets";
import {Tweet} from "../typings";

interface Props {
    tweets: Tweet[]
}

// @ts-ignore
const Home: NextPage = ({tweets}: Props) => {
    console.log(tweets);
  return (
    <div className="lg:max-w-6xl mx-auto max-h-screen overflow-hidden">
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/1200px-Twitter-logo.svg.png" />
      </Head>

        <main className="grid grid-cols-9">
            <Sidebar />
            <Feed />
            <Widgets />
        </main>

    </div>
  )
}

export default Home;

// server side rendering
export const getServerSideProps: GetServerSideProps = async (context) => {
    const tweets = await fetchTweets();

    return {
        props: {
            tweets
        }
    }
}
