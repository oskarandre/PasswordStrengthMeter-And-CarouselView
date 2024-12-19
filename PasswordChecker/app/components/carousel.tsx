import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Dimensions, Image } from 'react-native';

interface CarouselItem {
  items: Array<{ image: any }>;
  visibleCount?: number;
  visualStyle?: string;
}

const CarouselView: React.FC<CarouselItem> = ({ items, visibleCount = 3, visualStyle = 'round' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { width } = Dimensions.get('window');
  const itemSize = (width / 3);

  const maxHeight = 269;
  const maxWidth = 192;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const visibleItems = Array(visibleCount).fill(null).map((_, index) => {
    const circularIndex = (currentIndex + index) % items.length;
    return items[circularIndex];
  });

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', overflow: 'hidden', width }}>
        {visibleItems.map((item, index) => {
          const isCenter = index === Math.floor(visibleCount / 2);
          const scale = visualStyle === 'flat' ? 1 : isCenter ? 1 : 0.6;
          const opacity = isCenter ? 1 : 0.4;
          console.log('itemsize' + itemSize)
          console.log('scale' + itemSize*scale)
          console.log(maxHeight)
          return (
            <View
              key={index}
              style={[
                styles.itemContainer,
                {
                  width: Math.min(itemSize * scale, maxWidth*scale),
                  height: Math.min(itemSize * 1.4 * scale, maxHeight*scale),
                  opacity,
                },
              ]}
            >
              <Image
                source={item.image}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          );
        })}
      </View>
      {/* Indicators */}
      <View style={styles.indicatorContainer}>
        {items.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentIndex === index && styles.activeIndicator,
            ]}
          />
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Previous" onPress={handlePrevious} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Next" onPress={handleNext} />
        </View>
      </View>
    </View>
  );
};

export default CarouselView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 20,
  },
  itemContainer: {
    marginHorizontal: 5,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: 200,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#000',
  },
});