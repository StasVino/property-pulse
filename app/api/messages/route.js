import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

// POST /api/messages
export const POST = async (request) => {
  try {
    await connectDB();

    const { name, email, phone, message, property, recipient } =
      await request.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || sessionUser.Id) {
      return new Response('You must be logged in to send a messages', {
        status: 401,
      });
    }

    const { user } = sessionUser;
    // make sure the user doesnt message himself
    if (user.id === recipient) {
      return new Response(
        JSON.stringify({ message: 'Can not send a message to yourself' }),
        { status: 400 }
      );
    }

    const newMessage = new Message({
      sender: user.id,
      name,
      recipient,
      property,
      email,
      phone,
      body: message,
    });

    await newMessage.save();
    console.log(newMessage);
    return new Response(
      JSON.stringify({ message: 'Message sent' }, { status: 200 })
    );
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
