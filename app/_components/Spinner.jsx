import { FadeLoader } from "react-spinners";

function Spinner() {
  return (
    <div className="flex items-center justify-center  h-128 inset-0  backdrop-blur-xs">
      <FadeLoader color="hsl(14, 65%, 9%)" />
    </div>
  );
}

export default Spinner;
