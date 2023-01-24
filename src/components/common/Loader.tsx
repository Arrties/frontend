export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid gap-2">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-3 h-3 bg-brand rounded-full animate-bounce1"></div>
          <div className="w-3 h-3 bg-brand rounded-full animate-bounce2"></div>
          <div className="w-3 h-3 bg-brand rounded-full animate-bounce3"></div>
        </div>
      </div>
    </div>
  );
}
