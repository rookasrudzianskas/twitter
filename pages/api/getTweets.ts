// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {Tweet} from "../../typings";
import {groq} from "next-sanity";
import {sanityClient} from '../../sanity';

type Data = {
    tweet: Tweet[]
}

// @ts-ignore
const feedQuery = groq`
*[_type == "tweet" && !blockTweet] {
  _id,
  ...
} | order(_createdAt desc)
`;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const tweets: Tweet[] = await sanityClient.fetch(feedQuery);
    console.log(tweets);

    res.status(200).json({
        // @ts-ignore
        tweets
    })
}
