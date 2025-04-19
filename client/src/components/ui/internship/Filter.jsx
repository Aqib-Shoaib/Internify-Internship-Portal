import styled from "styled-components";

const StyledFilter = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: flex-start;
  width: fit-content;
`;
const Box = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: flex-start;

  div {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  span {
    color: var(--color-medium-light);
  }
`;

function Filter() {
  return (
    <StyledFilter>
      <h3>Filters</h3>

      {/* working schedule */}
      <Box>
        <span>Working Schedule</span>
        <div>
          <input type='checkbox' id='full' name='schedule' value='full-time' />
          <label id='full'>Full Time</label>
        </div>
        <div>
          <input type='checkbox' id='part' name='schedule' value='part-time' />
          <label id='part'>Part Time</label>
        </div>
        <div>
          <input
            type='checkbox'
            id='remote'
            name='schedule'
            value='internship'
          />
          <label id='internship'>Internship</label>
        </div>
        <div>
          <input type='checkbox' id='project' name='schedule' value='project' />
          <label htmlFor='' id='project'>
            Project Work
          </label>
        </div>
        <div>
          <input
            type='checkbox'
            id='Volunteering'
            value='volunteering'
            name='schedule'
          />
          <label id='Volunteering'>Volunteering</label>
        </div>
      </Box>

      {/* employment type */}
      <Box>
        <span>Employement Type</span>

        <div>
          <input
            type='checkbox'
            id='full'
            name='employement'
            value='full-day'
          />
          <label id='full'>Full Day</label>
        </div>
        <div>
          <input
            type='checkbox'
            id='flexible'
            name='employement'
            value='flexible-schedule'
          />
          <label id='flexible'>Flexible Schedule</label>
        </div>
        <div>
          <input type='checkbox' id='remote' name='employement' value='shift' />
          <label id='shift'>Shift Work</label>
        </div>
        <div>
          <input
            type='checkbox'
            id='project'
            name='employement'
            value='remote'
          />
          <label htmlFor='' id='remote'>
            Remote Work
          </label>
        </div>
      </Box>
    </StyledFilter>
  );
}

export default Filter;
