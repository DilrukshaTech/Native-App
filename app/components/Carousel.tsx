import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import Carousel, {
  
  ICarouselInstance,
} from "react-native-reanimated-carousel";
import Animated, {
  FadeOut,
  interpolate,
  useSharedValue,
} from "react-native-reanimated";


type TAnimationStyle = (value: number) => {
  transform: { scale: number }[];
  zIndex: number;
  opacity: number;
};

// import signup1 from '../../constants/Images'



const { width: SCREEN_WIDTH, height } = Dimensions.get("window");

type Data = {
  id: number;

  title?: string;
  description?: string;
};

const defaultData: Data[] = [
  {
    id: 1,
    title: "Your Path Begins Here",
    description:
      "Join or log in to explore your potential. Every answer brings you closer to mastering your subjects!",
  },
  {
    id: 2,
    title: "Quizzes by Top Teachers",
    description:
      "Log in or sign up to unlock your path to success. Expert-made quizzes bring you closer to mastering each subject!",
  },
  {
    id: 2,
    title: "Win Exciting Gifts",
    description:
      "Log in or sign up to explore your potential. Expert quizzes help you master subjects and win gifts for the top three island ranks!",
  },
];

export default function SignupCarousel() {
 
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 100);
  }, []);


  const progress = useSharedValue(0);

  const ref = React.useRef<ICarouselInstance>(null);

  // Update the progress when the carousel changes
  const onSnapToItem = (index: number) => {
    progress.value = index;
  };

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      index,
      animated: true,
    });
  };

  const animationStyle = (value: number) => {
    "worklet";
    return {
      opacity: interpolate(value, [-1, 0, 1], [0, 1, 0]),
      transform: [{ scale: interpolate(value, [-1, 0, 1], [0.9, 1, 0.9]) }],
    };
  };

  

  

  return (
    <SafeAreaView style={styles.imageContainer}>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          
        <Carousel
          ref={ref}
          loop
          width={SCREEN_WIDTH}
          autoPlay
          autoPlayInterval={2000}
          data={defaultData}
          customAnimation={animationStyle}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Animated.View exiting={FadeOut}>
                {/* <Image source={item.Image} style={styles.img} /> */}
              </Animated.View>
              <View style={styles.content}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.desc}>{item.description}</Text>
              </View>
             
            </View>
          )}
          onSnapToItem={onSnapToItem}
        />


        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    flex: 1,
    width: SCREEN_WIDTH,
    top: 80,
    gap: 10,
    alignItems: "center",
  },
  img: {
    width: 270,
    height: 470,
    resizeMode: "contain",
  },
  content: {
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 24,
  },
  desc: {
    fontFamily: "Inter",
    fontSize: 16,
    color: "#AAB6CE",
    textAlign: "center",
    paddingHorizontal: 15,
  },

  


  circle1: {
    width: 614,
    height: 614,
    borderRadius: "50%",
    borderColor: "#fff",
    borderWidth: 2,
    opacity: 0.15,
    position: "absolute",
    bottom: -150,
  },

  circle2: {
    width: 429.8,
    height: 429.8,
    borderRadius: "50%",
    borderColor: "#fff",
    borderWidth: 2,
    opacity: 0.15,
    position: "absolute",
   
  },
});
