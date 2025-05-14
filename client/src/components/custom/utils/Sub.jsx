/* eslint-disable react/prop-types */
function Sub({ children, align = "center" }) {
  return (
    <p
      className={`mt-2 text-lg text-primary-foreground/75 font-medium ${
        align === "left" ? "text-left" : "text-center"
      } max-w-2xl`}
    >
      {children}
    </p>
  );
}

export default Sub;
