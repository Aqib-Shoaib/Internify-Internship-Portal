/* eslint-disable react/prop-types */
import { Plus } from "lucide-react";

function Arraybox({ list, title }) {
  return (
    <div className='flex flex-col gap-2 w-fit mb-4 bg-white rounded-2xl p-4 shadow-md'>
      <h2 className='text-sm font-medium text-foreground'>{title}:</h2>

      <div className='flex flex-wrap gap-4'>
        {list.map((item, index) => (
          <p
            key={index}
            className='bg-secondary text-secondary-foreground text-xs px-3 py-1 rounded-lg'
          >
            {item}
          </p>
        ))}

        <button
          type='button'
          className='w-10 h-10 flex items-center justify-center rounded-lg bg-muted hover:bg-muted/80 transition'
        >
          <Plus className='w-4 h-4 text-muted-foreground' />
        </button>
      </div>
    </div>
  );
}

export default Arraybox;
