import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 25rem;
  gap: 1rem;
  align-items: center;
`;

export const Post = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  height: 21.5rem;
  align-items: center;
  width: 25rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.blue};
  cursor: pointer;
`;

interface IExpand {
  expanded: boolean;
}

export const CommentSection = styled.div`
  height: fit-content;
  width: 100%;
  background-color: red;
  border-radius: 0.5rem;s
  transition: filter 0.5s ease-in;
  cursor: default;
`;

export const ExpandableSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;
  width: 25rem;
`;

export const ExpandedContainer = styled.div<IExpand>`
  display: flex;
  gap: 1rem;
  align-items: center;
  width: 22rem;
  height: 0;
  filter: opacity(0);
  transition: all 0.5s ease-in-out;
  margin-top: 0.5rem;

  > input {
    color: white;
    padding: 0.5rem;
    font-size: 12px;
    background-color: blue;
    border-radius: 2rem;
    width: 85%;
  }

  ${(props) =>
    props.expanded &&
    css`
      height: 2rem;
      filter: opacity(1);
    `}
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

export const CommentContainer = styled.div`
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

export const DateAndAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const EditableContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: fit-content;
  width: 100%;

  > textarea {
    width: 90%;
    font-size: 12px;
    border: none;
    background: transparent;
    min-height: 3rem;
    resize: none;
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
