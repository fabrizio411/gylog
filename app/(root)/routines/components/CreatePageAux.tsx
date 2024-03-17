import RoutineCard from "@/components/cards/RoutineCard"

interface CreatePageAuxProps {
  userId: string
}

const CreatePageAux: React.FC<CreatePageAuxProps> = ({
  userId
}) => {
  return (
    <form>
      <div className='sticky top-16 z-10 bg-dark-1 flex justify-center sm:justify-between items-center mb-3 pb-4 pt-4 border-b border-dark-hover'>
        <h1 className='hidden sm:block desktop-page-title'>Create Exercise</h1>
        <div className='flex gap-3 w-11/12 sm:w-1/2'>
          <div className='flex-1 button bg-dark-border hover:bg-light-3'>Cancel</div>
          <button className='flex-1 button'>Save</button>
        </div>
      </div>

      <RoutineCard />
      <RoutineCard />
      <RoutineCard />
      <RoutineCard />
      <RoutineCard />
      <RoutineCard />
      <RoutineCard />
      <RoutineCard />
      <RoutineCard />
      <RoutineCard />
      <RoutineCard />
      <RoutineCard />

    </form>
  )
}

export default CreatePageAux