import Hero from '@/components/Hero';
import InfoBoxes from '@/components/InfoBoxes';
import FeaturedProperties from '@/components/FeaturedProperties';
import HomeProperties from '@/components/HomeProperties';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <InfoBoxes />
      <FeaturedProperties />
      <HomeProperties />
    </div>
  );
};

export default HomePage;
