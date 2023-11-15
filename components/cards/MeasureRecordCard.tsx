import EditIcon from "../icons/EditIcon"

const MeasureRecordCard = () => {
  return (
    <article className='group cursor-pointer flex justify-between w-full p-3 pl-0 pr-0 border-b border-b-dark-border last:border-none'>
      <p className='text-light-2'>15/11/2023</p>
      <div className='flex gap-2'>
        <p className='text-light-1 font-semibold'>73kg</p>
        <EditIcon className='fill-light-3 group-hover:fill-light-1' />
      </div>
    </article>
  )
}

export default MeasureRecordCard