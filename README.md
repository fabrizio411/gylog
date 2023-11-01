# Documentación

## Code Guidelines
- Se va a utilizar API routes.
- Siemrpe se retorn un json con un message (para luego usar un toast). En caso de ser un error de interaccion (no del servidor) se agregara un campo error.

## Roadmap
- Redactar las ideas del concepto de la aplicacion.
- Pensar y documentar las estructuras de datos.
    - Observaciones generales de los conjuntos de datos.
    - Funcionamiento.
    - Estructura de datos.
- Programar los modelos en mongoose, y fijar los types para los datos que se usaran en la aplicacion.
- Pensar y documentar las funcionalidades de la aplicacion.
    - Funcionalidades y interaccion con los tipos de datos.
    - Funcionalidades del usuario.
    - Funcionalidades para compartir contenido entre usuarios.
    - Funciones para calculos de estadisticas para muestra de datos.
- Programar las funcionalidades como API.
- Estructurar el modelo de la pagina web. Las paginas que tendra y lo que estas haran.
    - Empezando por los basicos, paginas de interaccion (auth, home, routines, exercises, workout, measures)
    - Paginas de muestra de datos, y muestra visual de estadisticas.
- Establecer los componentes de react que pueden ser reutilizables y simplificar su reutilizacion.
    - Iconos.
    - Modals (interaccion con hooks).
    - Cards.
    - Formularios.
    - Not Found page.
    - Nav
- Establecer que hooks son necesarios para ciertas acciones de la pagina. (comunicacion entre componentes).
- Pensar el diseño de las paginas.
    - Establecer paleta de colores y agregarlos a tailwind.
    - Establecer estilos generales (headings, textos, imagenes, contenedores, etc).
- Programar las paginas de la aplicacion, diseño y funcionalidades.
    - Hacer todo el contenido de fornt-end y juntarlo con el backend.
- Testear la aplicacion.
- Deploy de la aplicacion (Vercel).

## Tecnologias
- NextJs (front-end and back-end)
- Tailwind
- TypeScript
- MongoDb

## Librerias
- Mongoose: para conectar con base de datos.
- Bcrypt: encriptacion de password. Y comparacion para login.
- Zod: validaciones de formularios.
- Next-Auth: inicio de sesion.

## Concepto
- Se establecera un modelo de version gratuita y version premium.
- Aplicacion para llevar registro de rutinas ejercicios y entrenamientos.
- Enfocado en llevar un control de repeticiones y pesos de los ejercicios.
- Controlar RPE y RIR, (pagina para explicar este contenido)
- Registro de peso corporal.
- Con rutinas y ejercicios personalizados por los usuarios.
- Mostrando datos con distintos analisis y graficos de los mismos, ya sean datos de rutinas o ejercicios en particular. Incluso ejercicios dentro de determinada rutina solamente.
- Posibilidad de crear una planificacion semanal, pudiendo agregar diferentes rutinas a cada dia de la semana, y mostrando que rutina hay para el dia actual.

## Datos y estruturas

