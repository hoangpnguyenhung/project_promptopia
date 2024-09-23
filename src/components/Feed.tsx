"use client";

import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import { IPrompt } from "@/models/prompt";
import { IUser } from "@/models/user";

interface newCreator extends IUser {
  _id: string;
}

export interface TypePrompt extends Omit<IPrompt, "creator"> {
  creator: newCreator;
}

type PromptCardListProps = {
  data: TypePrompt[];
  handleTagClick: (e: React.MouseEvent<HTMLElement>) => void;
};

const PromptCardList: React.FC<PromptCardListProps> = ({
  data,
  handleTagClick,
}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id.toString()}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [posts, setPosts] = useState<TypePrompt[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    };
    fetchPost();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center ">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
