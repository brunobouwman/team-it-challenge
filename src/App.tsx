import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import Layout from "./components/Layout";
import GlobalStyle from "./styles/global";
import Routes from "./routes";
import { Context } from "./contexts";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Context>
        <Layout>
          <Routes />
        </Layout>
      </Context>
    </ThemeProvider>
  );
};

export default App;
