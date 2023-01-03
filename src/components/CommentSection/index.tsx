import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Conversation, Edit, Send } from "../../assets";
import { useBaseContext } from "../../contexts";
import api, { Endpoints } from "../../services/api";
import { getDate, handleCache } from "../../utils";
import {
  CommentContainer,
  CommentFooter,
  Container,
  Content,
  DateAndAuthor,
  EditableContainer,
  ExpandableSection,
  ExpandedContainer,
  ReplyContainer,
  ConversationContainer,
  ConversationContent,
} from "./styles";

interface IPost {
  author: string;
  content: string;
  description: string;
  id: number;
  publish_date: string;
  slug: string;
  title: string;
  comments?: IComment[];
}

interface IComment {
  content: string;
  date: string;
  id: number;
  parent_id: number | null;
  postId: number;
  user: string;
  conversation?: IComment[];
}

interface ICommentSection {
  content: IPost;
  comments?: IComment[];
  updateComment?: Dispatch<SetStateAction<IComment[] | undefined>>;
}

const CommentSection: React.FC<ICommentSection> = ({
  comments,
  updateComment,
  content,
}) => {
  const [expand, setExpand] = useState(false);
  const [expandConversation, setExpandConversation] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<IComment | null>(null);
  const [editedComment, setEditedComment] = useState("");
  const [reply, setReply] = useState("");
  const commentRef = React.useRef<HTMLInputElement>(null);
  const { getCommentIndex, setCommentIndex } = useBaseContext();

  useEffect(() => {
    document.addEventListener("keypress", handleEnter);
    return () => document.removeEventListener("keypress", handleEnter);
  });

  useEffect(() => {
    setExpand(false);
  }, [comments, content]);

  const handleEnter = (event: KeyboardEvent) => {
    if (
      event.key !== "Enter" ||
      !isEditing ||
      commentRef.current?.value.trim.length === 0 ||
      !expand ||
      expandConversation
    )
      return;

    isEditing && handleSubmit();
  };

  const handleExpandConversation = (commentId: number) => {
    setIsEditing(null);
    setExpand(false);
    setExpandConversation(expandConversation !== commentId ? commentId : 0);
  };

  const handleExpand = () => {
    setExpand(!expand);
    setExpandConversation(0);
    !expand && setIsEditing(null);
  };

  const handleSubmit = async (e?: React.KeyboardEvent) => {
    e && e.preventDefault();
    if (!isEditing) return;

    const payload = {
      ...isEditing,
      content: editedComment,
    };
    try {
      const res = await api.put({
        endpoint: Endpoints.LOCAL,
        id: isEditing.id,
        payload: payload,
      });
      if (comments && res) {
        const commentIndex = comments.findIndex(
          (comment) => comment.id === isEditing.id
        );
        comments.splice(commentIndex, 1, payload);
        updateComment && updateComment(comments);
        handleCache(comments, content);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsEditing(null);
    }
  };

  const handleEdit = (comment: IComment) => {
    if (isEditing?.id === comment.id) {
      setIsEditing(null);
      return;
    }

    setExpand(false);
    setExpandConversation(0);
    setIsEditing(comment);
    setTimeout(() => {
      const input = document.getElementById(`input-${comment.id}`);
      if (input) {
        input.focus();
        input.innerHTML = comment.content;
      }
    }, 10);
  };

  const handleConversation = async (comment: IComment) => {
    if (reply.length === 0) return;

    const indexes = comment.conversation?.map((conv) => conv.id);
    const highest =
      indexes && indexes.length > 0 ? Math.max(...indexes) + 1 : 1;
    const newConversation: IComment = {
      content: reply,
      date: getDate(),
      id: highest,
      parent_id: null,
      postId: comment.postId,
      user: "Bruno",
    };
    if (comment.conversation) {
      comment.conversation.push(newConversation);
      try {
        await api.put({
          endpoint: Endpoints.LOCAL,
          id: comment.id,
          payload: comment,
        });
        const newComments = handleCache(comment, content);
        updateComment && newComments && updateComment(newComments);
        setReply("");
      } catch (err) {
        console.log(err);
      }
    } else {
      const payload: IComment = {
        ...comment,
        conversation: [newConversation],
      };
      try {
        await api.put({
          endpoint: Endpoints.LOCAL,
          id: comment.id,
          payload: payload,
        });
        const newComments = handleCache(payload, content);
        updateComment && newComments && updateComment(newComments);
        setReply("");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleNewComment = async () => {
    if (!commentRef.current || !commentRef.current.value) return;

    const currentIndex = getCommentIndex();

    const payload: IComment = {
      content: commentRef.current.value,
      date: getDate(),
      id: currentIndex,
      parent_id: null,
      postId: content.id,
      user: "Bruno",
      conversation: [],
    };

    try {
      await api.post({
        endpoint: Endpoints.LOCAL,
        id: content.id,
        payload: payload,
      });
      setCommentIndex(currentIndex + 1);
      comments && comments.push(payload);
      handleCache(comments ? comments : [payload], content);
      commentRef.current.value = "";
      setExpand(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <ExpandableSection>
        {comments &&
          comments.map((comment) => (
            <CommentContainer key={comment.id}>
              <Content>
                <EditableContainer>
                  {isEditing && isEditing.id === comment.id ? (
                    <textarea
                      id={`input-${comment.id}`}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        setEditedComment(e.currentTarget.value);
                      }}
                      maxLength={90}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") handleSubmit(event);
                      }}
                    />
                  ) : (
                    <span>{comment.content}</span>
                  )}
                </EditableContainer>
                <img
                  src={Edit}
                  alt="edit"
                  onClick={handleEdit.bind(null, comment)}
                />
              </Content>
              <CommentFooter>
                <DateAndAuthor>
                  <span>{comment.user}</span>
                  <span>{comment.date}</span>
                </DateAndAuthor>
                <ReplyContainer
                  onClick={handleExpandConversation.bind(null, comment.id)}
                >
                  <div>
                    {comment.conversation &&
                      comment.conversation?.length > 0 && (
                        <span>{`+${comment.conversation.length}`}</span>
                      )}
                  </div>
                  <div>
                    <img src={Conversation} alt="conversation" />
                  </div>
                </ReplyContainer>
              </CommentFooter>
              <ConversationContainer
                expanded={expandConversation === comment.id}
              >
                {comment.conversation &&
                  comment.conversation.length !== 0 &&
                  comment.conversation.map((conv) => (
                    <ConversationContent key={conv.id}>
                      <span>{conv.content}</span>
                      <DateAndAuthor>
                        <span>{conv.user}</span>
                        <span>{conv.date}</span>
                      </DateAndAuthor>
                      <div></div>
                    </ConversationContent>
                  ))}
                <div>
                  <input
                    type="text"
                    placeholder="Reply..."
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      if (e.currentTarget.value.length > 52) return;

                      setReply(e.currentTarget.value);
                    }}
                    value={reply}
                  />
                  <img
                    src={Send}
                    alt="send-reply"
                    onClick={handleConversation.bind(null, comment)}
                  />
                </div>
              </ConversationContainer>
              <div></div>
            </CommentContainer>
          ))}
        <div>
          <span onClick={handleExpand}>Add Comment</span>
        </div>
      </ExpandableSection>
      <ExpandedContainer expanded={expand}>
        <input
          type="text"
          placeholder="Add a comment..."
          ref={commentRef}
          maxLength={98}
        />
        <img src={Send} alt="send-comment" onClick={handleNewComment} />
      </ExpandedContainer>
    </Container>
  );
};

export default CommentSection;
