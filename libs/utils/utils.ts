import { TypeExerciseCategory, TypeUnits } from './types'

export const formatDate = (date: string) => {
    const newDate = new Date(date)
    
    return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`
}

export const getParam = (param: string) => {
    if (Array.isArray(param)) {
        return param[0]
      }
  
      return param
}

export const isWeightedExercise = (category: TypeExerciseCategory) => {
    if (category === 'dur/weight' || category === 'reps/weight') {
        return true
    }

    return false
}

export const getExerciseUnits = (category: TypeExerciseCategory) => {
    if (category === 'checkbox') return []
    else if (category === 'dist') return ['m']
    else if (category === 'dist/dur') return ['m', 's']
    else if (category === 'dur') return ['s']
    else if (category === 'dur/weight') return ['s', 'kg']
    else if (category === 'reps') return ['reps']
    else if (category === 'reps/weight') return ['reps', 'kg']
    else return []
}


// Hacer cuando hay cambio de toMeasure

// export const convertUnits = ({
//     useUnit,
//     data
// }: {
//     useUnit: TypeUnits,
//     data: {
//         value: number,
//         unit: TypeUnits
//     }
// }) => {
//     if (useUnit === data.unit) {
//         return data.value
//     }

//     const changeUnitSystem = (from: TypeUnits, to: TypeUnits, value: number) => {
//         if (from = to) {
//             return value
//         }

//         const kgToLbs = (dataValue: number) => {
//             // dataValue tiene que ser kg or lbs
//             if (to === 'kg' || to === 'g' || to === 'mg') {
//                 return dataValue / 2.02
//             }
            
//             if (to === 'lbs' || to === 'oz') {
//                 return dataValue * 2.02
//             }

//             return dataValue
//         }

//         const metricToImperial = (dataValue: number) => {
//             // dataValue tiene que ser km o mi
//             if (to === 'km' || to === 'm' || to === 'cm' || to === 'mm') {
//                 return dataValue * 1.61
//             }
            
//             if (to === 'mi' || to === 'ft' || to === 'in') {
//                 return  dataValue / 1.61
//             }

//             return dataValue
//         }
        
//         let weightValue = 0
//         let distanceValue = 0
        
//         switch (from) {
//             case 'kg':
//                 return kgToLbs(value)
//             case 'g':
//                 weightValue = value / 1000
//                 return kgToLbs(weightValue)
//             case 'mg':
//                 weightValue = value / 1000000
//                 return kgToLbs(weightValue)
//             case 'lbs':
//                 return kgToLbs(value)
//             case 'oz':
//                 weightValue = value / 16
//                 return kgToLbs(weightValue)
//             case 'km':
//                 return metricToImperial(value)
//             case 'm':
//                 distanceValue = value / 1000
//                 return metricToImperial(distanceValue)
//             case 'cm':
//                 distanceValue = value / 100000
//                 return metricToImperial(distanceValue)
//             case 'mm':
//                 distanceValue = value / 1000000
//                 return metricToImperial(distanceValue)
//             case 'mi':
//                 return metricToImperial(value)
//             case 'ft':
//                 distanceValue = value / 5280
//                 return metricToImperial(distanceValue)
//             case 'in':
//                 distanceValue = value / 63360
//                 return metricToImperial(distanceValue)
//         }

//         return value
//     }

//     switch (useUnit) {
//         case 'kg':
//             if (data.unit === 'mg') {
//                 return Math.round((data.value / 1000000) * 100) / 100
//             }

//             if (data.unit === 'g') {
//                 return Math.round((data.value / 1000) * 100) / 100
//             }

//             return (Math.round(changeUnitSystem(data.unit, useUnit, data.value) * 100) / 100)
//         case 'g':
//             if (data.unit === 'kg') {
//                 return data.value * 1000
//             }

//             if (data.unit === 'mg') {
//                 return Math.round((data.value / 1000) * 100) / 100
//             }

//             return (Math.round(changeUnitSystem(data.unit, useUnit, data.value) * 1000 * 100) / 100)

//         case 'mg':
//             if (data.unit === 'g') {
//                 return data.value * 1000
//             }

//             if (data.unit === 'kg') {
//                 return data.value * 1000000
//             }

//             return (Math.round(changeUnitSystem(data.unit, useUnit, data.value) * 1000000 * 100) / 100)

//         case 'lbs':
//             if (data.unit === 'oz') {
//                 return Math.round((data.value / 16) * 100) / 100
//             }

//             return (Math.round(changeUnitSystem(data.unit, useUnit, data.value) * 100) / 100)

//         case 'oz':
//             if (data.unit === 'lbs') {
//                 return data.value * 16
//             }
            
//             return (Math.round(changeUnitSystem(data.unit, useUnit, data.value) * 16 * 100) / 100)

//         case 'km':
//             if (data.unit === 'mm') {
//                 return Math.round((data.value / 1000000) * 100) / 100
//             }

//             if (data.unit === 'cm') {
//                 return Math.round((data.value / 100000) * 100) / 100
//             }

//             if (data.unit === 'm') {
//                 return Math.round((data.value / 1000) * 100) / 100
//             }

//             return (Math.round(changeUnitSystem(data.unit, useUnit, data.value) * 100) / 100)

//         case 'm':
//             if (data.unit === 'mm') {
//                 return Math.round((data.value / 1000) * 100) / 100
//             }

//             if (data.unit === 'cm') {
//                 return Math.round((data.value / 100) * 100) / 100
//             }

//             if (data.unit === 'km') {
//                 return data.value * 1000
//             }

//             return (Math.round(changeUnitSystem(data.unit, useUnit, data.value) * 1000 * 100) / 100)

//         case 'cm':
//             if (data.unit === 'mm') {
//                 return Math.round((data.value / 10) * 100) / 100
//             }

//             if (data.unit === 'm') {
//                 return data.value * 100
//             }

//             if (data.unit === 'km') {
//                 return data.value * 100000
//             }

//             return (Math.round(changeUnitSystem(data.unit, useUnit, data.value) * 100000 * 100) / 100)

//         case 'mm':
//             if (data.unit === 'cm') {
//                 return data.value * 10
//             }

//             if (data.unit === 'm') {
//                 return data.value * 1000
//             }

//             if (data.unit === 'km') {
//                 return data.value * 1000000
//             }

//             return (Math.round(changeUnitSystem(data.unit, useUnit, data.value) * 1000000 * 100) / 100)

//         case 'mi':
//             if (data.unit === 'ft') {
//                 return Math.round((data.value / 5280) * 100) / 100
//             }

//             if (data.unit === 'in') {
//                 return Math.round((data.value / 63360) * 100) / 100
//             }

//             return (Math.round(changeUnitSystem(data.unit, useUnit, data.value) * 100) / 100)

//         case 'ft':
//             if (data.unit === 'mi') {
//                 return data.value * 5280
//             }

//             if (data.unit === 'in') {
//                 return Math.round((data.value / 12) * 100) / 100
//             }

//             return (Math.round(changeUnitSystem(data.unit, useUnit, data.value) * 5280 * 100) / 100)

//         case 'in':
//             if (data.unit === 'mi') {
//                 return data.value * 63360
//             }

//             if (data.unit === 'ft') {
//                 return data.value * 12
//             }

//             return (Math.round(changeUnitSystem(data.unit, useUnit, data.value) * 63360 * 100) / 100)
//         default: 
//         return data.value
//     }
// }