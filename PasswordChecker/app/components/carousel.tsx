import React, { useState } from 'react';
import { View, StyleSheet, Button, Dimensions, Image } from 'react-native';

interface CarouselProps {
  items: Array<{ image: any }>; // Array of objects with 'image' property
  visibleCount?: number;        // Number of items visible at the same time, defaults to 3
  visualStyle?: string;         // Style of carousel, either "round" or "flat", defaults to "round"
}

const CarouselView: React.FC<CarouselProps> = ({ items, visibleCount = 3, visualStyle = 'round' }) => {
  const [currentIndex, setCurrentIndex] = useState(0); // State to track the current index of the carousel

  const { width } = Dimensions.get('window'); // Get screen width dynamically
  const itemSize = (width / 3); // Calculate size of each item based on screen width

  const maxHeight = 269; // Max height of an item in the carousel
  const maxWidth = 192;  // Max width of an item in the carousel

  // Handler to move to the next item, loops back to the start
  const handleNext = () => {
    setCurrentIndex((currentIndex) => (currentIndex + 1) % items.length);
  };

  // Handler to move to the previous item, loops to the end if at the start
  const handlePrevious = () => {
    setCurrentIndex((currentIndex) =>
      currentIndex === 0 ? items.length - 1 : currentIndex - 1
    );
  };

  // Calculate visible items based on the current index
  const visibleItems = Array(visibleCount).fill(null).map((_, index) => {
    const circularIndex = (currentIndex + index) % items.length; // circular indexing
    return items[circularIndex];
  });

  return (
    <View style={styles.container}>
      {/* Carousel display */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', overflow: 'hidden', width }}>
        {visibleItems.map((item, index) => {
          const isCenter = index === Math.floor(visibleCount / 2); // Check if the item is centered
          const scale = visualStyle === 'flat' ? 1 : isCenter ? 1 : 0.6; // Apply scaling based on visual style and position
          const opacity = isCenter ? 1 : 0.4; // Apply opacity based on position
          
          return (
            <View
              key={index}
              style={[
                styles.itemContainer,
                {
                  width: Math.min(itemSize * scale, maxWidth * scale), // Apply the scale and limit width by maxWidth
                  height: Math.min(itemSize * 1.4 * scale, maxHeight * scale), // Apply the scale and limit height by maxHeight
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

      {/* Indicators for carousel position */}
      <View style={styles.indicatorContainer}>
        {items.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentIndex === index && styles.activeIndicator, // Highlight the active indicator
            ]}
          />
        ))}
      </View>

      {/* Navigation buttons */}
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Previous" onPress={handlePrevious} /> {/* Previous button */}
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Next" onPress={handleNext} /> {/* Next button */}
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