### User 
- Se llevara cuenta de las unidades seleccionadas por el usuario y se usasran luego para generar los datos que las necesiten.
- Se guardara el primer dia de la semana del usuario, para mostrar el programa
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
        distance: 'metric' | 'imperial',
        size: 'metric' | 'imperial'
    },
    isPremium: boolean,
    routines: string[], // user routines Ids
    exercises: string[], // user exercises Ids
    favourites: string[], // exercises Ids
    workouts: string[], // user workouts Ids
    measures: string[], // user measures Ids
    program: string, // program Id
    createdAt: string
}
```

### Ejercicios
- Existira una base de datos de ejercicios comun.
- Los ejercicios tendran un nombre, un tipo, y el musculo motor del ejericio.
- Categorias de ejericicios:
    - reps: solo se registra el numero de repeticiones.
    - reps/weight: se registra las repeticiones y el peso utilizado.
    - dur: se registra la duracion.
    - dur/weight: se registra la duracion y el peso utilizado.
    - dist: se registra la distancia.
    - dist/dur: se registra la distancia y el tiempo en recorrerla.
    - checkbox: solo se registra si se completo el ejercicio, no se guarda ningun dato especifico.
- Unidades de registro: 
    - Peso se registra en kilogramos.
    - Distancia se registra en metros.
    - Duracion se registra en segundos.
- Se pueden crear ejercicios personalizados para cada usuario. Donde se especifica la informacion del ejercicio creado.
- Se puede agregar una nota de descripcion del ejercicio.
- Se puede agregar un ejercicio a favoritos.
- Los ejercicios favoritos apareceran en la pestaña de estadisticas. Y apareceran primero al crear rutinas.
- Version gratuita: solo se podran crear hasta 5 ejercicios personalizados.
- Version premium: ejercicios personalizados ilimitados.
- Estructura de datos de un ejercicio:
```typescript
type Ejercicio = {
    _id: string,
    name: string,
    note?: string,
    category: 'reps' | 'reps/weight' | 'dur' | 'dur/weight' | 'dist' | 'dist/dur',
    muscle: 'forearm' | 'biceps' | 'triceps' | 'shoulder' | 'traps' | 'chest' | 'lats' | 'lower back' | 'abs' | 'quadricep' | 'hamstrings' | 'adductors' | 'abductor' | 'glutes' | 'calves' | 'cardio' | 'other',
    favouriteBy: string[], // users Ids
    user?: string,
    createdAt: string
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
            exercise: string,
            sets: number,
            note?: string
        }
    ],
    user?: string,
    createdAt: string
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
    toMeasure: 'weight'| 'length'| 'percentage'| 'calories',
    useUnit: 'kg' | 'g' | 'mg' | 'lbs' | 'km' | 'm' | 'cm' | 'mm' | 'mi' | 'ft' | 'in' | '%' | 'kcal',
    records: string[], // measureRecords Ids
    user: string
}
```
- Estructura de datos de un registro:
```typescript
type MeasureRecord = {
    _id: string,
    measure: string // measure Id
    value: number,
    unit: 'kg' | 'g' | 'mg' | 'lbs' | 'km' | 'm' | 'cm' | 'mm' | 'mi' | 'ft' | 'in' | '%' | 'kcal',
    date: stirng,
    user: string,
}
```

### Entrenamientos
- El registro de entrenamientos esta compuesto de un registro de la informacion del entrenamiento, y otro registro con la informacion de cada ejercicio.
- De esta forma se tendra mejor acceso a la informacion de los entrenamientos y de cada ejercicio por separado.
- Los ejercicios registrara una data principal y secundaria, en caso de que el tipo de ejercicio no tenga data secundaria, esta valdra 0.
- En caso del ejercicio ser de tipo checkbox los datos valdran 1 en caso de haberse marcado y 0 en caso contrario. De esta forma se llevara control de cuantas series se hicieron.
- Version Premium: se puede habilitar la opcion para trackear RPE y RIR (del 1 al 10 ambos).
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
type WorkoutRecord = {
    _id: string,
    note: string,
    exercise: string, // exercise Id
    dataOne: number,
    unitOne: 'kg' | 'g' | 'mg' | 'lbs' | 'km' | 'm' | 'cm' | 'mm' | 'mi' | 'ft' | 'in' | '%',
    dataTwo: number,
    unitTwo: 'kg' | 'g' | 'mg' | 'lbs' | 'km' | 'm' | 'cm' | 'mm' | 'mi' | 'ft' | 'in' | '%',
    rpe?: number,
    rir?: number,
    workout: string, // workoutId
    routine: string, // routineId
    user: string
}
```

## Funcionalidades
### Usuario
- Registrarse:
    - Validacion con Zod.
    - Email, nomrbre de usuario y contraceña: Campos requeridos.
    - Imagen: se podra agregar un archivo de imagen en el formulario de registro.
    - Se verificara dianmicamente que el email y el nombre de usuario esten disponibles.
    - Se verificara con una expresion reguar que el email ingresado tenga un formato de email.
    - Solo se podra enviar el formulario si se complen estos requisitos.
    - La contraceña se encripta con Bcrypt antes de guardarla.
    - Estos cuatro datos son los unicos que se ingresaran dado que los otros campos tienen un valor default.
    - Al registrarse se ejecutara la funcion de signin de Next Auth.
    - Se creara un documento de Program, con los campos de los dias vacios, relacionado al usuario.
- Login: 
    - Se hara login con la funcion signin de Next Auth, tomando el email y la contraceña.
    - Dentro de la configuracion de Next Auth se comparara la contraceña con la encriptada usando Bcrypt.
#### API:
- [/api/register - POST](./app/api/(auth)/register/route.ts):
    - Verificar disponibilidad de email y username.
    - Encriptar password.
    - Crear nuevo User.
    - Crear nuevo Program.
    - Crear Measure de bodyweight.
- [/api/auth/[...nextauth]](./app/api/(auth)/auth/[...nextauth]/route.ts) 
    - Configuracion de NextAuth options.
    - Obtener las credenciales.
    - Comparar contraceñas.
- [/api/user/[id] - GET](./app/api/user/[id]/route.ts):
    - Obtener informacion del usuario.
