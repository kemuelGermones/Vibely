function Card({ children }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg bg-white p-3 shadow ">
      {children}
    </div>
  );
}

export default Card;
