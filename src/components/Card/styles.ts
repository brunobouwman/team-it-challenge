import styled, { css } from "styled-components";

export const Container = styled.div<IExpand>`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  height: 21.5rem;
  justify-content: space-between;
  align-items: center;
  width: 25rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.blue};
  cursor: pointer;
  overflow: hidden;

  ${(props) =>
    props.expanded &&
    css`
      overflow: visible;
    `}
`;

interface IExpand {
  expanded: boolean;
}

const expandedContainer = css`
  height: 15rem;
  filter: opacity(1);
`;

export const ExpandableContainer = styled.div<IExpand>`
  height: 0;
  filter: opacity(0);
  width: 25rem;
  background-color: red;
  border-radius: 0.5rem;
  transition: filter 0.5s ease-in;
  ${(props) => props.expanded && expandedContainer};
  cursor: default;
`;

export const CommentContainer = styled.div<IExpand>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
  padding: 1rem;

  > div:first-of-type {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  > div:last-of-type {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
`;

export const CardTitle = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  > img {
    height: 1rem;
    width: auto;
    cursor: pointer;
    padding: 1rem;
    z-index: 1000;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  z-index: 1000;

  > img {
    height: 1rem;
    width: auto;
  }
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  height: 4rem;
  margin-top: 1rem;
`;

export const DateAndAuthor = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;
