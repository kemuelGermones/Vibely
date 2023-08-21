function Avatar({ src, alt }) {
  return (
    <div className="h-10 w-10 shrink-0">
      <img
        className="h-full w-full rounded-full object-cover"
        src={src}
        alt={alt}
      />
    </div>
  );
}

export default Avatar;
