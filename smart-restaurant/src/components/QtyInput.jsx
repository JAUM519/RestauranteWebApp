import React from "react";

export default function QtyInput({ value, onChange, min = 0, ...rest }) {
  return (
    <input
      type="number"
      min={min}
      value={value}
      onChange={(e) => onChange?.(Number(e.target.value))}
      style={{ width: 56 }}
      aria-label="Cantidad"
      {...rest}
    />
  )
}

