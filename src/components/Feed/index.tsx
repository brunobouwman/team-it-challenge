import React from "react";
import { IPost } from "../../types/common";
import Card from "../Card";
import { Container } from "./styles";

interface IFeed {
  content: IPost[];
  layout: string;
}

const Feed: React.FC<IFeed> = ({ content, layout }) => {
  return (
    <Container layout={layout}>
      {content.length !== 0 &&
        content.map((post) => (
          <Card content={post} key={post.id} isFeatured={false} />
        ))}
    </Container>
  );
};

export default Feed;
