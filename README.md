# gylog

# Documentación

## Tecnologias
- NextJs (front-end and back-end)
- Tailwind
- TypeScript
- MongoDb

## Concepto
- Se establecera un modelo de version gratuita y version premium.
- Aplicacion para llevar registro de rutinas ejercicios y entrenamientos.
- Enfocado en llevar un control de repeticiones y pesos de los ejercicios.
- Registro de peso corporal.
- Con rutinas y ejercicios personalizados por los usuarios.
- Mostrando datos con distintos analisis y graficos de los mismos, ya sean datos de rutinas o ejercicios en particular. Incluso ejercicios dentro de determinada rutina solamente.
- Posibilidad de crear una planificacion semanal, pudiendo agregar diferentes rutinas a cada dia de la semana, y mostrando que rutina hay para el dia actual.

### User 
- Estructua de datos del usuario:
```typescript
type User = {
    _id: string,
    username: string,
    email: string,
    password: string,
    image: string,
    units: {
        weight: 'kg' | 'lbs',
        distance: 'kilometers' | 'miles',
        measures: 'cm' | 'in'
    }
}
```

### Ejercicios
- Existira una bse de datos de ejercicios comun.
- Los ejercicios tendran un nombre, un tipo, y el musculo motor del ejericio.
- Tipos de ejericicios:
    - reps: solo se registra el numero de repeticiones.
    - reps/weight: se registra las repeticiones y el peso utilizado.
    - dur: se registra la duracion.
    - dur/weight: se registra la duracion y el peso utilizado.
    - dist: se registra la distancia.
    - dist/dur: se registra la distancia y el tiempo en recorrerla.
- Unidades de registro: 
    - Peso se registra en kilogramos.
    - Distancia se registra en metros.
    - Duracion se registra en segundos.
- Se pueden crear ejercicios personalizados para cada usuario. Donde se especifica la informacion del ejercicio creado.
- Version gratuita: solo se podran crear hasta 5 ejercicios personalizados.
- Version premium: ejercicios personalizados ilimitados.
- Estructura de datos de un ejercicio:
```typescript
type Ejercicio = {
    _id: string,
    name: string,
    type: 'reps' | 'reps/weight' | 'dur' | 'dur/weight' | 'dist' | 'dist/dur',
    muscle: 'forearm' | 'biceps' | 'triceps' | 'shoulder' | 'traps' | 'chest' | 'lats' | 'lower back' | 'abs' | 'quadricep' | 'hamstrings' | 'adductors' | 'abductor' | 'glutes' | 'calves' |  'other',
    user?: string
}
```

### Rutinas
- Existiran 3 carpetas de rutinas de diferentes splits semanales, con rutinas para ese split.
- Las rutinas se podran organizar por carpetas.
- Las rutinas mostraran cual es su enfoque basado en los musculos motores de los ejercicios que contienen, estos enfoques pueden ser:
    - Fullbody,
    - Upperbody,
    - Legs,
    - Pull,
    - Push
- Los usuarios pueden crear sus propias rutinas.
- Se puede agregar comentarios a la rutuna y a los ejercicios dentro de estas.
- Version gratuita: solo se podran crear 5 rutinas.
- Version premium: crear rutinas ilimitadas.
- Estructura de datos de una rutina:
```typescript
type Rutina = {
    _id: string,
    name: string,
    note?: string,
    exercies: [
        {
            exerciseId: string,
            sets: number,
            note?: string
        }
    ],
    user?: string,
    createdAt: string,
    updatedAt: string
}
```

### Programa 
- Cada usuario tendra un unico programa semanal que podra editar agregando rutinas a los dias.
- Se podra incluir mas de una rutina por dia.
- Estructura de datos del programa: 
```typescript
type Program = {
    _id: string,
    week: {
        mon: string[], // routine Ids
        tue: string[],
        wed: string[],
        thu: string[],
        fri: string[],
        sat: string[],
        sun: string[]
    },
    user: string
}
```

### Medidas
- Los usuarios podran registrar su peso corporal cada dia.
- Se registrara en kilogramos.
- Se creara un documento por cada registro que se haga con la informacion del registro.
- Version Premium: se podran crear medidas personalizadas. (nombre y unidades de medida)
- Estructura de datos de medidas:
```typescript
type Measure = {
    _id: string,
    name: string,
    unit: string,
    user: string
}
```
- Estructura de datos de un registro:
```typescript
type MeasureRecord = {
    _id: string,
    measure: string // measure Id
    value: number,
    date: stirng,
    user: string,
}
```

### Entrenamientos
- El registro de entrenamientos esta compuesto de un registro de la informacion del entrenamiento, y otro registro con la informacion de cada ejercicio.
- De esta forma se tendra mejor acceso a la informacion de los entrenamientos y de cada ejercicio por separado.
- Los ejercicios registrara una data principal y secundaria, en caso de que el tipo de ejercicio no tenga data secundaria, esta valdra 0.
- Estructura de datos del entrenamiento:
```typescript
type Workout = {
    _id: string,
    note?: string,
    routine: string, // routine Id
    exercises: string[], // records Ids
    cratedAt: string,
    user: string
}
```
- Estructura de datos de los registros de ejercicios:
```typescript
type ExerciseRecord = {
    _id: string,
    note: string,
    exercise: string, // exercise Id
    dataOne: number,
    dataTwo: number,
    workout: string, // workoutId
    routine: string, // routineId
    user: string
}
```



## Version Gratuita/Premium
- 5 ejercicios personalizados / Ejercicios personalizados ilimitados.
- 5 rutinas / Rutinas ilimitadas.
- Medida solo de peso corporal / Crear medidas personalizadas.
