import { RingLoader } from "react-spinners";

function FullPageSpinner() {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center w-screen">
      <RingLoader color="hsl(20, 50%, 98%)" size={120} />
    </div>
  );
}

export default FullPageSpinner;
