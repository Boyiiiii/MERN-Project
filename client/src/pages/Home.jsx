import { Link } from "react-router-dom";

import CallToAction from "../components/CallToAction";
import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";
export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getPosts");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <div className=" flex flex-col gap-5 px-3 lg:p-32 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome To The Blog</h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          Welcome Welcome Welcome Welcome Welcome Welcome Welcome Welcome
          Welcome Welcome Welcome Welcome Welcome{" "}
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          View All Posts
        </Link>
      </div>
      <div className="p-3 bg-amber-100 dark:bg-slate-700">
        <CallToAction />
      </div>

      <div className="w-auto mx-auto p-3 flex flex-col gap-8 py-7 items-center">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-semibold text-center mb-5">
              Recent Posts{" "}
            </h2>
            <div className="flex flex-wrap gap-10">
              {posts.map((post) => (
                <PostCard key={post._id} post={post}></PostCard>
              ))}
            </div>
            <Link
              to="/search"
              className="text-lg text-teal-500 hover: underline text-center"
            >
              View All Posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
