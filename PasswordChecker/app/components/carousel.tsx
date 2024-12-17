import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Dimensions } from 'react-native';


interface CarouselItem{
  items: Array<{ color: string }>;
  visibleCount: number;
}

const CarouselView: React.FC<CarouselItem> = ({ items, visibleCount }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Get the width of the device
  const { width } = Dimensions.get('window');

  // Calculate the width for each item
  const itemWidth = (width / 3)*0.5;

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
      {/* Carousel Content */}
      <View style={{ flexDirection: 'row', overflow: 'hidden', width }}>
      {visibleItems.map((item, index) => (
          <View
            key={index}
            style={[styles.item, { width: itemWidth, backgroundColor: item.color }]}
          />
        ))}
        
      </View>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="Previous" onPress={handlePrevious} />
        <Button title="Next" onPress={handleNext}  />
        
      </View>
    </View>
  );
};

// Export component
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
  item: {
    height: 150,
    marginHorizontal: 5,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '50%',
  },
});
