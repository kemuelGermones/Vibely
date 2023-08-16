function Textarea({
  height,
  error,
  id,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
}) {
  return (
    <textarea
      className={`resize-none rounded-lg p-3 shadow ${height ? height : ""}  ${
        error
          ? "border-red-500 bg-[url('../public/warning.svg')] bg-[length:1.3rem] bg-[right_0.5rem_top_0.5rem] bg-no-repeat focus:border-red-500 focus:ring-red-500"
          : "border-yellow-400 focus:border-yellow-400 focus:ring-yellow-400"
      }`}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}

export default Textarea;
