import connectDB from '@/config/database';
import Property from '@/models/Property';

// GET /api/properties/user/:userid
export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const userId = params.userId;

    if (!userId) {
      return new Response('UserId is requred', { status: 400 });
    }
    const properties = await Property.find({ owner: userId });

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
