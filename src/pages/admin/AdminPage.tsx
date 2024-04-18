import { getBestTripAdmin } from '@/apis/best-trip';
import { getLocation } from '@/apis/location';
import { getUserTotal } from '@/apis/me';
import { SkeletonContent } from '@/components/SkeletonContent';
import { AppContext, AppContextType } from '@/contexts/app.context';
import useCheckRole from '@/hooks/useCheckRole';
import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminPage() {
  const { isAuthenticated } = useContext<AppContextType>(AppContext);

  const isAdmin = useCheckRole();
  const navigate = useNavigate();

  const { data: queryGetBestTrip } = useQuery({
    queryKey: ['getBestTripAdmin'],
    queryFn: () => getBestTripAdmin(),
    enabled: true,
  });
  console.log('queryGetBestTrip:', queryGetBestTrip);

  const { data: queryGetLocation } = useQuery({
    queryKey: ['getLocationAdmin'],
    queryFn: () => getLocation(),
  });
  const { data: queryGetUser } = useQuery({
    queryKey: ['getUserTotal'],
    queryFn: () => getUserTotal(),
  });

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className='flex flex-wrap items-center w-full gap-6'>
      <div className='flex h-40 p-4 bg-green-400 border rounded-md w-96'>
        {queryGetBestTrip ? (
          <p className='text-xl font-bold text-white'>
            Số tour hiện tại trên hệ thống: {queryGetBestTrip?.data?.total} tour
          </p>
        ) : (
          <SkeletonContent />
        )}
      </div>
      <div className='flex h-40 p-4 bg-yellow-400 border rounded-md w-96'>
        {queryGetLocation ? (
          <p className='text-xl font-bold text-white'>
            Số địa điểm hiện tại trên hệ thống: {queryGetLocation?.data?.total}{' '}
            địa điểm
          </p>
        ) : (
          <SkeletonContent />
        )}
      </div>
      <div className='flex h-40 p-4 bg-red-400 border rounded-md w-96'>
        {queryGetUser ? (
          <p className='text-xl font-bold text-white'>
            Số người hiện tại trên hệ thống: {queryGetUser?.data?.total} người
          </p>
        ) : (
          <SkeletonContent />
        )}
      </div>
    </div>
  );
}
