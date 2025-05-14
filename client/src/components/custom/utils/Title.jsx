/* eslint-disable react/prop-types */
function Title({ children, align = "center" }) {
  return (
    <h2
      className={`text-3xl md:text-7xl font-bold tracking-tight text-primary-foreground ${
        align === "left" ? "text-left" : "text-center"
      }`}
    >
      {children}
    </h2>
  );
}

export default Title;
