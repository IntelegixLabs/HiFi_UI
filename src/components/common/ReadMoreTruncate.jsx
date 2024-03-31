import { Fragment, useState } from "react";

export default function ReadMoreTruncate({ text, maxLength = 200 }) {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  return (
    <div>
      {isTruncated ? (
        <Fragment>
          {text.slice(0, maxLength)}...
          &nbsp;
          <button
            className="text-gray-400 hover:text-gray-500 hover:underline"
            onClick={toggleTruncate}
          >
            Read more
          </button>
        </Fragment>
      ) : (
        <Fragment>
          {text}
          &nbsp;&nbsp;
          <button
            className="text-gray-400 hover:text-gray-500 hover:underline"
            onClick={toggleTruncate}
          >
            Read less
          </button>
        </Fragment>
      )}
    </div>
  );
}
