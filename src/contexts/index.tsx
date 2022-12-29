import React, { createContext, useContext, useState } from "react";

import { IPost } from "../types/common";

export interface IContext {
  getPosts: () => IPost[];
  setPosts: (postArray: IPost[]) => void;
  getFavorites: () => IPost[];
  setFavorites: (favorites: IPost[]) => void;
  getLayout: () => boolean;
  setLayout: (layout: boolean) => void;
  getCommentIndex: () => number;
  setCommentIndex: (index: number) => void;
}

type ContextProps = {
  children: React.ReactNode;
};

const BaseContext = createContext({} as IContext);

const Context: React.FC<ContextProps> = ({ children }) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [favorites, setFavorites] = useState<IPost[]>([]);
  const [layout, setLayout] = useState(false);
  const [commentIndex, setCommentIndex] = useState(0);

  const getPosts = () => posts;
  const getFavorites = () => favorites;
  const getLayout = () => layout;
  const getCommentIndex = () => commentIndex;

  const values = {
    getPosts,
    setPosts: (postArray: IPost[]) => setPosts(postArray),
    getFavorites,
    setFavorites: (favorites: IPost[]) => setFavorites(favorites),
    getLayout,
    setLayout: (layout: boolean) => setLayout(layout),
    getCommentIndex,
    setCommentIndex: (index: number) => setCommentIndex(index),
  };

  return <BaseContext.Provider value={values}>{children}</BaseContext.Provider>;
};

const useBaseContext = () => useContext(BaseContext);

export { useBaseContext, Context };
