export default function Modal({
  open,
  onClose,
  applyClass,
  title,
  staticBackdrop = false,
  children,
}) {
  const handleCloseOnClickingOutside = (e) => {
    if (!staticBackdrop) {
      if (e.target.id === "wrapper") onClose();
    }
  };

  return (
    <div
      id="wrapper"
      onClick={handleCloseOnClickingOutside}
      className={`fixed inset-0 flex justify-center duration-300 ease-in-out z-50 ${
        open ? "visible bg-black/60" : "invisible"
      }`}
    >
      {title && (
        <div
          className={`absolute z-50 w-11/12 lg:w-3/5 max-h-[80%] bg-white rounded-tl-md rounded-tr-md shadow pt-3 pb-2 px-8 duration-300 ease-in-out overflow-y-auto ${applyClass} ${
            open ? "top-20 opacity-100" : "top-0 opacity-0"
          } flex justify-between`}
        >
          <h3>{title}</h3>
          <button
            onClick={onClose}
            className="py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded"
          >
            X
          </button>
        </div>
      )}
      <div
        className={`absolute w-11/12 lg:w-3/5 max-h-[80%] bg-white rounded-md shadow pt-4 pb-6 px-8 duration-300 ease-in-out overflow-y-auto ${applyClass} ${
          open ? "top-20 opacity-100" : "top-0 opacity-0"
        }`}
      >
        <div className={title && "mt-14"}>{children}</div>
      </div>
    </div>
  );
}
