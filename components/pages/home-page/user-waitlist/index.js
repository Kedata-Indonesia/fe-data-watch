import { RightArrowIcon, LeftArrowIcon } from '@/components/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper';
import { useWindowWidth } from '@react-hook/window-size';
import SwiperNavigation from '@/components/pages/home-page/swiper-navigation';
import 'swiper/css';
import 'swiper/css/pagination';

const UserWaitlist = ({ testimonials }) => {
  const windowWidth = useWindowWidth();
  return (
    <div className="relative flex">
      <SwiperNavigation className="swiper-button-prev -left-0 md:-left-16">
        <LeftArrowIcon classname="w-5" />
      </SwiperNavigation>
      <SwiperNavigation className="swiper-button-next -right-0 md:-right-16">
        <RightArrowIcon classname="w-5" />
      </SwiperNavigation>

      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        slidesPerView={windowWidth > 500 ? 2 : 1}
        pagination={{ clickable: true, type: 'bullets' }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        autoplay={{ pauseOnMouseEnter: true }}
        className="!pb-12"
      >
        {testimonials &&
          testimonials.payload.map(item => (
            <SwiperSlide key={item.full_name}>
              <div className="flex flex-col items-center border-l border-r border-c-red-50 p-8">
                <p className="font-archivo font-bold text-c-red-600">{item.full_name}</p>
                <p className="mb-6 text-sm italic text-c-red-300">{item.organization}</p>
                <p className="text-center text-[10px] md:text-sm">{item.reason}</p>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default UserWaitlist;
