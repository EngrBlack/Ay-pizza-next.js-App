function Map() {
  return (
    <div className="basis-1/2 mx-auto w-full max-w-screen-sm aspect-video overflow-hidden rounded-md bg-brown-50 relative group shadow-lg">
      <div className="w-full h-full group-hover:brightness-[80%] transition-all duration-300 ease-in-out ">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.0437694030156!2d3.3946139750401447!3d6.516144393476288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8d213de988cd%3A0xd6dd6f4030acc37a!2sAY%20Pizza!5e0!3m2!1sen!2sng!4v1753666312980!5m2!1sen!2sng"
          className="w-full h-full border-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <p className="text-xl lg:text-3xl font-rowdies text-cream-100 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center text-shadow-lg opacity-0 group-hover:opacity-100 trans ease-in-out">
        <span> AY PIZZA</span>
        <span>LOCATION</span>
      </p>
    </div>
  );
}

export default Map;
