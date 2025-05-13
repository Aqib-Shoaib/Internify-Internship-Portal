/* eslint-disable react/prop-types */
import { cn } from "@/lib/utils"; // ShadCN utility for conditional classNames

const INTERN = "INTERN";
const COMPANY = "COMPANY";

function Role({ role, setUserRole }) {
  return (
    <div className='flex flex-col xl:flex-row justify-between w-full border border-border rounded-xl p-2'>
      <div className='flex flex-col items-center justify-center my-2'>
        <label className='text-base font-medium'>Choose Your Role</label>
        <span className='text-sm text-destructive font-light mt-1'>
          This can&apos;t be changed later!
        </span>
      </div>

      <div className='flex flex-col gap-2 mt-2 xl:mt-0 xl:flex-row xl:justify-center xl:items-center'>
        <div
          onClick={() => setUserRole(INTERN)}
          className={cn(
            "flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-border text-sm font-medium cursor-pointer transition-colors duration-300",
            role === INTERN && "border-primary bg-muted"
          )}
        >
          <img
            src='/student_vector.svg'
            alt='student vector image'
            className='w-[30px]'
          />
          <span>Intern</span>
        </div>

        <div
          onClick={() => setUserRole(COMPANY)}
          className={cn(
            "flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-border text-sm font-medium cursor-pointer transition-colors duration-300",
            role === COMPANY && "border-primary bg-muted"
          )}
        >
          <img
            src='/hr_vector.svg'
            alt='human resource hiring image'
            className='w-[30px]'
          />
          <span>HR / Company</span>
        </div>
      </div>
    </div>
  );
}

export default Role;
