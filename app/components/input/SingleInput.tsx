import * as React from "react";
import { TextInput } from "react-native-paper";

import { StyleSheet } from "react-native";

interface SingleInputProps {
  label: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "ascii-capable"
    | "numbers-and-punctuation"
    | "url"
    | "name-phone-pad"
    | "decimal-pad"
    | "twitter"
    | "web-search";
  autoComplete?:
    | "off"
    | "on"
    | "username"
    | "password"
    | "email"
    | "name"
    | "tel"
    | "street-address"
    | "postal-code"
    | "cc-number"
    | "cc-exp"
    | "cc-csc";
  error?: boolean | string;
  touched?: boolean;
  required?: boolean;
  id?: number | string;
}

const SingleInput: React.FC<SingleInputProps> = ({
  label,
  onChangeText,
  value,
  secureTextEntry,
  keyboardType,
  error,
  touched,
  required,
}) => {
  return (
    <TextInput
      label={label}
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType || "default"}
      cursorColor="#2B9AAF"
      underlineStyle={{ backgroundColor: "#E9F1FA" }}
      
     
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    height: 50,
    paddingTop:40,
    paddingBottom: 10,
  
    fontSize: 16,
    color: "#AFAFAF",
  },
});

export default SingleInput;
