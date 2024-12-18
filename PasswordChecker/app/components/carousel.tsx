import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Dimensions } from 'react-native';


interface CarouselItem{
  items: Array<{ color: string }>;
  visibleCount?: number;
  visualStyle? : string;
}

const CarouselView: React.FC<CarouselItem> = ({ items, visibleCount = 3, visualStyle = 'round' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Get the width of the device
  const { width } = Dimensions.get('window');

  // Calculate the width for each item
  const itemSize = (width / 3)*0.5;

  const maxHeight = 200;
  const maxWidth =  142; //x*1.4 =200

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
          const scale = isCenter ? 1 : 0.6;
          const opacity = isCenter ? 1 : 0.6;
  
          // Inner return for mapping items
          return (
            <View
              key={index}
              style={[
                styles.item,
                {
                  width: Math.min(itemSize * scale, maxWidth), 
                  height: Math.min((itemSize * 1.4) * scale, maxHeight),
                  backgroundColor: item.color,
                  opacity,
                  
                },
              ]}
            />
          );
        })}
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
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5, 
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '40%',
  },
});
