    import React from 'react';
    import { View, Dimensions, Text } from 'react-native';
    import Carousel from 'react-native-reanimated-carousel';

    const windowDimensions = Dimensions.get('window');

    const swipe = () => {
      const data = [...new Array(6).keys()];

      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Carousel
            loop
            width={windowDimensions.width}
            height={windowDimensions.width / 2}
            data={data}
            renderItem={({ index }) => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor:'red',
                  marginStart:10,
                  marginEnd:10,
                }}
              >
                
                <Text>{`Item ${index}`}</Text>
              </View>
            )}
          />
        </View>
      );
    };

    export default swipe;