import { getParam } from "@/libs/utils/utils"
import { TypeExercise } from "@/libs/utils/types"
import axios from "axios";

const loadExercise = async (exerciseId: string) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/exercises/${exerciseId}`);

    return await res.data;
  } catch (error) {
    console.error('Error al cargar el ejercicio:', error);
  }
};

const ExerciseOnePage = async ({
  params
}: {
  params: { id: string }
}) => {
  const { id } = params

  const exerciseId = getParam(id)

  const exercise: TypeExercise = await loadExercise(exerciseId)

  return (
    <main className='main-container'>
      {exercise ? (
        <p className='text-light-1'>{exercise.name}</p>
      ) : null}
    </main>
  )
}

export default ExerciseOnePage