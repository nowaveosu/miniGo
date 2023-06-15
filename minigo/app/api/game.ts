import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    currentColor: string;
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'POST') {
        const { currentColor } = req.body;
        res.status(200).json({ currentColor: currentColor === 'black' ? 'green' : 'black' });
    } else {
        res.status(405).end();
    }
}