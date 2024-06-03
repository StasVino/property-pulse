import connectDB from '@/config/database';
import Property from '@/models/Property';

// GET /api/properties/search
export const GET = async (request) => {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const location = searchParams.get('location');
    const propertyType = searchParams.get('propertyType');

    const locationPattren = new RegExp(location, 'i');

    // Match location pattern against databse fields
    let query = {
      $or: [
        { name: locationPattren },
        { description: locationPattren },
        { 'location.street': locationPattren },
        { 'location.city': locationPattren },
        { 'location.state': locationPattren },
        { 'location.zipcode': locationPattren },
      ],
    };

    // Only check for property if its not 'All'
    if (propertyType && propertyType !== 'All') {
      const typePattren = new RegExp(propertyType, 'i');
      query.type = typePattren;
    }

    const properties = await Property.find(query);

    return new Response(JSON.stringify(properties, { status: 200 }));
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify('Something went wrong', { status: 500 })
    );
  }
};
