import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";

type FormType = {
  title: string;
  description: string;
};

const Form = () => {
  const [user] = useAuthState(auth);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const schema = yup.object().shape({
    title: yup.string().required("You must add a title"),
    description: yup.string().required("You must add a description"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, "posts");

  const onCreatePost = async (data: FormType) => {
    try {
      await addDoc(postsRef, {
        ...data,
        username: user?.displayName,
        userId: user?.uid,
      });
      setSuccessMessage("Post created successfully!");
      setErrorMessage("");
      reset();
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error: unknown) {
      setErrorMessage(`Error creating post ${error}`);
      setSuccessMessage("");
    }
  };

  return (
    <form
      className="flex gap-2 flex-col justify-center max-w-sm w-full mt-10"
      onSubmit={handleSubmit(onCreatePost)}
    >
      <input
        className="border border-cyan-300 px-4 py-2 rounded w-full focus:outline-0 focus:ring focus: ring-cyan-200"
        type="text"
        placeholder="Title"
        {...register("title")}
      />
      <p className="text-red-600 mb-1 ml-3">{errors.title?.message}</p>
      <textarea
        className="resize-none border border-cyan-300 px-4 py-2 rounded focus:outline-0 focus:ring focus:ring-cyan-200 h-32"
        placeholder="Description..."
        {...register("description")}
      />
      <p className="text-red-600 mb-1 ml-3">{errors.description?.message}</p>
      <input
        className="bg-cyan-800 rounded py-2 w-full cursor-pointer hover:bg-cyan-700"
        type="submit"
      />
      {successMessage ? (
        <p className="text-green-600 text-center mt-2">{successMessage}</p>
      ) : (
        <p className="text-red-600 text-center mt-2">{errorMessage}</p>
      )}
    </form>
  );
};

export default Form;
