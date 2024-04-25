import { cn } from '@/lib/utils';
import { useInView } from 'react-intersection-observer';
interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function SectionInViewDown({ children, className }: Props) {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });
  return (
    <div ref={ref} className={cn(className, { 'animate-fade-down': inView })}>
      {children}
    </div>
  );
}
