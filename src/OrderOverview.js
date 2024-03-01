/* eslint-disable no-unused-vars */
import { CFormCheck } from "@coreui/react-pro";
import { useField, useFormikContext } from "formik";
import { IoCartOutline } from "react-icons/io5";

export const OrderOverview = ({ ...props }) => {
  const [field, meta] = useField(props);
  const { setFieldValue, values } = useFormikContext();

  const isValid = !!(meta.touched && meta.error);
  const feedbackMsg = isValid ? meta.error : "";
  const price1 = 25000;
  const price2 = 100000;

  return (
    <div>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <IoCartOutline size={80} className="summary-icon" />
        <h2 className="summary-title">Summary</h2>
      </div>
      <div className="d-flex flex-column mt-4 gap-y-2">
        {values.ticketCategory1 ? (
          <div className="order-container d-flex align-items-center justify-content-between order-item px-3 py-4">
            <p>{values.ticketCategory1} X Conference Access</p>
            <p className="fw-semibold">{values.ticketCategory1 * price1}</p>
          </div>
        ) : null}
        {values.ticketCategory2 ? (
          <div className="order-container d-flex align-items-center justify-content-between order-item px-3 py-4">
            <p>{values.ticketCategory2} X SVPG Product Masterclass</p>
            <p className="fw-semibold">{values.ticketCategory2 * price2}</p>
          </div>
        ) : null}
      </div>
      <div className="d-flex justify-content-end align-items-center gap-4 mt-2 order-item px-3 py-4">
        <p className="mb-0 total-text">Total: </p>
        <p className="total">
          {values.ticketCategory2 * price2 + values.ticketCategory1 * price1}
        </p>
      </div>
    </div>
  );
};
