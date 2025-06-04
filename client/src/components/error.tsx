const Error = ({ message }: { message: string }) => {
  return (
    <div className="grow flex items-center justify-center">
      <p className="text-destructive">{message}</p>
    </div>
  );
};

export default Error;
