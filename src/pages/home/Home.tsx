import { getDocs, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useEffect, useState } from "react";
import Post from "./Post";
import { useAuthState } from "react-firebase-hooks/auth";

export type TPost = {
  id: string;
  userId: string;
  title: string;
  username: string;
  description: string;
};

const Home = () => {
  const [postsList, setPostsList] = useState<TPost[] | null>(null);
  const postsRef = collection(db, "posts");
  const [user] = useAuthState(auth);

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    setPostsList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as TPost[]
    );
  };

  useEffect(() => {
    getPosts();
  });

  return (
    <div
      className="flex flex-wrap gap-5 justify-center items-start w-full max-w-6xl mx-auto py-8"
    >
      {!user
      ? "You have to login before seeing posts"
      : postsList?.map((post) => <Post key={post.id} post={post} />)}
    </div>
  );
};

export default Home;
