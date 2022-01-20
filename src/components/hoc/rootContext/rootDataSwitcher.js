import React from "react";
import { THEME_KEYS, THEMES } from "./constants";
import RootContext from "./context";

const rootDataSwitcher = WrappedComponent => {
  return class HOC extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        currentTheme: THEMES.ORBI,
        setUpMode: "",
        isLanConnection: false
      };
    }

    onThemeChange = nextTheme => {
      if (nextTheme) this.setState({ currentTheme: nextTheme });
    };

    onKeyThemeChange = event => {
      const themes = THEME_KEYS;
      const nextTheme = themes[event.keyCode];
      if (nextTheme) this.onThemeChange(nextTheme);
    };    

    componentDidMount = () => {
      document.addEventListener("keydown", this.onKeyThemeChange, false);
    };

    componentWillUnmount = () => {
      document.removeEventListener("keydown", this.onKeyThemeChange, false);
    };

    setCountryName = name => {
      this.setState({
        countryName: name
      });
    };

    setUserSignupData = obj => {
      this.setState({
        userInfo: obj
      });
    };

    setUpProductMode = mode => {
      this.setState({
        setUpMode: mode
      });
    };

    checkLanConnection = () => {
      this.setState({
        isLanConnection: true
      });
    };

    render() {
      const themeProviderValue = {
        theme: this.state.currentTheme,
        onThemeChange: this.onThemeChange,
        setUpProductMode: this.setUpProductMode,
        isLanConnection: this.state.isLanConnection,
        checkLanConnection: this.checkLanConnection
      };

      return (
        <RootContext.Provider value={themeProviderValue}>
          <WrappedComponent
            theme={this.state.currentTheme}
            setUpMode={this.state.setUpMode}
          />
        </RootContext.Provider>
      );
    }
  };
};

export default rootDataSwitcher;
