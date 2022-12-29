import React from "react";
import NavBar from "../NavBar";
import { Container, Content } from "./styles";

interface ILayout {
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <Container>
      <NavBar />
      <Content>{children}</Content>
    </Container>
  );
};

export default Layout;
