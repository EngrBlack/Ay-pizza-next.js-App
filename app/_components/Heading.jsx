function Heading({ children }) {
  return (
    <h1 className="font-display capitalize text-3xl bg-transparent sm:text-4xl xl:text-5xl relative w-fit mx-auto mb-8 md:mb-14 pb-4.5 sm:pb-4 bg-linear-to-r from-gradient-1 to-gradient-2 bg-clip-text text-transparent after:content-[''] after:absolute after:bottom-0 md:after:-bottom-3 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-1.5 after:bg-orangered-100 after:rounded ">
      {children}
    </h1>
  );
}

export default Heading;
