import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBaseContext } from "../../contexts";
import { paths } from "../../utils/paths";
import { Container, ActionsContainer } from "./styles";

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
      <h3 onClick={handleNavigate.bind(this, "/")}>LOGO</h3>
      <ActionsContainer>
        <span
          onClick={() => {
            setLayout(!getLayout());
            localStorage.setItem(basePath, JSON.stringify(!getLayout()));
          }}
        >
          Toggle
        </span>
        <h3 onClick={handleNavigate.bind(this, "/favorites")}>Favorites</h3>
      </ActionsContainer>
    </Container>
  );
};

export default NavBar;
