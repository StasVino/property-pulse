import connectDB from '@/config/database';
import Property from '@/models/Property';

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
    const formData = await request.formData();

    // Acces all values from amenities and images
    const amenities = formData.getAll('aminities');
    const images = formData.getAll('images').filter((image) => {
      image.name !== '';
    });

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
      images,
    };
  } catch (error) {}
};
