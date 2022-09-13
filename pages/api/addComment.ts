// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {CommentBody} from "../../typings";

type Data = {
    name: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const comment: CommentBody = JSON.parse(req.body);
    const mutations = {
        mutations: [
            {
                create: {
                    _type: "comment",
                    comment: comment.comment,
                    username: comment.username,
                    profileImg: comment.profileImg,
                    tweet: {
                        _type: "reference",
                        _ref: comment.tweetId
                    }
                }
            }
        ]
    }

    res.status(200).json({ name: 'John Doe' })
}
