export default function Loading() {
  return (
    <div className='bg-background flex min-h-screen animate-pulse flex-col items-center justify-center p-8'>
      <div className='flex flex-col items-center space-y-4'>
        <div className='bg-muted h-64 w-64 rounded-full shadow-sm'></div>
        <div className='bg-muted h-8 w-48 rounded'></div>
        <div className='flex gap-4'>
          <div className='bg-muted h-5 w-24 rounded'></div>
          <div className='bg-muted h-5 w-24 rounded'></div>
        </div>
      </div>
    </div>
  );
}
