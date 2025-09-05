function ContactCard({ children, icon }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="bg-white  p-2 rounded-full">{icon}</span>
      <p className="font-rowdies text-sm md:text-base tracking-wider">
        {children}
      </p>
    </div>
  );
}
export default ContactCard;
