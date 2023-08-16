function Input({
  error,
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  onClick,
}) {
  return (
    <input
      className={`w-full rounded-lg p-3 shadow ${
        error
          ? "border-red-500 bg-[url('../public/warning.svg')] bg-[length:1.3rem] bg-[right_0.5rem_center] bg-no-repeat focus:border-red-500 focus:ring-red-500"
          : "border-yellow-400 focus:border-yellow-400 focus:ring-yellow-400"
      }`}
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onClick={onClick}
    />
  );
}

export default Input;
