export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 bg-background animate-pulse">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-64 w-64 rounded-full bg-muted shadow-sm"></div>
        <div className="h-8 w-48 rounded bg-muted"></div>
        <div className="flex gap-4">
          <div className="h-5 w-24 rounded bg-muted"></div>
          <div className="h-5 w-24 rounded bg-muted"></div>
        </div>
      </div>
    </div>
  );
}
