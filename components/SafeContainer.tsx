import { SafeAreaView } from "react-native";



export function SafeContainer(props: { children: React.ReactNode }) {
    return (
        <SafeAreaView style={{ flex: 1,backgroundColor: "#ffffff",padding: 16 }}>
            {props.children}
        </SafeAreaView>
    );
}