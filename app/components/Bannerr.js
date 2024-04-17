import React from 'react';
import { Banner, Image } from 'react-native-paper';

const Bannerr = ({ visible, onDismiss }) => {
  return (
    <Banner
      visible={visible}
      actions={[
        {
          label: 'Dismiss',
          onPress: onDismiss,
        },
      ]}
      icon={({ size }) => (
        <Image
          source={{
            uri: 'https://example.com/your-image.png', // Replace with your image URL
          }}
          style={{
            width: size,
            height: size,
          }}
        />
      )}
    >
      There was a problem processing a transaction on your credit card.
    </Banner>
  );
};

export default Bannerr;
