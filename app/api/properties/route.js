import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';

// GET /api/properties
export const GET = async (request) => {
  try {
    await connectDB();

    const properties = await Property.find({});
    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    await connectDB();

    const sessionUser = getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User Id is requred', { state: 401 });
    }

    const formData = await request.formData();
    // Acces all values from amenities and images
    const amenities = formData.getAll('amenities');
    const images = formData.getAll('images');
    // Create the forData for database submision
    const propertyData = {
      type: formData.getAll('type'),
      name: formData.getAll('name'),
      description: formData.getAll('description'),
      location: {
        street: formData.getAll('location.street'),
        city: formData.getAll('location.city'),
        state: formData.getAll('location.state'),
        zipcode: formData.getAll('location.zipcode'),
      },
      beds: formData.getAll('beds'),
      baths: formData.getAll('baths'),
      square_feet: formData.getAll('square_feet'),
      amenities,
      rates: {
        weekly: formData.get('rates.weekly'),
        monthly: formData.get('rates.monthly'),
        nightly: formData.get('rates.nightly.'),
      },
      seller_info: {
        name: formData.get('seller_info.name'),
        email: formData.get('seller_info.email'),
        phone: formData.get('seller_info.phone'),
      },
      owner: userId,
      images,
    };

    console.log(propertyData);

    return new Response(JSON.stringify({ message: 'Success' }));
  } catch (error) {}
};
