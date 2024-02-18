import { Link } from "react-router-dom";

export default function Error404() {
  return (
    <div className="mt-10 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center">
        Error 404
      </h1>

      <div className="mt-4 flex justify-center gap-4">
        <Link
          to="/"
          className="py-2 px-4 text-center no-underline text-pink-400 border border-pink-200 hover:border-pink-300 hover:bg-pink-50 shadow-sm hover:shadow rounded-md duration-200"
        >
          <i className="fa-solid fa-home fa-fw fa-lg"></i>
        </Link>
        <Link
          to="/about"
          className="py-2 px-4 text-center no-underline text-pink-400 border border-pink-200 hover:border-pink-300 hover:bg-pink-50 shadow-sm hover:shadow rounded-md duration-200"
        >
          ... <i className="fa-solid fa-question-circle fa-fw fa-lg"></i>
        </Link>
      </div>
    </div>
  );
}
