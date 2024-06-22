import React from 'react';
import InfoBox from './InfoBox';

const InfoBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            heading={'For renters'}
            backroundColor="bg-gray-100"
            buttonInfo={{
              text: 'Browse Properties',
              link: '/propertise',
              backroundColor: 'bg-black',
            }}
          >
            Find your dream rental propery, Bookmark properies and contact
            owners.
          </InfoBox>
          <InfoBox
            heading={'For Property Owners '}
            backroundColor="bg-gray-100"
            buttonInfo={{
              text: 'Browse Properties',
              link: '/propertise',
              backroundColor: 'bg-blue-500',
            }}
          >
            Find your dream rental propery, Bookmark properies and contact
            owners.
          </InfoBox>
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
