import React from "react";
import Feed from "../../components/Feed";
import { useBaseContext } from "../../contexts";
import { LayoutEnum } from "../../types/common";
import { Container } from "./styles";

const Home: React.FC = () => {
  const context = useBaseContext();
  const { getPosts, getLayout } = context;

  return (
    <Container>
      <Feed
        layout={getLayout() ? LayoutEnum.GRID : LayoutEnum.LIST}
        content={getPosts()}
      />
    </Container>
  );
};

export default Home;
