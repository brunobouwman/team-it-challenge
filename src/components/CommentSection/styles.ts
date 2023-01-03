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
  background-color: ${(props) => props.theme.colors.teamIt};
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

  > div:last-of-type {
    width: 100%;
    height: 0.05rem;
    background-color: white;
    margin-bottom: 1rem;
  }
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
  height: 3rem;
  width: 100%;
  overflow: hidden;

  > textarea {
    width: 90%;
    font-size: 12px;
    border: none;
    background: transparent;
    color: ${(props) => props.theme.colors.white};
    min-height: 2rem;
    resize: none;

    &:focus {
      outline: none !important;
    }
  }

  > span {
    display: inline-block;
    font-weight: bold;
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
  gap: 1rem;
  margin-left: 2rem;

  > div:last-of-type {
    background-color: ${(props) => props.theme.colors.teamIt};
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;

    > input {
      font-size: 0.8rem;
      color: ${(props) => props.theme.colors.white};
      border: 1px solid ${(props) => props.theme.colors.white};
      padding: 0.2rem 0.5rem;
      border-radius: 0.5rem;
      width: 76%;

      &::placeholder {
        color: ${(props) => props.theme.colors.white};
      }
    }

    > img {
      height: 1rem;
      width: auto;
      cursor: pointer;
    }
  }

  ${(props) => props.expanded && expandedConversation}
`;

export const ConversationContent = styled.div`
  width: 80%;
  overflow: hidden;
  height: 3rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.white};
  display: flex;
  flex-direction: column;

  > span {
    font-size: 14px;
    font-weight: 600;
  }
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
      color: ${(props) => props.theme.colors.white};
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
  background-color: ${(props) => props.theme.colors.teamIt};
  border-radius: 0.5rem;

  > input {
    color: ${(props) => props.theme.colors.white};
    padding: 0.5rem;
    font-size: 12px;
    border-radius: 2rem;
    width: 85%;
    height: 0;
    filter: opacity(0);
    transition: all 0.5s ease-in-out;

    &::placeholder {
      color: ${(props) => props.theme.colors.white};
    }
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

  > span:first-of-type {
    font-weight: 600;
  }
`;
