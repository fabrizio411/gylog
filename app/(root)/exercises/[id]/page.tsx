'use client'

import { getParam } from '@/libs/utils/utils'
import { useEffect, useState } from 'react';
import { TypeExercise } from '@/libs/utils/types';
import axios from 'axios';
import OptionsDots from '@/components/icons/OptionsDots';
import ExrGeneral from '../components/ExrGeneral';
import ExrCharts from '../components/ExrCharts';
import ExrHistory from '../components/ExrHistory';

const ExerciseOnePage = ({
  params
}: {
  params: { id: string }
}) => {

  // Get exercise info
  const { id } = params
  const exerciseId = getParam(id)

  const [exercise, setExercise] = useState<TypeExercise | undefined>()

  useEffect(() => {
    async function getExercises() {
      const res: any = await axios.get(`/api/exercises/${exerciseId}`)
      .catch((error) => console.log(error))
      
      setExercise(res.data)
    }

    getExercises()
  }, [exerciseId])

  console.log(exercise)

  // Handle menu
  const [isMenuActive, setIsMenuActive] = useState<boolean>(false)

  const handleMenu = () => {
    if (isMenuActive) setIsMenuActive(false)
    else setIsMenuActive(true)
  }

  // Handle subpages states
  const [generalActive, setGeneralActive] = useState<boolean>(true)
  const [chartsActive, setChartsActive] = useState<boolean>(false)
  const [historyActive, setHistoryActive] = useState<boolean>(false)

  const pos = ['left-0', 'left-1/3', 'left-2/3']
  const getUnderlinePosition = () => {
    let position
    if (generalActive) {
      position = '0'
    } else if (chartsActive) {
      position = '1/3'
    } else if (historyActive) {
      position = '2/3'
    }

    return position
  }

  const handleChange = () => {
    if (generalActive) setGeneralActive(false)
    if (chartsActive) setChartsActive(false)
    if (historyActive) setHistoryActive(false)
  }

  return (
    <main className='main-container'>
      {exercise ? (
        <div className='flex flex-col items-center mt-3'>
          <div className='flex justify-between items-center md:w-full w-11/12'>
            <h1 className='text-light-1 text-2xl font-bold'>{exercise.name}</h1>
            <div onClick={handleMenu} className='relative'>
              <OptionsDots className='fill-light-1 rounded-full box-content p-1 cursor-pointer hover:bg-dark-hover' />
              <div className={`${isMenuActive ? 'flex' : 'hidden'} z-10 absolute w-40 right-full top-4 bg-dark-2 flex-col rounded-md overflow-hidden`}>
                <button className='hover:bg-dark-hover p-3 text-light-3 hover:text-light-1 cursor-pointer'>Edit Exercise</button>
                {exercise.user ? (
                  <button className='hover:bg-dark-hover p-3 text-red-1 cursor-pointer'>Delete Exercise</button>
                ) : null}
              </div>
            </div>
          </div>

          <div className='flex flex-col mt-5 w-full'>
            <div className='flex w-full relative'>
              <div className={`lateral-nav-underline left-${getUnderlinePosition()}`}></div>
              <button onClick={() => {
                handleChange()
                setGeneralActive(true)
              }} className='lateral-nav-btn'>General</button>
              <button onClick={() => {
                handleChange()
                setChartsActive(true)
              }} className='lateral-nav-btn'>Charts</button>
              <button onClick={() => {
                handleChange()
                setHistoryActive(true)
              }} className='lateral-nav-btn'>History</button>
            </div>

            <div>
              {generalActive ? (<ExrGeneral />) : null}
              {chartsActive ? (<ExrCharts />) : null}
              {historyActive ? (<ExrHistory />) : null}
            </div>
          </div>
        </div>
      ) : null}
    </main>
  )
}

export default ExerciseOnePage