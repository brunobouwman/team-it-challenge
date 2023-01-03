import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Star, StarGold } from "../../assets";
import { useBaseContext } from "../../contexts";
import { IComment, IPost } from "../../types/common";
import { paths } from "../../utils/paths";
import CommentSection from "../CommentSection";
import {
  CardFooter,
  CardTitle,
  Post,
  ImageContainer,
  Container,
  CardContent,
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
  const { getFavorites, setFavorites } = useBaseContext();

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

  useEffect(() => {}, []);

  return (
    <Container>
      <Post onClick={handleClick.bind(null, content)} isFeatured={isFeatured}>
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
        <CardContent>
          <span>
            {content.content.replaceAll("<p>", "").replaceAll("</p>", "\n\n")}
          </span>
          <span>{content.description}</span>
        </CardContent>
        <CardFooter>
          <span>{content.publish_date}</span>
          <span>{content.author}</span>
        </CardFooter>
      </Post>
      {comments && (
        <CommentSection
          content={content}
          comments={comments}
          updateComment={updateComment}
        />
      )}
    </Container>
  );
};

export default Card;
