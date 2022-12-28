import styled, { css } from "styled-components";
import { LayoutEnum } from "../../types/common";

interface IContainer {
  layout: string;
}

const gridFeed = css`
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 100%;
  justify-content: center;
`;

export const Container = styled.div<IContainer>`
  display: flex;
  align-items: center;
  max-width: 70%;
  height: fit-content;
  margin: 0 auto;
  flex-direction: column;
  gap: 1rem;

  ${(props) => props.layout === LayoutEnum.GRID && gridFeed}
`;
