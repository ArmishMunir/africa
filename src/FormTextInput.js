import { CFormInput, CFormLabel } from '@coreui/react-pro'
import { useField } from 'formik'
import { FormInvalidFeedback } from './FormInvalidFeedback'
import cn from 'classnames'

export const FormTextInput = ({ className, type, id, placeholder, name, disabled, placeholderLabel = true }) => {
    const [field, meta] = useField({ type, id, placeholder, name })

    const isValid = !!(meta.touched && meta.error)
    const feedbackMsg = isValid ? meta.error : ''

    return (
        <div className={cn('my-3', className)}>
            <div style={{ display: 'flex' }}>
                {placeholderLabel && <div style={{ flex: '1' }}>
                    <CFormLabel>{placeholder}</CFormLabel>
                </div>}
                <div style={{ flex: '2' }}>
                    <CFormInput
                        type={type}
                        disabled={disabled}
                        id={id}
                        floatingLabel={placeholder}
                        placeholder={placeholder}
                        name={name}
                        {...field}
                        invalid={isValid}
                        valid={meta.touched && !isValid}
                        className="full-width"
                    />
                </div>
            </div>
            {isValid && <FormInvalidFeedback feedbackMsg={feedbackMsg} />}
        </div>
    )
}
