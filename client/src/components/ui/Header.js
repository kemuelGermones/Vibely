function Header({ username, fullname }) {
  return (
    <div>
      <div className="font-semibold">{username}</div>
      <div className="text-sm text-gray-500">{fullname}</div>
    </div>
  );
}

export default Header;
