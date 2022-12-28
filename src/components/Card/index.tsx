import { cp } from "fs";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, StarGold } from "../../assets";
import { useBaseContext } from "../../contexts";
import { IComment, IPost } from "../../types/common";
import { paths } from "../../utils/paths";
import {
  CardFooter,
  CardTitle,
  CommentContainer,
  Container,
  DateAndAuthor,
  ExpandableContainer,
  ImageContainer,
} from "./styles";

interface ICard {
  content: IPost;
  isFeatured: boolean;
  comments?: IComment[];
}

const Card: React.FC<ICard> = ({ content, isFeatured, comments }) => {
  const navigate = useNavigate();
  const basePath = `@blog/${
    paths.filter((path) => path.includes("favorites"))[0]
  }`;
  const { getFavorites, setFavorites } = useBaseContext();
  const [expand, setExpand] = useState(false);

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
  };

  return (
    <Container onClick={handleClick.bind(null, content)} expanded={expand}>
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
        <DateAndAuthor>
          <span>{content.publish_date}</span>
          <span>{content.author}</span>
        </DateAndAuthor>
        <div>
          <span onClick={handleExpand}>Comments</span>
        </div>
      </CardFooter>
      <ExpandableContainer expanded={expand}>
        {expand && (
          <>
            {comments &&
              comments.map((comment) => (
                <CommentContainer key={comment.id} expanded={expand}>
                  <div>
                    <span>{comment.content}</span>
                    <span>E</span>
                  </div>
                  <div>
                    <span>{comment.user}</span>
                    <span>{comment.date}</span>
                  </div>
                </CommentContainer>
              ))}
            {/* <span>Some random comments</span>
            <span>Some random comments</span>
            <span>Some random comments</span>
            <span>Some random comments</span> */}
          </>
        )}
      </ExpandableContainer>
    </Container>
  );
};

export default Card;