- [/api/user/[id] - PUT](./app/api/user/[id]/route.ts):
    - Parametros: username, image.
    - Editar la informacion del usuario.
- [/api/user/[id]/units - PUT](./app/api/user/[id]/units/route.ts):
    - Parametros: weight, distance, size.
    - Editar la infomacion de las unidades el el usuario.
- [/api/user/[id]/premium - PUT](./app/api/user/[id]/premium/route.ts):
    - Parametros: currentState (del premium del usuario).
    - Editar la infomacion del estado de isPremium del usuario.


### Ejercicio
- Crear ejercicio: (max de 5 para usuarios gratis)
    - Nombre, categoria de ejercicio y musculo principal: Campos requeridos.
    - Al crear un ejercicio se pondra un campo user con el id del usuario como referencia.
    - Este campo user solo existira en los ejercicios creados por usuarios.
    - A traves de la existencia de este se podra diferenciar los ejercicios custom de los generales.
    - Se guardara el usuario que lo crea.
    - Se guardara el Id del ejercicio creado en el campo exercises del usuario.
- Eliminar un ejercicio: 
    - Al eliminar un ejercicio NO se eliminaran los WorkoutRecords asociados al ejercicio, debido a que seguiran existiendo dentro del Workout.
    - Se eliminara el ejercicio de las rutinas actuales del usuario que lo contengan.
    - Se eliminara el Id del ejercicio del campo exercises del usuario.
- Editar ejercicio: 
    - Solo se podra editar el nombre del ejercicio, para mantener los datos como estan.
#### API:
- [/api/exercises - GET](./app/api/exercises/route.ts):
    - Obtener infomacion del usuario.
    - Obtener los ejericicios generales y los creados por el usuario.
- [/api/exercises - POST](./app/api/exercises/route.ts):
    - Parametros: name, note, category, muscle, userId.
    - Verificar informacion valida.
    - Verificar usuario grais si puede crear ejercicios.
    - Crear ejercicio.
    - Agregar id del ejercicio al usuario.
- [/api/exercises/[id] - GET](./app/api/exercises/[id]/route.ts):
    - Obtener informacion de un ejercicio.
- [/api/exercises/[id] - DELETE](./app/api/exercises/[id]/route.ts):
    - Eliminar ejercicio.
    - Eliminar id del ejercicio de User.
    - Eliminar el ejercicio de las rutinas actuales del usuario.
- [/api/exercises/[id] - PUT](./app/api/exercises/[id]/route.ts):
    - Parametros: name, note, category, muscle, userId, exerciseId.
    - Verificar informacion valida.
    - Update del ejercicio.
- [/api/exercises/fav/[id]](./app/api/exercises/fav/route.ts):
    - Obtener informacion de los ejercicios que tengan el id del usuario como favouriteBy.
- [/api/exercises/fav/[id] - POST](./app/api/exercises/fav/[id]/route.ts):
    - Parametros: userId.
    - Encontrar ejercicio con id de params.
    - Eliminar de favoritos en caso de ya estar.
    - Agregarlo a favoritos en caso contrario.

### Rutina
- Crear rutina: (max de 5 para usuarios gratis)
    - Nombre: Campo requerido.
    - Se puede agrear una nota de forma opcional.
    - Se necesitara al menos agragar un ejercicio para poder guardar la rutina.
    - Cada ejercicio debe guardar la informacion de su Id y el numero de sets, como opcional una nota.
    - Se debe poder aregar, eliminar, reemplazar y reordenar los ejercicios.
    - Se guardara el usuario que la crea.
    - Se guardara el Id de la rutina creado en el campo routines del usuario.
- Eliminar una rutina:
    - Al eliminar NO se eliminara los WorkoutRecord asociados.
    - En caso de la rutina estar en el Programa se eliminara de este en todas las instancias que aparezca.
    - Se eliminara el Id de la rutina del campo routines del usuario
- Editar rutina: 
    - Editar rutina funcionara igual a la creacion de la misma, pero con datos ya cargados a esta.
#### API
- [/api/routines - GET](./app/api/routines/route.ts):
    - Obtiener informacion del usuario.
    - Obtner informacion de las carpetas de rutinas del usuario.
    - Obtener informacion de las rutinas que no estan en carpetas del usuario.
- [/api/routines - POST](./app/api/routines/route.ts):
    - Parametros: name, note, exercises, userId.
    - Verificar informacion valida.
    - Verificar usuario grais si puede crear rutinas.
    - Crear rutina.
    - Agregar id de la rutina al usuario.
- [/api/routines/[id] - GET](./app/api/routines/[id]/route.ts):
    - Obtener informacion de una rutina.
    - Pupulate con la informacion de cada ejercicio del a rutina.
