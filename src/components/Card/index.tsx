import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { Star, StarGold } from "../../assets";
import { useBaseContext } from "../../contexts";
import api, { Endpoints } from "../../services/api";
import { IComment, IPost } from "../../types/common";
import { fetchComments } from "../../utils";
import { paths } from "../../utils/paths";
import {
  CardFooter,
  CardTitle,
  CommentContainer,
  CommentSection,
  Post,
  EditableContainer,
  ImageContainer,
  Container,
  DateAndAuthor,
  ExpandedContainer,
  ExpandableSection,
} from "./styles";

interface ICard {
  content: IPost;
  isFeatured: boolean;
  comments?: IComment[];
  updateComment?: Dispatch<SetStateAction<IComment[] | undefined>>;
}

const Card: React.FC<ICard> = ({
  content,
  isFeatured,
  comments,
  updateComment,
}) => {
  const navigate = useNavigate();
  const basePath = `@blog/${
    paths.filter((path) => path.includes("favorites"))[0]
  }`;
  const { getFavorites, setFavorites, getCommentIndex, setCommentIndex } =
    useBaseContext();
  const [expand, setExpand] = useState(false);
  const [isEditing, setIsEditing] = useState<IComment | null>(null);
  const [editedComment, setEditedComment] = useState("");
  const commentRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.addEventListener("keypress", handleTest);
    return () => document.removeEventListener("keypress", handleTest);
  }, []);

  const handleTest = (event: KeyboardEvent) => {
    if (
      event.key !== "Enter" ||
      !isEditing ||
      commentRef.current?.value.trim.length === 0
    )
      return;

    handleSubmit();
  };

  const handleFavorite = (
    post: IPost,
    event: React.MouseEvent<HTMLElement>
  ) => {
    event.stopPropagation();
    const cachedFavorites = localStorage.getItem(basePath);
    const previousFavorites = getFavorites();

    if (!cachedFavorites) {
      localStorage.setItem(basePath, JSON.stringify([post.id]));
      setFavorites([post]);
      return;
    }

    const parsedFavorites: number[] = JSON.parse(cachedFavorites);

    const index = parsedFavorites.findIndex((fav) => fav === post.id);
    if (index === -1) {
      parsedFavorites.push(post.id);
      localStorage.setItem(basePath, JSON.stringify(parsedFavorites));
      setFavorites([...previousFavorites, post]);
      return;
    }

    const filteredFavorites = getFavorites().filter(
      (fav) => fav.id !== post.id
    );
    setFavorites(filteredFavorites);
    localStorage.setItem(
      basePath,
      JSON.stringify(filteredFavorites.map((fav) => fav.id))
    );
  };

  const handleClick = (post: IPost, event: React.MouseEvent<HTMLElement>) => {
    if (isFeatured) return;

    event.stopPropagation();
    navigate("/post", {
      replace: true,
      state: {
        post: post,
      },
    });
  };

  const handleExpand = () => {
    setExpand(!expand);
    !expand && setIsEditing(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedComment(e.currentTarget.value);
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
        const filteredComments = comments.filter(
          (comment) => comment.id !== isEditing.id
        );
        filteredComments.push(payload);
        updateComment && updateComment(filteredComments);
        handleCache(filteredComments);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsEditing(null);
    }
  };

  const handleCache = (newCache: IComment[]) => {
    const cachedPosts = localStorage.getItem("@blog/posts");

    if (!cachedPosts) return;

    const parsedPosts: IPost[] = JSON.parse(cachedPosts);

    const filteredPosts = parsedPosts.filter((post) => post.id !== content.id);

    const newValue = {
      ...content,
      comments: newCache,
    };

    filteredPosts.push(newValue);

    localStorage.setItem("@blog/posts", JSON.stringify(filteredPosts));
  };

  const handleEdit = (comment: IComment) => {
    if (isEditing?.id === comment.id) {
      setIsEditing(null);
      return;
    }

    setIsEditing(comment);
    setTimeout(() => {
      const input = document.getElementById(`input-${comment.id}`);
      if (input) {
        input.focus();
        input.innerHTML = comment.content;
      }
    }, 10);
  };

  const handleNewComment = async () => {
    if (!commentRef.current || !commentRef.current.value) return;
    const currentIndex = getCommentIndex();

    const payload = {
      content: commentRef.current.value,
      date: String(Date.now()),
      id: currentIndex,
      parent_id: null,
      postId: content.id,
      user: "Bruno",
    };

    try {
      const response = await api.post({
        endpoint: Endpoints.LOCAL,
        id: content.id,
        payload: payload,
      });
      setCommentIndex(currentIndex + 1);
      comments && comments.push(payload);
      handleCache(comments ? comments : [payload]);
      commentRef.current.value = "";
      setExpand(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Post onClick={handleClick.bind(null, content)}>
        <CardTitle>
          <h3>{content.title}</h3>
          <ImageContainer onClick={handleFavorite.bind(null, content)}>
            <img
              src={
                getFavorites().find((fav) => fav.id === content.id)
                  ? StarGold
                  : Star
              }
              alt="favorite"
            />
          </ImageContainer>
        </CardTitle>
        <span>{content.content}</span>
        <span>{content.description}</span>
        <CardFooter>
          <span>{content.publish_date}</span>
          <span>{content.author}</span>
        </CardFooter>
      </Post>
      {comments && (
        <ExpandableSection>
          <CommentSection>
            {comments.map((comment) => (
              <CommentContainer key={comment.id}>
                <div>
                  <EditableContainer>
                    {isEditing && isEditing.id === comment.id ? (
                      <textarea
                        id={`input-${comment.id}`}
                        onChange={handleChange}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") handleSubmit(event);
                        }}
                      />
                    ) : (
                      <span>{comment.content}</span>
                    )}
                  </EditableContainer>
                  <span onClick={handleEdit.bind(null, comment)}>E</span>
                </div>
                <div>
                  <span>{comment.user}</span>
                  <span>{comment.date}</span>
                </div>
              </CommentContainer>
            ))}
            <span onClick={handleExpand}>Add Comment</span>
          </CommentSection>
          <ExpandedContainer expanded={expand}>
            <input
              type="text"
              placeholder="Add a comment..."
              ref={commentRef}
            />
            <span onClick={handleNewComment}>S</span>
          </ExpandedContainer>
        </ExpandableSection>
      )}
    </Container>
  );
};

export default Card;
