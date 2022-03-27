import { usePost } from "../context/postContext";
import { VscEmptyWindow } from "react-icons/vsc";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";

export const HomePage = () => {
  const { posts } = usePost();

  if (posts.length === 0)
    return (
      <div className="flex flex-col justify-center items-center">
        <Link to="/new">Crear nuevo post </Link>
        <VscEmptyWindow className="w-48 h-48 text-white" />
        <h1>No hay publicaciones aun</h1>
      </div>
    );

  return (
    <div className="text-white">
      <header className="flex justify-between py-4" >
        <h1 className=" text-2xl " >Total posts({posts.length})</h1>

        <Link to="/new">Crear nuevo post </Link>
      </header>
      <div className="grid grid-cols-3 gap-2 text-sm py-2 px-1">
        {posts.map((post, i) => (
          <PostCard post={post} key={i} />
        ))}
      </div>
    </div>
  );
};
