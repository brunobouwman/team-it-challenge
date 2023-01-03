import styled, { css } from "styled-components";
import { LayoutEnum } from "../../types/common";

export const Container = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  height: 4rem;
  background-color: ${(props) => props.theme.colors.teamItSecondary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  z-index: 1000;

  > h3:first-of-type {
    color: ${(props) => props.theme.colors.white};
    cursor: pointer;
  }
`;

export const ToggleContainer = styled.div`
  display: flex;
  width: fit-content;
  align-items: center;
  cursor: pointer;

  border: 1px solid ${(props) => props.theme.colors.white};

  > div:nth-child(2) {
    height: 1.6rem;
    width: 0.1rem;
    background-color: ${(props) => props.theme.colors.white};
  }
`;

interface IToggleContainer {
  layout: string;
}

export const GridContainer = styled.div<IToggleContainer>`
  > img {
    width: 1.3rem;
    height: auto;
  }

  transition: all 0.5s ease-in-out;

  ${(props) =>
    props.layout === LayoutEnum.GRID &&
    css`
      background-color: ${(props) => props.theme.colors.white};
    `}
`;

export const ListContainer = styled.div<IToggleContainer>`
  > img {
    width: 1.3rem;
    height: auto;
  }

  transition: all 0.5s ease-in-out;

  ${(props) =>
    props.layout === LayoutEnum.LIST &&
    css`
      background-color: ${(props) => props.theme.colors.white};
    `}
`;

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  > h3,
  > span {
    color: ${(props) => props.theme.colors.white};
    cursor: pointer;
  }
`;
