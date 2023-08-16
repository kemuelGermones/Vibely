function Button({ theme, type, disabled, onClick, children }) {
  if (theme === "secondary") {
    return (
      <button
        className={`rounded-lg bg-gray-500 px-4 py-2 font-semibold text-white shadow ${
          disabled ? "" : "hover:bg-gray-700"
        } focus:outline-none"`}
        type={type}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  if (theme === "danger") {
    return (
      <button
        className={`rounded-lg bg-red-500 px-4 py-2 font-semibold text-white shadow ${
          disabled ? "" : "hover:bg-red-600"
        } focus:outline-none`}
        type={type}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      className={`rounded-lg bg-yellow-400 px-4 py-2 font-semibold text-white shadow ${
        disabled ? "" : "hover:bg-yellow-500"
      } focus:outline-none"`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
