import React, { useEffect } from "react";
import { useField, useFormikContext } from "formik";

const Incrementor = ({ id, name, minimum = 0 }) => {
  const { setFieldValue, values } = useFormikContext();
  const [field, meta] = useField({ id, name });
  console.log(values);

  const incrementCount = () => {
    setFieldValue(field.name, field.value + 1);
  };

  const decrementCount = () => {
    setFieldValue(field.name, field.value - 1);
  };

  const handleChange = (e) => {
    setFieldValue(field.name, Number(e.target.value));
  };

  return (
    <div className="bIncrementDecrement-wrapper">
      <div
        className={`icon-decrement ${
          field.value <= minimum ? "decrement-disabled" : ""
        }`}
        onClick={decrementCount}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="2"
          fill="none"
        >
          <path fill="#898993" d="M9.099.5v.805H.37V.5H9.1Z" />
        </svg>
      </div>
      <div className="count">
        <input
          type="number"
          value={field.value}
          onChange={handleChange}
          className={`number-to-text`}
        />
      </div>
      <div className="icon-increment" onClick={incrementCount}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="11"
          fill="none"
        >
          <path
            fill="#898993"
            d="M10.023 4.77v.882H.227V4.77h9.796ZM5.563.137v10.281h-.938V.137h.938Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Incrementor;
