"use client";
import { TypePrompt } from "@/components/Feed";
import Profile from "@/components/Profile";
import { IPrompt } from "@/models/prompt";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

const ProfilePage = (props: Props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState<TypePrompt[]>([]);
  const handleEdit = (post: TypePrompt) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post: TypePrompt) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    ); //function của browser => hộp thoại ok và cancel
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id}`, {
          method: "DELETE",
        });
        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };
    if (session?.user.id) fetchPost();
  }, []);
  return (
    <Profile
      name="My"
      desc="Welcome to  your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
