import { FieldArray, useFormikContext } from 'formik'
import React from 'react'
import { FormTextInput } from './FormTextInput'

export const contactValues = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    contactType: 'private',
    description: '',
}

export default function FormSelectMultipleBuyers({
    readOnly,
}) {
    const {
        values: { contacts },
    } = useFormikContext()

    return (
        <>
            <FieldArray
                name="contacts"
                render={({ push, remove }) => (
                    <>
                        {contacts.map((contact, index) => (
                            <div
                                key={index}
                                className={`${contacts.length - 1 !== index ? 'mb-5' : ''} position-relative`}
                            >
                                <FormTextInput
                                    placeholder="First Name"
                                    type="text"
                                    id={`contacts.${index}.firstName`}
                                    name={`contacts.${index}.firstName`}
                                    disabled={readOnly}
                                    placeholderLabel={false}
                                />
                                <FormTextInput
                                    placeholder="Last Name"
                                    type="text"
                                    id={`contacts.${index}.lastName`}
                                    name={`contacts.${index}.lastName`}
                                    disabled={readOnly}
                                    placeholderLabel={false}
                                />
                                <FormTextInput
                                    placeholder="Email"
                                    type="email"
                                    id={`contacts.${index}.email`}
                                    name={`contacts.${index}.email`}
                                    disabled={readOnly}
                                    placeholderLabel={false}
                                />
                                <FormTextInput
                                    placeholder="Phone Number"
                                    type="text"
                                    id={`contacts.${index}.phoneNumber`}
                                    name={`contacts.${index}.phoneNumber`}
                                    disabled={readOnly}
                                    placeholderLabel={false}
                                />
                                <FormTextInput
                                    placeholder="Location"
                                    type="text"
                                    id={`contacts.${index}.location`}
                                    name={`contacts.${index}.location`}
                                    disabled={readOnly}
                                    placeholderLabel={false}
                                />
                                <FormTextInput
                                    placeholder="LinkedIn"
                                    type="text"
                                    id={`contacts.${index}.linkedin`}
                                    name={`contacts.${index}.linkedin`}
                                    disabled={readOnly}
                                    placeholderLabel={false}
                                />
                            </div>
                        ))}
                    </>
                )}
            />
        </>
    )
}
