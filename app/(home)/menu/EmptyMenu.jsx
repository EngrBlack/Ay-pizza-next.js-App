function EmptyMenu() {
  return (
    <div className="text-center flex flex-col items-center justify-center gap-3 w-5/6 mx-auto h-[calc(100vh-70vh)] md:h-[calc(100vh-80vh)] mb-20 sm:mb-30">
      <p className="font-rowdies text-2xl">No menu items available...😔</p>
      <p className="text-brown-300 font-bold underline">
        Try reloading the page, or check your internet connection.
      </p>
    </div>
  );
}

export default EmptyMenu;
