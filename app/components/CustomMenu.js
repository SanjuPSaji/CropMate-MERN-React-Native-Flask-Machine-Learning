import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
 } from "react-native-popup-menu";
 import { Entypo } from "@expo/vector-icons";
 
 const CustomMenu = () => {
  return (
    <MenuProvider style={styles.container}>
      <Menu>
        <MenuTrigger
          customStyles={{
            triggerWrapper: {
              top: -20,
            },
          }}
        >
          <Entypo name="dots-three-vertical" size={24} color="black" />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={() => alert(`Save`)} text="Save" />
          <MenuOption onSelect={() => alert(`Delete`)} text="Delete" />
        </MenuOptions>
      </Menu>
    </MenuProvider>
  );
 };
 
 export default CustomMenu;
 