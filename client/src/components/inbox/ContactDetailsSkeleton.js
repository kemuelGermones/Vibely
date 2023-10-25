function ContactDetailsSkeleton() {
  return (
    <div className="flex items-center gap-3 p-3">
      <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-gray-300" />
      <div className="flex w-full flex-col gap-1">
        <div className="h-3.5 max-w-[96px] animate-pulse rounded-full bg-gray-300" />
        <div className="h-3.5 max-w-[144px] animate-pulse rounded-full bg-gray-300" />
      </div>
    </div>
  );
}

export default ContactDetailsSkeleton;
