import { useEffect, useRef } from "react";
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode } from "swiper";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice"
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

import "swiper/css"
import "swiper/css/free-mode"

const TopChartCard = ({ children, topCharts, link }) => {
  return (
    <>
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center sm:mt-0 mt-6 sm:mb-0 mb-4">
          <h2 className="text-white font-bold text-xl">{topCharts}</h2>
          <Link to={link}>
            <p className="text-gray-300 text-base cursor-pointer">See More</p>
          </Link>
        </div>
        {children}
      </div>
    </>

  )
}

const TopPlay = () => {
  const dispatch = useDispatch()
  const { activeSong, isPlaying } = useSelector((state) => state.player)
  const { data } = useGetTopChartsQuery()
  const divRef = useRef(null)

  const topPlays = data?.filter(item => item.artists).slice(0, 5)

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" })
  })

  const handlePauseClick = () => {
    dispatch(playPause(false));
  }

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  }

  return (
    <div className="mt-4 flex flex-col gap-1 sm:ml-6 ml-0">
      <div className="ml-0 xl:mb-0 mb-6 flex-1 xl:max-2-[500px] max-w-full flex flex-col" ref={divRef}>
        <TopChartCard topCharts="Top Charts" link="/top-charts">
          {
            topPlays?.map((song, i) => (
              <div key={i} className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 rounded-lg cursor-pointer mb-2 text-gray-200">
                <h3 className="font-bold text-base mr-3">{i + 1}.</h3>
                <div className="flex-1 flex flex-row justify-between items-center">
                  <img className="w-20 h-20 rounded-lg" src={song?.images.coverart}
                    alt={song?.name} />
                  <div className="flex-1 flex flex-col justify-center mx-3">
                    <Link to={`/songs/${song.key}`}>
                      <p className="text-lg font-bold">{song?.title}</p>
                    </Link>
                    <Link to={`/artists/${song?.artists[0].adamid}`}>
                      <p className="text-base mt-1 text-gray-400">{song?.subtitle}</p>
                    </Link>
                  </div>
                </div>
                <PlayPause isPlaying={isPlaying} activeSong={activeSong} song={song} handlePause={handlePauseClick} handlePlay={() => handlePlayClick(song, i)}/>
              </div>
            ))
          }
        </TopChartCard>
      </div>

      <TopChartCard topCharts="Top Artists" link="/top-artists">
        <Swiper slidesPerView="auto" spaceBetween={15} freeMode centeredSlides centeredSlidesBounds modules={{ FreeMode }} className="mt-4">
          {
            topPlays?.map((song) => (
              <SwiperSlide key={song.key} style={{ width: "20%", height: "auto" }}
                className="shadow-lg rounded-full animate-slideright">
                <Link to={`/artists/${song?.artists[0].adamid}`}>
                  <img src={song?.images?.background} alt="Name" className="rounded-full w-full object-cover" />
                </Link>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </TopChartCard>
    </div>
  )
}

export default TopPlay;
