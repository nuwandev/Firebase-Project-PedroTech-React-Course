import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const res = await signInWithPopup(auth, provider);
    console.log(res);
    navigate("/");
  };

  return (
    <div className="text-center">
      <h1 className="text-lg font-semibold text-center m-10">
        Sign In with Google to continue
      </h1>
      <button
        onClick={signInWithGoogle}
        className="px-4 py-2 bg-blue-500 rounded cursor-pointer"
      >
        Sign In With Google
      </button>
    </div>
  );
};

export default Login;
