interface LoaderProps {
  message: string;
}

function Loader(props: LoaderProps) {
  const { message } = props;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg text-center">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
        </div>
        <div className="justify-center mt-4!">
          <p className="text-gray-600">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default Loader;
