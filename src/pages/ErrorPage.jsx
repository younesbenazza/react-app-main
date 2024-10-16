import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex justify-center items-center font-bold">
      <div className="">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
        <p>
          return to{" "}
          <Link className="p-1 bg-red-400 rounded-lg" to={"/"}>
            the homepage
          </Link>
        </p>
      </div>
    </div>
  );
}
