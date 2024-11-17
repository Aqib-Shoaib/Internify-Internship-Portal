/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  color: ${($props) =>
    $props.light ? "var(--color-medium-dark)" : "var(--color-medium-light)"};
  background: ${($props) =>
    $props.light ? "var(--color-light)" : "var(--color-dark)"};
  padding: 0.5rem;
  border-radius: 0.5rem;
  outline: none;
  font-size: var(--fs-body);
  font-weight: var(--fw-medium);
  width: 6rem;
  height: 4rem;
  text-align: center;
  border: none;
`;

function RangeSelector({ min = 0, max = 100, light = false }) {
  // Constants to represent absolute limits
  const MIN = min;
  const MAX = max;

  const [range, setRange] = useState({ min: MIN, max: MAX });

  // Reset range when props change
  useEffect(() => {
    setRange({ min: MIN, max: MAX });
  }, [MIN, MAX]);

  function setMin(e) {
    const newValue = parseInt(e.target.value, 10);
    // Ensure new min value stays within limits and doesn't exceed the current max
    if (newValue < MIN || newValue >= range.max) return;
    setRange((prevRange) => ({ ...prevRange, min: newValue }));
  }

  function setMax(e) {
    const newValue = parseInt(e.target.value, 10);
    // Ensure new max value stays within limits and doesn't go below the current min
    if (newValue > MAX || newValue <= range.min) return;
    setRange((prevRange) => ({ ...prevRange, max: newValue }));
  }

  return (
    <div>
      <StyledInput
        light={light}
        type="number"
        value={range.min}
        onChange={setMin}
        placeholder="Min"
      />
      <StyledInput
        light={light}
        type="number"
        value={range.max}
        onChange={setMax}
        placeholder="Max"
      />
    </div>
  );
}

export default RangeSelector;
