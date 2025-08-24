import React, { useState, memo } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import { Dropdown } from "react-native-element-dropdown";

type InputProps = {
  id?: number | string;
  testID?: string;
  value?: string | number | null;  
  onChange?: (text: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  dropdown_placeholder?: string;
  label: string;
  type?: TextInputProps["inputMode"];
  error?: boolean | string;
  touched?: boolean;
  secureTextEntry?: boolean;
  dropdown?: boolean;
  data?: { label: string; value: string}[];
  required?: boolean;
  keyboardType?: TextInputProps["keyboardType"];
  numericValue?:boolean;
};

const Input: React.FC<InputProps> = ({
  testID,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  dropdown_placeholder,
  type,
  error,
  touched,
  secureTextEntry,
  dropdown,
  data,
  id,
  required,
  keyboardType,
  numericValue
}) => {
  const [open, setOpen] = useState(false);

  const handlePress = () => {
    setOpen((prevOpen) => !prevOpen);
    secureTextEntry = !open;
  };

 
  return (
    <SafeAreaView>
      {label && (
        <View>
          <Text style={styles.label}>
            {label}
            {required && <Text style={styles.required}>*</Text>}
          </Text>
        </View>
      )}
      <View>
        {dropdown ? (
          <Dropdown
            data={data || []}
            labelField="label"
            autoScroll
            valueField="value"
            value={value}
            onChange={(item) => {
              if(numericValue && typeof item.value === 'string'){
                onChange?.(parseInt(item.value, 10).toString());
              }
              else{
                onChange?.(item.value);
              }
            }}

            onBlur={onBlur}
            placeholder={placeholder}
            style={styles.dropdown}
            placeholderStyle={{ color: "#999", alignItems: "center" }}
          />
        ) : (
          <TextInput
            style={styles.input}
            inputMode={type}
            secureTextEntry={secureTextEntry && open}
            placeholder={placeholder}
            testID={testID}
            onChangeText={onChange}
            value={value ? String(value) : ""} 
            onBlur={onBlur}
            keyboardType={keyboardType || "default"}
          />
        )}
        {secureTextEntry && (
          <View style={styles.passwordvisible}>
            <TouchableOpacity onPress={handlePress}>
              {open ? (
                <Feather name="eye-off" size={24} color="black" />
              ) : (
                <Feather name="eye" size={24} color="black" />
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>

      {error && (touched ?? true) ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 50,
    alignItems: "center",
    backgroundColor: "#F5F7FA",
    borderRadius: 6,
    marginBottom: -30,
    paddingRight: 40,
    paddingLeft: 5,
    fontSize: 16,
    fontWeight: 500,
    alignSelf: "flex-start",
    justifyContent: "center",
  },

  error: {
    fontSize: 13,
    fontFamily: "Inter",
    color: "red",
    fontStyle: "normal",

    marginLeft: 100,
  },

  label: {
    fontFamily: "Inter",
    fontSize: 15,
    color: "#636363",
    fontStyle: "normal",
    fontWeight: 700,
    bottom: 5,
  },
  required: {
    color: "#ed0131",
    marginLeft: 5,
  },
  passwordvisible: {
    position: "absolute",
    right: 10,
    top: 13,
  },

  dropdown: {
    width: 350,
    height: 50,
    alignItems: "center",
    backgroundColor: "#F5F7FA",
    borderRadius: 6,
    marginBottom: -30,
    paddingRight: 10,
    paddingLeft: 5,
    fontSize: 16,
    fontWeight: 500,
  },
});

export default memo(Input);
