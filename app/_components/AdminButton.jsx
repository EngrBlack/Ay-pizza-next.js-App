function AdminButton({ children, onClick, icon }) {
  return (
    <button
      className="bg-brown-300 text-cream-200 py-1.5 px-3 rounded-md flex items-center gap-2 hover:bg-brown hover:-translate-y-0.5 active:translate-y-0 trans animate-pulse hover:animate-none"
      onClick={onClick}
    >
      {icon === "empty" ? null : <span className="text-lg">+</span>}
      <span>{children}</span>
    </button>
  );
}

export default AdminButton;
