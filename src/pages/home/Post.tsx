import {
  addDoc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import type { TPost } from "./Home";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

type PostProps = {
  post: TPost;
};

type TLike = {
  userId: string;
};

const Post = ({ post }: PostProps) => {
  const [likes, setLikes] = useState<TLike[] | null>(null);

  const likesRef = collection(db, "likes");
  const [user] = useAuthState(auth);

  const likesDoc = query(likesRef, where("postId", "==", post.id));

  const addLike = async () => {
    try {
      await addDoc(likesRef, { userId: user?.uid, postId: post.id });
    } catch (err) {
      console.log("err :" + err);
    }
  };

  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );

      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeToDelete = doc(db, "likes", likeToDeleteData.docs[0].id);
      await deleteDoc(likeToDelete);
    } catch (err) {
      console.log("err :" + err);
    }
  };

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(data.docs.map((doc) => ({ userId: doc.data().userId })));
  };

  const isLiked = likes?.find((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
  });

  return (
    <div className="bg-zinc-900 rounded-xl shadow-md p-5 mb-6 border border-zinc-800 mx-auto w-full max-w-xs hover:shadow-xl transition-all duration-200 flex flex-col gap-3">
      <div className="flex items-center gap-3 mb-2">
        <img
          src={`https://ui-avatars.com/api/?name=${post.username}&background=random`}
          alt="profile picture"
          className="w-10 h-10 rounded-full border border-zinc-700 object-cover"
        />
        <h3 className="font-semibold text-white text-base">{post.username}</h3>
      </div>
      <div>
        <h3 className="text-lg font-bold text-white mb-1">{post.title}</h3>
        <p className="text-zinc-300 whitespace-pre-line text-sm">
          {post.description}
        </p>
      </div>
      <div className="flex items-center justify-end">
        <span>{likes?.length}</span>
        <button
          onClick={!isLiked ? addLike : removeLike}
          className="text-zinc-400 hover:text-blue-400 transition-colors text-xl cursor-pointer"
          title="Like"
        >
          {isLiked ? <span>&#128078;</span> : <span>&#128077;</span>}
        </button>
      </div>
    </div>
  );
};

export default Post;
