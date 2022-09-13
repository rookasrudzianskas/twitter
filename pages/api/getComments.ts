import type { NextApiRequest, NextApiResponse } from 'next'
import {Tweet} from "../../typings";
import {groq} from "next-sanity";
import {sanityClient} from '../../sanity';
import {Comment} from "../../typings"


// @ts-ignore
const commentQuery = groq`
*[_type == "comment" && references(*[_type== 'tweet' && _id == $tweetId]._id)] {
  _id,
  ...
} | order(_createdAt desc)
`;

type Data = Comment[]

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    // console.log('This is the api side 🚀')
    const { tweetId } = req.query;
    // console.log('This is tweet id from api', tweetId);
    const comments: Comment[] = await sanityClient.fetch(commentQuery, {
        tweetId: tweetId
    });
    // console.log('this is comments >>>>>> ', comments);

    res.status(200).json({
        // @ts-ignore
        comments
    })
}
