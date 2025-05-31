const InputError = ({ message }: { message: string | undefined }) => {
  return message && <p className="text-destructive text-sm">{message}</p>;
};

export default InputError;
