import * as React from "react";
import { StyleSheet, Image } from "react-native";
import { Dialog, Portal, Text} from "react-native-paper";
import useFeedbackAlertStore from "../../stores/useFeedbackAlertStore";
import errorImage from "../../../assets/images/error.png"; 
import successImage from "../../../assets/images/success.png"; 
import SecondaryBtn from "../buttons/SecondaryBtn";


const FeedbackAlart = () => {
    const { msg, type, visible, hideFeedback } = useFeedbackAlertStore();

    return (
        <Portal>
            <Dialog
            visible={visible}
            onDismiss={hideFeedback}
          style={styles.container}
            >
            {type === "failed" ? (
                <Image source={errorImage} style={styles.errorImage} />
            ):(<Image source={successImage} style={styles.errorImage} />)}

            <Dialog.Title style={[styles.title, type === "failed" ? styles.errorTitle:styles.successTitle]}>
                {type === "failed" ? "Something went wrong" : "successful"}
            </Dialog.Title>
            <Dialog.Content>
                <Text style={styles.msg}>{msg}</Text>
            </Dialog.Content>
            <Dialog.Actions style={styles.btn}>
                <SecondaryBtn onPress={hideFeedback} text="OK" primaryColor textColor="#fff" />
            </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

const styles = StyleSheet.create({
    container: {
      
        borderRadius:8,
        justifyContent: "center",
        alignItems: "center",
       
    },
    title: {
        textAlign: "center",
    },
    errorTitle: {
        color: "#000",
        fontSize: 20,   
        textAlign: "center",
        fontWeight: "700",
        fontFamily: "Inter",

    },
    successTitle: {
        color: "#000",
        fontSize: 20,
        textAlign: "center",
        fontWeight: "700",
        fontFamily: "Inter",
    },
    msg: {
        fontSize: 16,
        textAlign: "center",
        fontFamily: "Inter",
        fontWeight: "500",
        color: "#8D8D8D ",
     
    },
    errorImage: {
        width: 50, 
        height: 50,
        alignSelf: "center",
        marginBottom: -10,
    },
    btn:{
        alignItems: "center",
        justifyContent: "center",
       
    }
});

export default FeedbackAlart;
