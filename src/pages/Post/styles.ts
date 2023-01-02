import styled, { css } from "styled-components";
import { Directions } from ".";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  > div:nth-child(2) {
    margin-top: 5rem;
  }
`;

interface INavigationContainer {
  position: Directions;
}

export const NavigationContainer = styled.div<INavigationContainer>`
  height: 100%;
  width: 3rem;
  position: fixed;
  top: 50%;

  > img {
    width: 3rem;
    height: 3rem;
    cursor: pointer;
  }

  ${(props) =>
    props.position === Directions.RIGHT &&
    css`
      right: 1rem;
    `}

  ${(props) =>
    props.position === Directions.LEFT &&
    css`
      left: 1rem;
    `}
`;
