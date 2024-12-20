import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Dimensions, Image } from 'react-native';

interface CarouselItem {
  items: Array<{ image: any }>; // Array of objects with 'image' property
  visibleCount?: number;        // Number of items visible at the same time, defaults to 3
  visualStyle?: string;         // Style of carousel, either "round" or "flat", defaults to "round"
}

const CarouselView: React.FC<CarouselItem> = ({ items, visibleCount = 3, visualStyle = 'round' }) => {
  const [currentIndex, setCurrentIndex] = useState(0); // State to track the current index of the carousel

  const { width } = Dimensions.get('window'); // Get screen width dynamically
  const itemSize = (width / 3); // Calculate size of each item based on screen width

  const maxHeight = 269; // Max height of an item in the carousel
  const maxWidth = 192;  // Max width of an item in the carousel

  // Handler to move to the next item, loops back to the start
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  // Handler to move to the previous item, loops to the end if at the start
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  // Calculate visible items based on the current index
  const visibleItems = Array(visibleCount).fill(null).map((_, index) => {
    const circularIndex = (currentIndex + index) % items.length; // Ensure circular indexing
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
                  width: Math.min(itemSize * scale, maxWidth * scale), // Limit width by maxWidth
                  height: Math.min(itemSize * 1.4 * scale, maxHeight * scale), // Limit height by maxHeight
                  opacity,
                },
              ]}
            >
              <Image
                source={item.image}
                style={styles.image}
                resizeMode="cover" // Ensure the image covers the container
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
    flex: 1, // Fill available space
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center', // Center content vertically
  },
  header: {
    textAlign: 'center',
    fontSize: 20, // Font size for header
    marginVertical: 20, // Vertical spacing for header
  },
  itemContainer: {
    marginHorizontal: 5, // Horizontal margin between items
    borderRadius: 8, // Rounded corners for items
    overflow: 'hidden', // Ensure content stays within the container
  },
  image: {
    width: '100%', // Stretch image to container width
    height: '100%', // Stretch image to container height
  },
  buttonWrapper: {
    flex: 1, // Equal space for each button
    marginHorizontal: 5, // Space between buttons
  },
  buttonContainer: {
    flexDirection: 'row', // Arrange buttons in a row
    justifyContent: 'space-between', // Space buttons evenly
    marginTop: 20, // Spacing above buttons
    width: 200, // Fixed width for button container
  },
  indicatorContainer: {
    flexDirection: 'row', // Arrange indicators in a row
    justifyContent: 'center', // Center indicators
    alignItems: 'center', // Align indicators vertically
    marginVertical: 10, // Spacing above and below indicators
  },
  indicator: {
    width: 8, // Width of each indicator
    height: 8, // Height of each indicator
    borderRadius: 4, // Make indicators circular
    backgroundColor: '#ccc', // Default color for indicators
    marginHorizontal: 4, // Space between indicators
  },
  activeIndicator: {
    backgroundColor: '#000', // Highlight color for active indicator
  },
});
