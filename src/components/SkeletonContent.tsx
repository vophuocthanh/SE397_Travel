import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonContent() {
  return (
    <div className='flex items-center space-x-4'>
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[350px]' />
        <Skeleton className='h-4 w-[300px]' />
        <Skeleton className='h-4 w-[250px]' />
      </div>
    </div>
  );
}
