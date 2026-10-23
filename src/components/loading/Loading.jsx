import { BeatLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <BeatLoader color="blue" />
    </div>
  );
};

export default Loading;