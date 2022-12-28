import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  height: 4rem;
  background-color: ${(props) => props.theme.colors.red};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  z-index: 1000;

  > h3:first-of-type {
    cursor: pointer;
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  > h3,
  > span {
    color: black;
    cursor: pointer;
  }
`;
