function FileInput({
  id,
  name,
  title,
  onBlur,
  multiple,
  onChange,
  children,
  hasError,
  description,
}) {
  return (
    <label
      className={`relative block flex cursor-pointer flex-col items-center gap-3 rounded-lg border p-6 shadow ${
        hasError
          ? "border-red-500 bg-[url('../public/warning.svg')] bg-[length:1.3rem] bg-[right_0.5rem_top_0.5rem] bg-no-repeat"
          : "border-yellow-300"
      }`}
      htmlFor={id}
    >
      {children}
      <div className="text-center text-xl text-gray-700">{title}</div>
      <div className="text-center text-gray-500">{description}</div>
      <input
        className="absolute -z-10 w-0"
        type="file"
        id={id}
        name={name}
        multiple={multiple}
        onChange={onChange}
        onBlur={onBlur}
      />
    </label>
  );
}

export default FileInput;
