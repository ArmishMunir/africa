import { CButton } from "@coreui/react-pro";
import { Formik, Form } from "formik";
import React, { useState, useRef, useEffect } from "react";
import uuid from "react-uuid";
import * as Yup from "yup";
import { PaystackButton } from "react-paystack";
import { IoChevronBackSharp } from "react-icons/io5";

const Wizard = ({
  editMode,
  children,
  initialValues = {},
  onSubmit,
  stepsProperties,
  validationSchema,
  readOnly,
  existingStepNumber = 0,
  setExistingStepNumber,
}) => {
  const [stepNumber, setStepNumber] = useState(existingStepNumber);
  const steps = React.Children.toArray(children);
  const [snapshot, setSnapshot] = useState(initialValues);
  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;
  const prevStepNumberRef = useRef(0);
  const [formikKey, setFormikKey] = useState();
  console.log(validationSchema[existingStepNumber]);
  console.log(existingStepNumber);
  const validations = [
    Yup.object().shape({
      ticketCategory1: Yup.number().required("Required"),
      ticketCategory2: Yup.number().required("Required"),
      cantMakeIt: Yup.bool().nullable(),
      cantMakeItDetails: Yup.object().shape({
        firstName: Yup.string(),
        lastName: Yup.string(),
        email: Yup.string().email("Invalid Email"),
      }),
    }),
    Yup.object().shape({
      contacts: Yup.array().of(
        Yup.object().shape({
          firstName: Yup.string().required("Required"),
          lastName: Yup.string().required("Required"),
          email: Yup.string().email("Invalid Email").required("Required"),
          phoneNumber: Yup.string().required("Required"),
          linkedin: Yup.string().nullable(),
          location: Yup.string().required("Required"),
        })
      ),
    }),
    Yup.object()
      .shape({
        option_1: Yup.bool(),
        option_2: Yup.bool(),
        option_3: Yup.bool(),
        option_4: Yup.bool(),
      })
      .test(
        "atLeastOneTrue",
        "At least one option must be selected",
        function (value) {
          return (
            value.option_1 || value.option_2 || value.option_3 || value.option_4
          );
        }
      ),
  ];

  useEffect(() => {
    setStepNumber(existingStepNumber);
  }, [existingStepNumber]);

  useEffect(() => {
    setExistingStepNumber(stepNumber);
  }, [stepNumber]);

  useEffect(() => {
    setSnapshot(initialValues);
    if (editMode && readOnly) {
      setFormikKey(uuid());
    } else {
      setFormikKey(initialValues.id ?? "new");
    }
  }, [initialValues]);

  const next = (formik) => {
    formik.validateForm();
    console.log(formik.errors);
    setStepNumber(Math.min(stepNumber + 1, totalSteps - 1));
  };

  const previous = () => {
    setStepNumber(Math.max(stepNumber - 1, 0));
  };

  const handleSubmit = async (values, bag) => {
    if (step.props.onSubmit) {
      await step.props.onSubmit(values, bag);
    }
    if (editMode || isLastStep) {
      return onSubmit(values, bag);
    } else {
      bag.setTouched({});
      next(values);
    }
  };

  const componentProps = {
    email: "test@test.com",
    amount: 1000,
    metadata: {
      name: "zzzz",
      phone: "123123",
    },
    publicKey: "sdf",
    text: "Pay Now",
    onSuccess: () =>
      alert("Thanks for doing business with us! Come back soon!!"),
    onClose: () => alert("Wait! You need this oil, don't go!!!!"),
  };

  return (
    <Formik
      key={formikKey}
      initialValues={snapshot}
      enableReinitialize={true}
      onSubmit={handleSubmit}
      validationSchema={validations[existingStepNumber]}
    >
      {(formik) => (
        <Form className="formik-form">
          <div>
            <div className="stepper__form">{step}</div>
          </div>
          {isLastStep && stepNumber === 0 && (
            <div className="mt-3 drawer-spacing-end drawer-footer">
              <CButton
                className="mr-auto drawer-footer-btn"
                disabled={!formik.isValid}
                type="submit"
              >
                Submit
              </CButton>
            </div>
          )}
          {isLastStep && stepNumber !== 0 && (
            <div
              className={`mt-3 drawer-spacing drawer-footer py-3
              ${stepNumber === 3 ? "drawer-footer-last" : ""}
            `}
            >
              <CButton
                className=""
                variant="ghost"
                onClick={() => previous()}
                type="button"
              >
                <IoChevronBackSharp color="white" size={20} />
              </CButton>
              <PaystackButton
                type="submit"
                disabled={!formik.isValid}
                className="pay-now-button mx-auto"
                {...componentProps}
              />
            </div>
          )}
          {!isLastStep && stepNumber === 0 && (
            <div className="mt-3 drawer-spacing-end drawer-footer">
              <CButton
                className="drawer-footer-next-btn"
                disabled={!formik.isValid}
                onClick={() => next(formik)}
                type="button"
                variant="outline"
              >
                Next
              </CButton>
            </div>
          )}
          {!isLastStep && stepNumber >= 1 && (
            <div className="mt-3 drawer-spacing drawer-footer">
              <CButton
                className="drawer-footer-back-btn"
                variant="outline"
                onClick={() => previous()}
                type="button"
              >
                Back
              </CButton>
              <CButton
                className="drawer-footer-next-btn"
                disabled={!formik.isValid}
                onClick={() => next(formik)}
                type="button"
              >
                Next
              </CButton>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export const WizardStep = ({ children }) => children;

export default Wizard;
