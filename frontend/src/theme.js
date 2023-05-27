import {extendTheme} from "@chakra-ui/react"
const theme={
  config:{
    initialColorMode: 'dark',
    useSystemCoolorMode:true,
  },
  styles:{
    global:{
      body:{
        margin:0,
        fontFamily:"sans-serif",
      }
    }
  }
};

export default extendTheme(theme);
