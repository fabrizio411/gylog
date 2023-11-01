import { TypeWorkoutRecord } from './utils/types'

export const calcRm = (maxWeight: number, reps: number) => {
    let rm = maxWeight / (1.0278 - (0.0278 * reps))
    return rm
}

export const exerciseBestValues = ({
    data
}: {
    data: TypeWorkoutRecord[]
}) => {
    const stats = {
        rm: 0,
        maxWeight: {
            reps: 0,
            weight: 0,
            date: ''
        },
        maxVolume: {
            volume: 0,
            date: ''
        },
        maxReps: {
            reps: 0,
            weight: 0,
            date: ''
        },
        totalReps: 0,
        totalVolume: 0,
        timesDone: 0
    }

    if (!data) {
        return stats
    }

    data.forEach((val) => {
        stats.totalReps = stats.totalReps + val.dataOne.reduce((acc, curr) => acc + curr)
        stats.totalVolume = stats.totalVolume + val.dataOne.reduce((acc, curr) => acc + curr)

        let maxSetReps = Math.max(...val.dataOne)
        if (maxSetReps > stats.maxReps.reps) {
            stats.maxReps.reps = maxSetReps
            stats.maxReps.weight = val.dataTwo[val.dataOne.indexOf(maxSetReps)]
            stats.maxReps.date = val.createdAt
        } 
        
        let maxSetWeight = Math.max(...val.dataTwo)
        if (maxSetWeight > stats.maxWeight.weight) {
            stats.maxWeight.reps = val.dataOne[val.dataTwo.indexOf(maxSetWeight)]
            stats.maxWeight.date = val.createdAt
        } 

        let maxSetVolume = val.dataTwo.reduce((acc, curr) => acc + curr)
        if (maxSetReps > stats.maxVolume.volume) {
            stats.maxVolume.volume = maxSetVolume
            stats.maxVolume.date = val.createdAt
        }
    })

    stats.rm = calcRm(stats.maxWeight.weight, stats.maxWeight.reps)
    stats.timesDone = data.length

    return stats
}