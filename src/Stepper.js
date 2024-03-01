import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'

export default function WizardStepper({
    steps,
    stepNumber,
    setStepNumber,
    formik,
    prevStepNumberRef,
    allFormSchema,
    readOnly,
}) {
    // const [labelProps, setLabelProps] = useState({})

    // useEffect(() => {
    //     let labelProps = {}
    //     if (!readOnly) {
    //         formik.validateForm()
    //         let intersection = []
    //         for (let i = 0; i < stepNumber; i++) {
    //             intersection = Object.keys(formik.errors).filter((value) =>
    //                 allFormSchema[steps[i].id].fields.includes(value),
    //             )
    //             if (intersection.length > 0) {
    //                 labelProps[steps[i].id] = { error: true }
    //             } else {
    //                 labelProps[steps[i].id] = { error: false }
    //             }
    //         }
    //         setLabelProps(labelProps)

    //         if (stepNumber < prevStepNumberRef.current) {
    //             Object.keys(formik.values).forEach((fieldName) => {
    //                 if (Array.isArray(formik.values[fieldName])) {
    //                     formik.values[fieldName].forEach((fieldName2, mainIndex) => {
    //                         fieldName2 &&
    //                             Object.keys(fieldName2).forEach((fieldName3) => {
    //                                 if (allFormSchema[steps[stepNumber].id].fields.includes(fieldName3)) {
    //                                     formik.setFieldTouched(`${fieldName}.${mainIndex}.${fieldName3}`, true)
    //                                 }
    //                             })
    //                     })
    //                 } else if (allFormSchema[steps[stepNumber].id].fields.includes(fieldName)) {
    //                     formik.setFieldTouched(fieldName, true)
    //                 }
    //             })
    //         }
    //     } else {
    //         for (let i = 0; i < steps.length; i++) {
    //             labelProps[steps[i].id] = { error: false }
    //         }
    //         setLabelProps(labelProps)
    //     }
    // }, [stepNumber])

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={stepNumber} alternativeLabel>
                {steps.map((step, index) => {
                    return (
                        <Step
                            key={step.id}
                            {...(readOnly && { completed: true })}
                            onClick={() => {
                                prevStepNumberRef.current = stepNumber
                                setStepNumber(index)
                            }}
                        >
                            <StepLabel>
                                {step.label}
                            </StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
        </Box>
    )
}
