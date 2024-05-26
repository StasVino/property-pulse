import connectDB from '@/config/database';
import User from '@/models/User';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-daynamic';

export const POST = async (request) => {
  try {
    await connectDB();

    const { propertyId } = await request.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || sessionUser.Id) {
      return new Response('User ID requried', { status: 401 });
    }

    const { userID } = sessionUser;

    // Find user in database
    const user = await User.findOne({ _id: userID });

    // Check if property is bookmarked
    let isBookmarked = user.bookmarks.includes(propertyId);

    let message;

    if (isBookmarked) {
      // If already bookmakerd, remove it
      user.bookmarks.pull(propertyId);
      message = 'Bookmark removed successfully';
    } else {
      // Not bookmaked
      user.bookmarks.push(propertyId);
      message = 'Bookmark added successfully';
      isBookmarked = true;
    }
    await user.save();
    return Response(JSON.stringify({ message, isBookmarked }), { status: 200 });
  } catch (error) {
    console.log(error);
    return Response('Something went wrong', { status: 500 });
  }
};
