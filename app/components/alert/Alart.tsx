import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Dialog, Portal, Text } from 'react-native-paper';

type AlartProps = {
    visible: boolean;
    hideDialog: () => void;
    title?: string;
    description?: string;
    icon?: string;
}

const Alart = ({visible,hideDialog,title,description,icon}:AlartProps) => {


  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title style={styles.title}>{title}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{description}</Text>
        </Dialog.Content>
        <Dialog.Actions>
            <Text onPress={hideDialog}>OK</Text>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
})

export default Alart;