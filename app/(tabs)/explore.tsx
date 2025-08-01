import { Image } from 'expo-image';


import { Collapsible } from '@/components/Collapsible';
import { SafeAreaView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { HelloWave } from '@/components/HelloWave';

export default function TabTwoScreen() {
  return (
    <SafeAreaView >
      
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Explore</ThemedText>
          <HelloWave />
        </ThemedView>

        <Collapsible title="Learn more">
          <ThemedText>
            Explore the app to discover new features and functionalities.
          </ThemedText>
         
        </Collapsible>
    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
