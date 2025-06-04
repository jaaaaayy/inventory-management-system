import { LoaderCircle } from "lucide-react";

const Loading = ({ feature }: { feature: string }) => {
  return (
    <div className="grow flex flex-col gap-2 items-center justify-center">
      <LoaderCircle className="animate-spin" />
      <p>Loading {feature}...</p>
    </div>
  );
};

export default Loading;
