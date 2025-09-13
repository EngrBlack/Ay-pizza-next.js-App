function Flexitem({ label, children, className }) {
  return (
    <div
      className={`flex justify-between items-start text-brown-300 ${className}`}
    >
      <p className="capitalize whitespace-nowrap">{label}</p>
      <div className="font-bold basis-[75%] md:[60%] text-right">
        {children}
      </div>
    </div>
  );
}

export default Flexitem;
