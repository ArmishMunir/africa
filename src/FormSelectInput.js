import { CFormSelect } from '@coreui/react-pro'
import { useField, useFormikContext } from 'formik'

export const FormSelectInput = ({ ...props }) => {
    const [field, meta] = useField(props)
    const { setFieldValue, values } = useFormikContext()
    const isValid = !!(meta.touched && meta.error)
    const feedbackMsg = isValid ? meta.error : ''

    return (
        <CFormSelect
            {...field}
            {...props}
            floatingLabel={props.placeholder}
            invalid={isValid}
            valid={meta.touched && !isValid}
            feedbackInvalid={feedbackMsg}
            onChange={(e) => {
                console.log(e.target.value)
                setFieldValue(field.name, e.target.value)
            }}
        />
    )
}