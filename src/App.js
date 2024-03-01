/* eslint-disable no-unused-vars */
import "./App.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Wizard, { WizardStep } from "./Wizard";
import { FormLabel } from "@mui/material";
import { FormCheckInput } from "./FormCheckInput";
import { FormTextInput } from "./FormTextInput";
import FormSelectMultipleBuyers from "./FormSelectMultipleBuyers";
import { FormIncrementor } from "./FormIncrementor";
import Incrementor from "./Incrementor";
import {
  CButton,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFormSelect,
} from "@coreui/react-pro";
import { FormSelectInput } from "./FormSelectInput";
import { OrderOverview } from "./OrderOverview";

const App = () => {
  const [cantMakeIt, setCantMakeIt] = useState(false);
  const [existingStepNumber, setExistingStepNumber] = useState(0);
  const validationSchema = Yup.object().shape({
    ticketCategory1: Yup.number().required("Required"),
    ticketCategory2: Yup.number().required("Required"),
    cantMakeIt: Yup.bool().nullable(),
    cantMakeItDetails: Yup.object().shape({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid Email").required("Required"),
    }),
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
    exitForm: Yup.object()
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
  });
  const initialValues = {
    ticketCategory1: 2,
    ticketCategory2: 4,
    cantMakeIt: false,
    cantMakeItDetails: {
      firstName: "",
      lastName: "",
      email: "",
    },
    exitForm: {
      im_a: "",
      looking_for: {
        option_1: false,
        option_2: false,
        option_3: false,
        option_4: false,
      },
    },
    contacts: [
      {
        firstName: null,
        lastName: null,
        email: null,
        phoneNumber: null,
        location: null,
        linkedin: null,
      },
    ],
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="d-flex align-items-center justify-content-center overflow-hidden">
      <div className="event-details">
        <p>Hello</p>
      </div>
      <div className="form-main overflow-y-scroll">
        <Wizard
          editMode={true}
          readOnly={false}
          initialValues={initialValues}
          validationSchema={validationSchema}
          existingStepNumber={existingStepNumber}
          setExistingStepNumber={setExistingStepNumber}
          onSubmit={(values) => onSubmit(values)}
          identifier={"projects"}
        >
          <WizardStep>
            <div className="incrementor">
              <div className="main-ticket">
                <h6>
                  Conference Access - N25,000 early bird (Full Price N45,000)
                </h6>
                <p>
                  This includes access to Conference & Networking Opportunities
                  during the Conference on October 15th
                </p>
              </div>
              <Incrementor id="ticketCategory1" name="ticketCategory1" />
            </div>
            <div className="incrementor">
              <div className="main-ticket">
                <h6>
                  SVPG Product Masterclass - N100,000 early bird (Full Price
                  N200,000)
                </h6>
                <p>
                  This includes the Day 1 Conference and Networking
                  Opportunities as well as the SVPG Product Masterclass on
                  October 16th & 17th
                </p>
              </div>

              <Incrementor id="ticketCategory2" name="ticketCategory2" />
            </div>
            <div className="incrementor d-flex">
              <div className="main-ticket">
                <h6>Coach The Coaches</h6>
                <p>
                  This session is for coaches who are actively coaching in the
                  product space within Africa or plan to do so in the immediate
                  future. SVPG’s Coach the Coaches requires application and will
                  take place on October 18th. Attendees MUST also attend the
                  Conference and Masterclass (October 15th - 17th)
                </p>
              </div>
              <div className="d-flex align-items-center justify-content-center my-4">
                <CButton className="fixed-width">APPLY NOW</CButton>
              </div>
            </div>
            <div className="mt-3">
              <div className="check-box d-flex align-items-baseline justify-content-center">
                <FormCheckInput
                  id="cantMakeIt"
                  name="cantMakeIt"
                  setCantMakeIt={setCantMakeIt}
                />
                <p className="mb-0">
                  I can't make it! But I'd like to be added to your mailing
                  list!
                </p>
              </div>
              {cantMakeIt && (
                <div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <FormTextInput
                      placeholder="First Name"
                      type="text"
                      id={`cantMakeItDetails.firstName`}
                      name={`cantMakeItDetails.firstName`}
                      disabled={false}
                      placeholderLabel={false}
                    />
                    <FormTextInput
                      placeholder="Last Name"
                      type="text"
                      id={`cantMakeItDetails.lastName`}
                      name={`cantMakeItDetails.lastName`}
                      disabled={false}
                      placeholderLabel={false}
                    />
                  </div>
                  <FormTextInput
                    placeholder="Email"
                    type="email"
                    id={`cantMakeItDetails.email`}
                    name={`cantMakeItDetails.email`}
                    disabled={false}
                    placeholderLabel={false}
                  />
                </div>
              )}
            </div>
          </WizardStep>
          {!cantMakeIt ? (
            <WizardStep>
              <FormSelectMultipleBuyers readOnly={false} />
            </WizardStep>
          ) : null}
          {!cantMakeIt ? (
            <WizardStep>
              <div>
                <FormSelectInput
                  className="my-2"
                  placeholder="I'm a..."
                  options={[
                    { label: "Select an option", value: "" },
                    { label: "Student", value: "Student" },
                    {
                      label: "Product Curious Professional",
                      value: "Product Curious Professional",
                    },
                    { label: "Product Manager", value: "Product Manager" },
                    {
                      label: "UI/UX Designer, Engineer or other Product Pro",
                      value: "UI/UX Designer, Engineer or other Product Pro",
                    },
                    { label: "Product Leader", value: "Product Leader" },
                    { label: "Founder", value: "Founder" },
                  ]}
                  id="exitForm.im_a"
                  name="exitForm.im_a"
                />
              </div>
              <div className="exit-step">
                <div className="exit-step-title mt-4">
                  <p>What are you looking for?</p>
                </div>
                <div className="check-box">
                  <FormCheckInput
                    id="exitForm.looking_for.option_1"
                    name="exitForm.looking_for.option_1"
                  />
                  <p>Access to Industry Leaders</p>
                </div>
                <div className="check-box">
                  <FormCheckInput
                    id="exitForm.looking_for.option_2"
                    name="exitForm.looking_for.option_2"
                  />
                  <p>Networking Opportunities</p>
                </div>
                <div className="check-box">
                  <FormCheckInput
                    id="exitForm.looking_for.option_3"
                    name="exitForm.looking_for.option_3"
                  />
                  <p>Funding for my Startup</p>
                </div>
                <div className="check-box">
                  <FormCheckInput
                    id="exitForm.looking_for.option_4"
                    name="exitForm.looking_for.option_4"
                  />
                  <p>Educational Content</p>
                </div>
              </div>
            </WizardStep>
          ) : null}
          {!cantMakeIt ? (
            <WizardStep>
              <OrderOverview />
            </WizardStep>
          ) : null}
        </Wizard>
      </div>
    </div>
  );
};

export default App;
