/* eslint-disable react/prop-types */
import { cn } from "@/lib/utils"; // ShadCN utility for conditional classNames

const INTERN = "INTERN";
const COMPANY = "COMPANY";

function Role({ role, setUserRole, roleErr }) {
  return (
    <div className='flex justify-between items-center w-full border border-border/75 rounded-xl p-2 mb-3'>
      <div>
        <label className='text-base font-medium'>Choose Your Role</label>
        <p className='text-xs text-destructive font-light mt-0.5'>{roleErr}</p>
      </div>

      <div className='flex flex-col sm:flex-row gap-2 mt-2 xl:mt-0'>
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
            className='w-[30px] hidden lg:block'
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
            className='w-[30px] hidden lg:block'
          />
          <span>HR / Company</span>
        </div>
      </div>
    </div>
  );
}

export default Role;
