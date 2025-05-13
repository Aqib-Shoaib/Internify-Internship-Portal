/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

function RangeSelector({ min = 0, max = 100, light = false, cname = "" }) {
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
    <div className={cname}>
      <Input
        type='number'
        value={range.min}
        onChange={setMin}
        placeholder='Min'
        className={`${
          light ? "text-color-muted-foreground" : "text-color-foreground"
        } ${
          light ? "bg-color-light" : "bg-color-dark"
        } py-2 px-4 rounded-lg text-center text-sm font-medium border-none outline-none`}
      />
      <Input
        type='number'
        value={range.max}
        onChange={setMax}
        placeholder='Max'
        className={`${
          light ? "text-color-muted-foreground" : "text-color-foreground"
        } ${
          light ? "bg-color-light" : "bg-color-dark"
        } py-2 px-4 rounded-lg text-center text-sm font-medium border-none outline-none`}
      />
    </div>
  );
}

export default RangeSelector;
