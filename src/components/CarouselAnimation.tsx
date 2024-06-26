import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true, Animation: 'slide' })
  );
  const images = [
    'https://vcdn-dulich.vnecdn.net/2022/06/16/World-Travel-1-2359-1655367719.jpg',
    'https://saigonesetourist.com/uploads/source//slider/vietnam-travel-1-e1589713772739.jpg',
    'https://image.kkday.com/v2/image/get/w_960%2Cc_fit%2Cq_55%2Ct_webp/s1.kkday.com/product_127224/20220311100624_nVE1x/png',
    'https://cdn3.ivivu.com/2022/07/Gi%E1%BB%9Bi-thi%E1%BB%87u-du-l%E1%BB%8Bch-%C4%90%C3%A0-N%E1%BA%B5ng-ivivu-1.jpg',
    'https://sealifegroup.com/storage/files/du-lich-nha-trang-01.jpeg',
  ];
  return (
    <Carousel
      plugins={[plugin.current]}
      className='w-full'
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {images.map((_, index) => (
          <CarouselItem key={index}>
            <div className='relative top-0'>
              <Card>
                <CardContent className='flex items-center justify-center'>
                  <img
                    src={images[index]}
                    alt=''
                    className='object-cover w-full h-[50rem]'
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
