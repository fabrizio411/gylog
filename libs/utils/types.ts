import mongoose from "mongoose"

export type TypeUnits = {
    weight: 'kg' | 'lbs',
    distance: 'metric' | 'imperial'
}

export type TypeExerciseVariants = 'reps' | 'reps/weight' | 'dur' | 'dur/weight' | 'dist' | 'dist/dur'

export type TypeMuscles = 'forearm' | 'biceps' | 'triceps' | 'shoulder' | 'traps' | 'chest' | 'lats' | 'lower back' | 'abs' | 'quadricep' | 'hamstrings' | 'adductors' | 'abductor' | 'glutes' | 'calves' |  'other'

export type TypeUser = {
    _id: string | any,
    username: string,
    email: string,
    password: string,
    image?: string,
    units: TypeUnits,
    isPremium: boolean,
    createdAt: string,
    updatedAt: string
}

export type TypeUserGeneral = {
    _id: string | any,
    username: string,
    image?: string,
    units: TypeUnits,
    isPremium: boolean
}

export type TypeExercise = {
    _id: string | any,
    name: string,
    variant: TypeExerciseVariants,
    muscle: TypeMuscles,
    user?: string | TypeUserGeneral | TypeUser,
    createdAt: string,
    updatedAt: string
}


export type TypeRoutine = {
    _id: string | any,
    name: string,
    note?: string,
    exercises: [
        {
            exercise: string | TypeExercise,
            sets: number,
            note?: string
        }
    ],
    user?: string | TypeUserGeneral | TypeUser,
    createdAt: string,
    updatedAt: string
}

export type TypeProgram = {
    _id: string | any,
    week: {
        mon: string[] | TypeRoutine[],
        tue: string[] | TypeRoutine[],
        wed: string[] | TypeRoutine[],
        thu: string[] | TypeRoutine[],
        fri: string[] | TypeRoutine[],
        sat: string[] | TypeRoutine[],
        sun: string[] | TypeRoutine[]
    },
    user: string | TypeUserGeneral | TypeUser,
}

export type TypeWorkout = {
    _id: string | any,
    note?: string,
    routine: string | TypeRoutine,
    records: string[] | TypeWorkoutRecord,
    user: string | TypeUserGeneral | TypeUser,
    createdAt: string,
    updatedAt: string
}

export type TypeWorkoutRecord = {
    _id: string | any,
    note?: string,
    exercese: string | TypeExercise,
    dataOne: number,
    unitOne: TypeUnits,
    dataTwo: number,
    unitTwo: TypeUnits,
    rpe: number,
    rir: number,
    workout: string | TypeWorkout,
    routine: string | TypeRoutine,
    user: string | TypeUserGeneral | TypeUser,
}

export type TypeMeasure = {
    _id: string | any,
    name: string,
    toMeasure: 'weight' | 'length' | 'percentage',
    useUnit: TypeUnits,
    user: string | TypeUserGeneral | TypeUser,
}

export type TypeMeasureRecord = {
    _id: string | any,
    measure: string | TypeMeasure,
    value: number,
    unit: TypeUnits,
    date: Date,
    user: string | TypeUserGeneral | TypeUser,
}