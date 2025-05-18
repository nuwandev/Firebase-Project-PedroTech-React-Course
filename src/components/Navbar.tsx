import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

const Navbar = () => {
 const [user] = useAuthState(auth);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-cyan-950 shadow-md">
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="text-lg text-cyan-100 hover:text-white transition"
        >
          Home
        </Link>
        {user && <Link to="/createpost">Create Post</Link>}
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-cyan-100">
              Hello,
              <span className="font-semibold">
                {user.displayName || "User"}
              </span>
            </span>
            <img
              src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=random`}
              alt=""
              width={40}
              height={40}
              className="rounded-full object-cover border-2 border-cyan-300"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== `https://ui-avatars.com/api/?name=${user.displayName}&background=random`) {
                  target.src = `https://ui-avatars.com/api/?name=${user.displayName}&background=random`;
                }
              }}
            />
            <button
              onClick={handleLogout}
              className="ml-2 px-3 py-1 bg-cyan-800 text-cyan-100 rounded hover:bg-cyan-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="text-lg text-cyan-100 hover:text-white transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;