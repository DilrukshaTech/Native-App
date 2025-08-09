

import {SafeAreaView,StyleSheet} from 'react-native';
import { ActivityIndicator,} from 'react-native-paper';

const ActiveIndicator=()=>{

    return(
        <SafeAreaView style={styles.container}>
             <ActivityIndicator
               animating={true}
               style={styles.spinner}
               theme={{ colors: { primary: "#8C80FF" } }}
               size='large'
             />
           </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "transparent",
    },
  
    spinner: {},
  });
export default ActiveIndicator