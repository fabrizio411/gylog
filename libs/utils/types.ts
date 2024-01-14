export type TypeUnitsConfig = {
    weight: 'kg' | 'lbs',
    distance: 'metric' | 'imperial',
    size: 'metric' | 'imperial'
}

export type TypeToMeasure = 'weight' | 'length' | 'percentage' | 'calories'

export type TypeUnits = 'kg' | 'g' | 'mg' | 'lbs' | 'oz' | 'km' | 'm' | 'cm' | 'mm' | 'mi' | 'ft' | 'in' | '%' | 'kcal'

export type TypeDays = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'

export type TypeExerciseCategory = 'reps' | 'reps/weight' | 'dur' | 'dur/weight' | 'dist' | 'dist/dur' | 'checkbox'

export type TypeMuscles = 'forearm' | 'biceps' | 'triceps' | 'shoulder' | 'traps' | 'chest' | 'lats' | 'lower back' | 'abs' | 'quadriceps' | 'hamstrings' | 'adductors' | 'abductor' | 'glutes' | 'calves' | 'cardio' | 'other'

export type TypeUser = {
    _id: string | any,
    username: string,
    email: string,
    password: string,
    image?: string,
    units: TypeUnitsConfig,
    isPremium: boolean,
    firstWeekDay: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday',
    routines: string[],
    routinesFiles: string[],
    exercises: string[],
    favourites: string[],
    workouts: string[],
    measures: string[],
    program: string,
    createdAt: string,
    updatedAt: string
}

export type TypeUserGeneral = {
    _id: string | any,
    username: string,
    image?: string,
    units: TypeUnitsConfig,
    isPremium: boolean,
    firstWeekDay: TypeDays
}

export type TypeExercise = {
    _id: string | any,
    name: string,
    note?: string,
    category: TypeExerciseCategory,
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
    file?: string,
    user?: string | TypeUserGeneral | TypeUser,
    createdAt: string,
    updatedAt: string
}

export type TypeRoutineFile = {
    _id: string | any,
    name: string,
    routines: string[],
    user: string | TypeUserGeneral
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
    records: string[] | TypeWorkoutRecord[],
    user: string | TypeUserGeneral | TypeUser,
    createdAt: string,
    updatedAt: string
}

export type TypeWorkoutRecord = {
    _id: string | any,
    note?: string,
    exercese: string | TypeExercise,
    dataOne: number[],
    unitOne: TypeUnits,
    dataTwo: number[],
    unitTwo: TypeUnits,
    rpe: number[],
    rir: number[],
    workout: string | TypeWorkout,
    routine: string | TypeRoutine,
    user: string | TypeUserGeneral | TypeUser,
    createdAt: string
}

export type TypeMeasure = {
    _id: string | any,
    name: string,
    toMeasure: 'weight' | 'length' | 'percentage' | 'calories',
    useUnit: TypeUnits,
    records: string[] | TypeMeasureRecord[],
    user: string | TypeUserGeneral | TypeUser,
}

export type TypeMeasureRecord = {
    _id: string | any,
    measure: string | TypeMeasure,
    value: number,
    unit: TypeUnits,
    date: string,
    user: string | TypeUserGeneral | TypeUser,
}