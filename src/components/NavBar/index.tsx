import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, List } from "../../assets";
import { useBaseContext } from "../../contexts";
import { LayoutEnum } from "../../types/common";
import { paths } from "../../utils/paths";
import {
  Container,
  ActionsContainer,
  ToggleContainer,
  GridContainer,
  ListContainer,
} from "./styles";

const NavBar: React.FC = () => {
  const basePath = `@blog/${
    paths.filter((path) => path.includes("layout"))[0]
  }`;
  const { getLayout, setLayout } = useBaseContext();
  const navigate = useNavigate();

  useEffect(() => {
    const cachedLayout = localStorage.getItem(basePath);

    if (!cachedLayout) return;

    const parsedLayout = JSON.parse(cachedLayout);

    setLayout(parsedLayout);
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path, { replace: true });
  };

  return (
    <Container>
      <h3 onClick={handleNavigate.bind(this, "/")}>IT Blog</h3>
      <ActionsContainer>
        <ToggleContainer
          onClick={() => {
            setLayout(!getLayout());
            localStorage.setItem(basePath, JSON.stringify(!getLayout()));
          }}
        >
          <GridContainer
            layout={getLayout() ? LayoutEnum.GRID : LayoutEnum.LIST}
          >
            <img src={Grid} alt="Grid" />
          </GridContainer>

          <div></div>
          <ListContainer
            layout={getLayout() ? LayoutEnum.GRID : LayoutEnum.LIST}
          >
            <img src={List} alt="List" />
          </ListContainer>
        </ToggleContainer>
        <h3 onClick={handleNavigate.bind(this, "/favorites")}>Favorites</h3>
      </ActionsContainer>
    </Container>
  );
};

export default NavBar;
