/* eslint-disable react/prop-types */
function Title({ children }) {
  return (
    <h2 className='text-3xl md:text-4xl font-bold tracking-tight text-gray-900 text-center'>
      {children}
    </h2>
  );
}

export default Title;