- [/api/routines/[id] - DELETE](./app/api/routines/[id]/route.ts):
    - Eliminar rutnina.
    - Eliminar id de la rutina de User.
    - Eliminar la rutina del Program en caso de estar.
- [/api/routines/[id] - PUT](./app/api/routines/[id]/route.ts):
    - Parametros: name, note, exercises, userId.
    - Verificar informacion valida.
    - Update de la rutina, solo si esta pertenece al usuario.
- [/api/routines/[id] - POST](./app/api/routines/[id]/route.ts):
    - Parametros: userId.
    - Guardar rutinas de otras personas o generales.
    - Verificar usuario gratis y numero de rutinas.
    - Obtener informacion de la rutina a copiar.
    - Generar una copia de la rutina asciada al usuario.
- [/api/rotuines/file - POST](./app/api/routines/file/route.ts):
    - Parametros: name, routines ids, userId.
    - Crear nueva carpeta,
- [/api/rotuines/file/[id] - GET](./app/api/routines/file/[id]/route.ts):
    - Obtener informacion de la carpeta y completar con los datos de la rutina.
- [/api/rotuines/file/[id] - DELETE](./app/api/routines/file/[id]/route.ts):
    - Borrar carpeta.
    - Borrar la relacion a la carpeta de las rutinas de la misma.
- [/api/rotuines/file/[id] - PUT](./app/api/routines/file/[id]/route.ts):
    - Parametros: name, routines.
    - Obtener informacion de la carpeta para editar.
    - Borrar la relacion de las rutinas de la misma.
    - Modificar los datos por los datos nuevos.
    - Agregar la relacion con las nuevas rutinas.
- [/api/routines/general - GET](./app/api/routines/general/route.ts):
    - Obtener informacion de las rutinas generales, no tienen usuario asociado.
    - Populate informaicon de los ejercicios.

### Programa
- El programa solo se puede editar.
- Para editar el programa se debe agregar rutinas a un dia especifico. Se pueden agrar tantas rutinas como se quiera por dia.
- Se debe poder alterar el orden de estas rutinas dentro del dia.
- Tambien se debe poder eliminar una rutina del programa.
- No se pueden incluir ejericicios sueltos en el programa.
#### API:
- [/api/program - Get](./app/api/program/route.ts):
    - Obtener informacion del program del usuario.
- [/api/program - PUT](./app/api/program/route.ts):
    - Obtener el Program.
    - Modificar el dia editado y guardar el program.


### Workout
- Crear workout: 
    - El workout se basa en una rutina, el id de esta estara en el url.
    - Con los datos de la rutina se despliega el formulario para completar los datos de cada ejercicio, segun el ejericio que sea y los sets indicados.
    - Los datos de cada ejercicio se guardaran en un WorkoutRecord diferente para cada ejercicio.
    - Este WorkoutRecord incluira los datos ingresados por el usuario, el Id del ejercicio y las unidades utilizadas en para registrar los datos (para saber que coversiones aplicar en caso de cambio).
    - Los Ids de estos WorkoutRecords se guardarn en orden en un array, dentro de un docuemnto Workout.
    - En este tambien se guardara la rutina de la que parte y el usuario que lo relaciona.
    - Se guardara el Id del Workout en el campo workouts del usuario.
### Record
- Record sera la forma de llamarle a un workout una vez este concluye y es creado.
- Sera llamado de esta manera en las rutas para visualizarlo, editarlo y eliminarlo.
- Eliminar Workout: 
    - Se eliminaran todos los records asociados al workout y esa data se perdera.
    - Se eliminara el Id del Workout del campo workouts del usuario.
- Editar Workout: 
    - Aparecera el mismo furmulario para crear un Workout, pero con los datos del mismo cargados.
    - Se guardara de la misma manera que es creado.
    - Se deben hacer updates de todos los records asociados. O de los que recibieron cambios (si es posible).
#### API:
- [/api/workout/[id] - POST](./app/api/workout/[id]/route.ts):
    - Parametros: note, records data, userId.
    - Crear instancia del documento workout.
    - Crear un WorkoutRecord para cada elemento de records data.
    - Agregar el id del WorkoutRecord al array de records de Workout.
    - Agregar el id del Workout al usuario.
- [/api/workout/records - GET](./app/api/workout/records/route.ts):
    - Obtener informacion de los workouts del usuario.
- [/api/workout/records - GET](./app/api/workout/records/[id]/route.ts):
    - Obtener informacion de un workout.
