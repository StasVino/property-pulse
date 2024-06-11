import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

// PUT /api/message/:id
export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    const { id } = params;
    const sessionUser = await getSessionUser();

    if (!sessionUser || sessionUser.Id) {
      return new Response('You must be logged in to view messages', {
        status: 401,
      });
    }

    const { userId } = sessionUser;

    const message = await Message.findById(id);

    if (!message) {
      return new Response('Message not found', {
        status: 404,
      });
    }

    // Verify ownership
    if (message.recipient.toString() !== userId) {
      return new Response('Unauthoraized', {
        status: 401,
      });
    }

    // Update message status to read/unread
    message.read = !message.read;

    await message.save();
    return new Response(JSON.stringify(message), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
