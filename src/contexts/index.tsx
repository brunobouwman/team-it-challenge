import React, { createContext, useContext, useState } from "react";

import { IPost } from "../types/common";

export interface IContext {
  getPosts: () => IPost[];
  setPosts: (postArray: IPost[]) => void;
  getFavorites: () => IPost[];
  setFavorites: (favorites: IPost[]) => void;
  getLayout: () => boolean;
  setLayout: (layout: boolean) => void;
}

type ContextProps = {
  children: React.ReactNode;
};

const BaseContext = createContext({} as IContext);

const Context: React.FC<ContextProps> = ({ children }) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [favorites, setFavorites] = useState<IPost[]>([]);
  const [layout, setLayout] = useState(false);

  const getPosts = () => posts;
  const getFavorites = () => favorites;
  const getLayout = () => layout;

  const values = {
    getPosts,
    setPosts: (postArray: IPost[]) => setPosts(postArray),
    getFavorites,
    setFavorites: (favorites: IPost[]) => setFavorites(favorites),
    getLayout,
    setLayout: (layout: boolean) => setLayout(layout),
  };

  return <BaseContext.Provider value={values}>{children}</BaseContext.Provider>;
};

const useBaseContext = () => useContext(BaseContext);

export { useBaseContext, Context };
