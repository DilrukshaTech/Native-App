import React, { useState, useRef } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";

type InputProps = {
  testID?: string;
  value?: string;
  onChange?: (text: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  label: string;
  error?: string;
  touched?: boolean;
  secureTextEntry?: boolean;
};

const VerifyInput: React.FC<InputProps> = ({
  testID,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  touched,
}) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) return "";

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    onChange && onChange(newCode.join("")); //converts all strings it into a single string

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus(); //auto-focuses the next input box when the user types.
    }
  };

  const handleBackspace = (index: number) => {
    if (index > 0 && !code[index]) {
      inputRefs.current[index - 1]?.focus(); 
    }
    const newCode = [...code];
    newCode[index] = "";
    setCode(newCode);
    onChange && onChange(newCode.join(""));
  };

  return (
    <SafeAreaView>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        {code.map((char, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputRefs.current[index] = el!)}
            style={styles.input}
            value={value}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") handleBackspace(index);
            }}
            keyboardType="number-pad"
            maxLength={1}
            testID={`${testID}-${index}`}
          />
        ))}
      </View>
      {error && touched && <Text style={styles.error}>{error}</Text>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  inputContainer: {
    flexDirection: "row",
    gap: 10,
  },
  input: {
    width: 52,
    height: 50,
    textAlign: "center",
    backgroundColor: "#F5F7FA",
    borderRadius: 6,
    fontSize: 18,
    fontWeight: "400",
  },
  label: {
    fontSize: 15,
    color: "#636363",
    fontWeight: "700",
    marginBottom: 10,
  },
  error: {
    fontSize: 13,
    color: "red",
    marginTop: 5,
  },
});

export default VerifyInput;
