import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useRef, useState } from "react";
import { ImageType } from "../../utils/types/modelTypes";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../../styles/colors";
import IconButton from "../../styles/styledComponents/Buttons/IconButton";

const screenWidth = Dimensions.get("window").width;
const DetailsCarousel: React.FC<{ images: ImageType[] }> = ({ images }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const flatlistRef = useRef<FlatList>(null);
  const handleChange = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentSlideIndex = Math.ceil(
      e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width
    );
    if (activeImageIndex !== currentSlideIndex) {
      setActiveImageIndex(currentSlideIndex);
    }
  };
  const handleIndicatorPress = (imageIndex: number) => {
    setActiveImageIndex(imageIndex);
    flatlistRef.current?.scrollToIndex({ animated: false, index: imageIndex });
  };
  return (
    <View style={{}}>
      <FlatList
        ref={flatlistRef}
        onScroll={(e) => handleChange(e)}
        data={images}
        nestedScrollEnabled={true}
        renderItem={({ item }: { item: ImageType }) => (
          <Image style={styles.carouselImg} source={{ uri: item.path }} />
        )}
        keyExtractor={(item) => item.path}
        pagingEnabled={true}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginVertical: 10,
        }}
      >
        {images.map((image, index) => (
          <IconButton
            onPress={() => handleIndicatorPress(index)}
            key={Math.random()}
          >
            <Icon
              name={activeImageIndex === index ? "circle" : "circle-thin"}
              key={image.path}
              style={{
                color: colors.primaryColor,
                fontSize: 20,
                marginRight: 15,
              }}
            />
          </IconButton>
        ))}
      </View>
    </View>
  );
};

export default DetailsCarousel;

const styles = StyleSheet.create({
  carouselContainer: {},
  carouselImg: {
    width: screenWidth,
    height: 240,
  },
});
