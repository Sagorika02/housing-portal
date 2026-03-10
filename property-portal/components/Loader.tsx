export default function Loader() {
  return (
    <div className="flex items-center gap-2 mt-4 text-blue-600">
      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <span>Predicting price...</span>
    </div>
  );
}