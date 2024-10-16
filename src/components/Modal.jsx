export default function Modal({ open, onClose, children }) {
  return (
    <div
      className={` z-50 fixed inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-black/25" : "invisible"
      } `}
      onClick={onClose}
    >
      <div
        className={`w-auto bg-neutral-50 rounded-lg shadow p-6 transition-all  ${
          open ? "scale-100 opacity-100" : "scale-110 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 left-2 px-2 rounded-md text-gray bg-neutral-50 hover:bg-red-400 hover:text-gray-300 "
          onClick={onClose}
        >
          x
        </button>
        {children}
      </div>
    </div>
  );
}
