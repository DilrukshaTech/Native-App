import * as React from 'react';
import { Searchbar } from 'react-native-paper';

interface SearchBarProps {
    placeholder?: string;
    onChangeText?: (text: string) => void;
    value?: string | null;
}
const SearchBar:React.FC<SearchBarProps> = ({placeholder,onChangeText,value})=> {


  return (
    <Searchbar
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value ? String(value) : ""} 
      style={{
        marginTop: 10,
        borderRadius: 6,
        backgroundColor: "#F5F7FA",
    
        elevation: 0,
      
      
      }}
    
      inputStyle={{
        color: "#000",
      }}
      placeholderTextColor="#AAA"
      iconColor="#A8A8A8"
      
     
    />
  );
};

export default SearchBar;
