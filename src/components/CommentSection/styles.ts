import styled, { css } from "styled-components";

interface IExpand {
  expanded: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;
  width: 35rem;
`;

export const ExpandableSection = styled.div`
  height: fit-content;
  padding: 1rem;
  width: 100%;
  background-color: red;
  border-radius: 0.5rem;
  cursor: default;
  display: flex;
  flex-direction: column;

  > div:last-of-type {
    align-self: flex-end;
    width: fit-content;
    cursor: pointer;
    z-index: 10;
  }
`;
//   transition: filter 0.5s ease-in;

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  > img {
    cursor: pointer;
    height: 1rem;
    width: 1rem;
    paddging: 0 0.5rem;
    z-index: 10;
  }
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

export const CommentFooter = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
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
  margin-left: 1rem;

  > div:last-of-type {
    background-color: blue;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 50%;
    border-radius: 0.5rem;
    padding: 0.3rem;
    margin-bottom: 0.5rem;

    >input {
      font-size: 0.8rem;
    }
    > img {
      height: 1rem;
      width: auto;
    }
  }

  ${(props) => props.expanded && expandedConversation}
`;

export const ReplyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 2.5rem;
  height: 2rem;
  z-index: 10;

  > div {
    width: 50%;

    > span {
      color: ${(props) => props.theme.colors.black};
    }
  }

  > div:last-of-type {
    display: flex;
    align-items: center;
    width: 1rem;

    > img {
      height: 1rem;
      width: 1rem;
    }
  }
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
  background-color: ${(props) => props.theme.colors.red};
  border-radius: 0.5rem;

  > input {
    color: white;
    padding: 0.5rem;
    font-size: 12px;
    border-radius: 2rem;
    width: 85%;
    height: 0;
    filter: opacity(0);
    transition: all 0.5s ease-in-out;
  }

  > img {
    width: 1rem;
    height: 1rem;
    z-index: 10;
    cursor: pointer;
  }

  ${(props) =>
    props.expanded &&
    css`
      height: 2rem;
      filter: opacity(1);

      > input {
        filter: opacity(1);
        height: 1.5rem;
      }
    `}
`;

export const DateAndAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 7;
`;
