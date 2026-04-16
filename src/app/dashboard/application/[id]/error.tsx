"use client";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorPage = ({ error, reset }: ErrorProps) => {
  console.log("Error:", error.message);
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>

      <p className="text-sm text-gray-500 mb-4">Please try again.</p>

      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-black text-white rounded-md"
      >
        Retry
      </button>
    </div>
  );
};

export default ErrorPage;
