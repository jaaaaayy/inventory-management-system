import { Spinner } from "@/components/ui/spinner";

const Loading = ({ feature }: { feature?: string }) => {
  return (
    <div className="flex grow flex-col items-center justify-center gap-2 p-6 text-muted-foreground">
      <Spinner className="size-5" />
      <p className="text-xs">Loading{feature && " " + feature}...</p>
    </div>
  );
};

export default Loading;
