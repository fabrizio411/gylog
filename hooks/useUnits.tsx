import ClockIcon from '@/components/icons/ClockIcon'
import DumbbellIcon from '@/components/icons/DumbbellIcon'
import RepsIcon from '@/components/icons/RepsIcon'
import RulerIcon from '@/components/icons/RulerIcon'
import { useState } from 'react'

const useUnits = (category: string) => {
  let unitsInfo: {
    units: string[],
    denom: string[],
    icons: any
  } = {
    units: [],
    denom: [],
    icons: []
  }

  if (category === 'dist') {
      unitsInfo = {
          units: ['m'],
          denom: ['Distance'],
          icons: [RulerIcon]
      }
  } else if (category === 'dist/dur') {
      unitsInfo = {
          units: ['m', 's'],
          denom: ['Distance', 'Duration'],
          icons: [RulerIcon, ClockIcon]
      }        
  } else if (category === 'dur') {
      unitsInfo = {
          units: ['s'],
          denom: ['Duration'],
          icons: [ClockIcon]
      }        
  } else if (category === 'dur/weight') {
      unitsInfo = {
          units: ['s', 'kg'],
          denom: ['Duration', 'Weight'],
          icons: [ClockIcon, DumbbellIcon]
      }        
  } else if (category === 'reps') {
      unitsInfo = {
          units: ['reps'],
          denom: ['Reps'],
          icons: [RepsIcon]
      }        
  } else if (category === 'reps/weight') {
      unitsInfo = {
          units: ['reps', 'kg'],
          denom: ['Reps', 'Weight'],
          icons: [RepsIcon, DumbbellIcon]
      }        
  }

  return { unitsInfo }
}

export default useUnits