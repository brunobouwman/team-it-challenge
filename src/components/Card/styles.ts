import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: fit-content;
  gap: 1rem;
  align-items: center;
`;

interface IPost {
  isFeatured: boolean;
}

export const Post = styled.div<IPost>`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  height: 25rem;
  align-items: center;
  width: 25rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.blue};
  cursor: pointer;

  ${(props) =>
    props.isFeatured &&
    css`
      width: 40rem;
      height: 30rem;
      gap: 5rem;
    `}
`;

export const CardTitle = styled.div`
  display: flex;
  width: 100%;
  z-index: 10;

  align-items: center;
  justify-content: space-between;

  > img {
    height: 1rem;
    width: auto;
    cursor: pointer;
    padding: 1rem;
  }
`;

interface IExpand {
  expanded: boolean;
}

// export const CommentSection = styled.div`
//   height: fit-content;
//   width: 100%;
//   background-color: red;
//   border-radius: 0.5rem;
//   cursor: default;
// `;

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

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
  padding: 1rem;
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const CommentFooter = styled.div`
  display: flex;
  width: 100%;
  align-items: center;

  > span {
    flex: 1;
  }
`;

export const DateAndAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 7;
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

const expandedConversation = css`
  max-height: 30rem;
  filter: opacity(1);
`;

export const ConversationContainer = styled.div<IExpand>`
  max-height: 0;
  width: 100%;
  filter: opacity(0);
  transition: all 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  ${(props) => props.expanded && expandedConversation}
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  height: 4rem;
  margin-top: 1rem;
`;
