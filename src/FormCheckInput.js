import { CFormCheck } from "@coreui/react-pro";
import { useField, useFormikContext } from "formik";
import "./App.css";
export const FormCheckInput = ({ ...props }) => {
  const [field, meta] = useField(props);
  const { setFieldValue, values } = useFormikContext();
  console.log(values, field);

  const isValid = !!(meta.touched && meta.error);
  const feedbackMsg = isValid ? meta.error : "";

  return (
    <input
      type="checkbox"
      //id={field.name}
      // {...field}
      checked={field.value}
      invalid={isValid}
      valid={meta.touched && !isValid}
      feedbackInvalid={feedbackMsg}
      onChange={() => {
        props.setCantMakeIt && props.setCantMakeIt(!field.value);
        setFieldValue(field.name, !field.value);
      }}
    />
  );
};