- [/api/workout/records - DELETE](./app/api/workout/records/[id]/route.ts):
    - Borrar el workout.
    - Eliminar el id del workout del User.
    - Borrar todos los documentos de WorkoutRecords asociados al workout.
- [/api/workout/records - PUT](./app/api/workout/records/[id]/route.ts):
    - Parametros: note, records data, userId.
    - Eliminar todos los WorkoutRecords exisentes del workout.
    - Vaciar el array de records del workout.
    - Crear todos los nuevos WorkoutRecords correspondientes y agregarlos al array de records.

### Measures
- En caso de no tener un measure creado, al entrar se configurara el measure de Bodyweight del usuario.
- Habra un measure bodyweight para cada usuario.
#### Categoria Measure
- Crear measure: (solo para usuario premium)
    - Nombre: Campo requerido.
    - Configurar que tipo de medida sera, y que unidades se desean usar para medirla.
    - Se guardara el usuario que lo creo.
    - Se guardara el Id del Measure creado en el campo measures del usuario.
- Eliminar measure: 
    - Se eliminaran todos los MeasureRecords asociados con el Measure. Se perdera toda la data.
    - Se eliminara el Id del measure del campo measures del usuario.
- Editar measure: 
    - Se podra editar el nombre, y la configuracion de unidades.
    - Cambiar las unidades no cambiara los datos de los anteriores registros.
    - NO se podra editar el tipo de medida.
#### Record de measure
- Crear registro de measure: 
    - Se guardara una fehca que tendra como valor default la actual, pero podra ser cambiada por el usuario.
    - Se guardara  la unidad actual del Measure que referencia junto con el valor, para hacer conversion en caso de cambio.
    - Se guarda la referencia a la Measure y al Usuario.
- Editar registro de measure: 
    - Se podra editar el valor.
    - El valor se guardara junto con la unidad actual del Measure.
- Eliminar un registro de measure: 
    - Al elimina el MeasureRecords completo.
    - No afecta nada mas.
#### API:
- [/api/measures - GET](./app/api/measures/route.ts):
    - Obetener informacion de las measures del usuario.
- [/api/measures - POST](./app/api/measures/route.ts):
    - Parametros: name, toMeasure, useUnit, userId.
    - Crear nueva measure.
    - Agregar measure al User.
- [/api/measures/[id] - GET](./app/api/measures/[id]/route.ts):
    - Obtener informacion de la measure.
    - Populate la informacion de los records de esa measure.
- [/api/measures/[id] - DELETE](./app/api/measures/[id]/route.ts):
    - Borrar measure.
    - Borrar todos los records asociados a la measure.
    - Borrar id de measure del user.
- [/api/measures/[id] - PUT](./app/api/measures/[id]/route.ts):
    - Parametros: name, useUnit, userId.
    - Editar informacion de la measure.
- [/api/measures/records - POST](./app/api/measures/records/route.ts):
    - Parametros: measureId, value, unit, date, userId.
    - Crear nuevo MeasureRecord.
    - Agregar id del MeasureRecord al Measure.
- [/api/measures/records/[id] - DELETE](./app/api/measures/records/[id]/route.ts):
    - Borrar MeasureRecord.
    - Borrar id del Measure record del Measure.
- [/api/measures/records/[id] - PUT](./app/api/measures/records/[id]/route.ts):
    - Parametros: value, unit, date, userId.
    - Editar informacion del MeasureRecord.

### Compartir contenido
- Se debe poder acceder al link de una rutina o de un ejercicio creado por otra persona.
- No se podra acceder a ningun otro tipo de dato.
- Al acceder aparecera una opcion para guardar esa template en tu base de datos.
- Esto se debe controlar en la funcion de obtener los datos de la rutina o el ejercicio.

### Estadisticas


### Utils
- [convertUnits()](./libs/utils/utils.ts):
    - Parametros: useUnit, data (value, unit).
    - Si no hay que hacer conversion devuelve el valor.
    - En caso de conversion dentro del mismo sistema de medida se hace la conversion.
    - En el otro caso se hace la conversion al otro sistema de medida:
        - Entrada: en kg o lbs | en km o mi.
        - Salida: en estas mismas unidades.
    - Devuelve el valor del dato convertido a useUnit en caso de diferencia de unidades.

## Ideas
- PROGRAMA: marcar cuando una rutina esta hecha fijandose qeu haya un workout con la fecha de hoy con el id de la rutina.




## Version Gratuita/Premium
- 5 ejercicios personalizados / Ejercicios personalizados ilimitados.
- 5 rutinas / Rutinas ilimitadas.
- Medida solo de peso corporal / Crear medidas personalizadas.
- Track de reps y peso / Tambien track de RIR y RPE.