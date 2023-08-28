import { useEffect } from "react";
import "./App.css";
import "./App.scss";
import { Provider } from "react-redux";
import sizeStore from "./utilities/size";
import Body from "./core/Body";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import Header from "core/Header";
import CssBaseline from "@material-ui/core/CssBaseline";
import themeSettingsObj from "config/baseThemeSettings";
import appInitFunctions from "utilities/appInitFunctions";
import Footer from "core/Footer";

const theme = createTheme(themeSettingsObj);

function App() {
  useEffect(appInitFunctions, []);

  return (
    <Provider store={sizeStore}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Body />
        <Footer />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
