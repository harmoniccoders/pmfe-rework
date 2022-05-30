import { NextApiRequest, NextApiResponse } from 'next';
import { ServerClient } from 'postmark';

export interface StandardResponse {
  status: boolean;
  message: string;
}

export type ContactData = {
  name: string;
  email: string;
  message: string;
  phone: string;
  company: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<StandardResponse>
) {
  if (req.method === 'POST') {
    const client = new ServerClient(
      process.env.NEXT_PUBLIC_POSTMARK_API_TOKEN as unknown as string
    );
    const data = req.body as ContactData;
    console.log({ data });
    client
      .sendEmail({
        From: process.env.NEXT_PUBLIC_POSTMARK_FROM_EMAIL as unknown as string,
        To: process.env.NEXT_PUBLIC_POSTMARK_FROM_EMAIL,
        Subject: 'New Contact Message from Storyboard',
        TextBody: data.message,
      })
      .then((res) => {
        console.log(res);
      });
    res.status(200).json({ status: true, message: 'Mail sent' });
  } else {
    return res.json({ status: false, message: 'An error occurred' });
  }
}
