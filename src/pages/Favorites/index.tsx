import React, { useEffect, useState } from "react";
import Feed from "../../components/Feed";
import { useBaseContext } from "../../contexts";
import { LayoutEnum } from "../../types/common";
import { Container } from "./styles";

const Favorites: React.FC = () => {
  const { getLayout, getFavorites } = useBaseContext();

  return (
    <Container>
      <Feed
        layout={getLayout() ? LayoutEnum.GRID : LayoutEnum.LIST}
        content={getFavorites()}
      />
    </Container>
  );
};

export default Favorites;
