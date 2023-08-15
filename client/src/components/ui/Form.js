function Form({ children, onSubmit }) {
  return (
    <form className="flex flex-col gap-3" onSubmit={onSubmit}>
      {children}
    </form>
  );
}

export default Form;
