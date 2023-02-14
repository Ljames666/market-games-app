import {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    Autoplay,
    EffectFade,
    EffectCube,
    EffectFlip,
    EffectCoverflow,
    EffectCards,
    EffectCreative,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { IGames } from '../../store/gamesSlice';
import Cards from '../cards/Cards';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
type CarouselProps = {
    data: IGames[];
    idCar: string;
};

function Carousel({ data, idCar }: CarouselProps) {
    return (
        <Swiper
            modules={[
                Navigation,
                Pagination,
                Scrollbar,
                A11y,
                Autoplay,
                EffectFade,
                EffectCube,
                EffectFlip,
                EffectCoverflow,
                EffectCards,
                EffectCreative,
            ]}
            key={idCar}
            spaceBetween={20}
            slidesPerView={4}
            navigation
            effect='coverflow'
            loop
        >
            {data.map((game) => (
                <SwiperSlide key={game.id} className='slide'>
                    <Cards data={game} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default Carousel;
