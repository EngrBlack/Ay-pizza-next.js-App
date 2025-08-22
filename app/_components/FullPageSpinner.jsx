import { RingLoader } from "react-spinners";

function FullPageSpinner() {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center">
      {/* <div className="w-12 h-12 border-4 border-cream-200 border-t-transparent rounded-full animate-spin" /> */}

      <RingLoader color="hsl(20, 50%, 98%)" size={80} />
    </div>
  );
}

export default FullPageSpinner;
