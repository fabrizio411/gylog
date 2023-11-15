import MeasureRecordCard from '@/components/cards/MeasureRecordCard'

const MeasuresPage = () => {
  return (
    <main className='main-container'>
      <div className='mt-3 sm:mt-0 flex text-xl sm:text-base sm:justify-between justify-center'>
        <h2 className='desktop-page-title'>Bodyweight</h2>
        <select className='outline-none bg-dark-1 text-light-2 hover:text-light-1 cursor-pointer'>
          <option className='font-sans text-light-3 hover:text-light-2'>Bodyweight</option>
          <option className='font-sans text-light-3 hover:text-light-2'>Measure 2</option>
          <option className='font-sans text-light-3 hover:text-light-2'>Measure 3</option>
        </select>
      </div>

      <div className='mt-5 flex flex-col items-center gap-3'>
        <button className='button'>Add record</button>
        <div className='w-11/12 sm:w-2/4'>
          <MeasureRecordCard />
          <MeasureRecordCard />
          <MeasureRecordCard />
          <MeasureRecordCard />
          <MeasureRecordCard />
        </div>
      </div>
    </main>
  )
}

export default MeasuresPage