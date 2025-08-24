import * as React from "react";
import { Dialog, Portal} from "react-native-paper";
import Input from "../input/Input";
import Button from "@/app/components/buttons/TopBtn";

const InputPopup = ({
  visible,
  onDismiss,
  onSubmit,
}: {
  visible: boolean;
  onDismiss: () => void;
  onSubmit: (password: string) => void;
}) => {
  const [password, setPassword] = React.useState("");

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Content style={{ padding: 20,  gap: 20 }}> 
          <Input
            label="Enter Password"
            secureTextEntry
            value={password}
            onChange={setPassword}
          />
          <Button
            onPress={() => {
              onSubmit(password);
              setPassword("");
              onDismiss();
            }}
            text="Submit"
            textColor="#fff"

          />
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default InputPopup;
