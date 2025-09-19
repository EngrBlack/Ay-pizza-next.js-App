import { createContext, useContext } from "react";

const TableContext = createContext();

function Table({ children, size, className }) {
  return (
    <TableContext.Provider value={{ size }}>
      <div
        className={`border-2 border-cream-100 text-center  rounded shadow-md ${className} w-full`}
      >
        {children}
      </div>
    </TableContext.Provider>
  );
}

function useTable() {
  const context = useContext(TableContext);
  if (context === undefined)
    throw new Error("TableContext was used outside the TableProvider");

  return context;
}

function Header({ children }) {
  const { size } = useTable();
  return (
    <div
      className={`font-bold text-sm md:text-md p-3 uppercase grid gap-2  place-items-center border border-brown-300 bg-brown-300 text-cream-200 rounded-t-sm  ${size} `}
    >
      {children}
    </div>
  );
}
function Body({ children, className }) {
  const { size } = useTable();
  return (
    <div
      className={`grid place-items-center gap-2 border-x border-b border-brown-100  ${size} hover:bg-brown-200 hover:text-cream-200  trans last:rounded-b-sm ${className}`}
    >
      {children}
    </div>
  );
}

function Footer({ children, className }) {
  const { size } = useTable();
  return (
    <div
      className={`grid place-items-center gap-2 border-x border-b border-brown-100  ${size} hover:bg-brown-200 hover:text-cream-200  trans last:rounded-b-sm ${className}`}
    >
      {children}
    </div>
  );
}

Table.Header = Header;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
