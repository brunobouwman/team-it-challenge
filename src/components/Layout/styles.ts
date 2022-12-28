import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.background};
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  padding-top: 5rem;
`;
