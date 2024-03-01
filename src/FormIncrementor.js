import { CFormLabel } from '@coreui/react-pro'
import { useField, useFormikContext } from 'formik'

import { FormInvalidFeedback } from './FormInvalidFeedback'
import cn from 'classnames'
import Incrementor from './Incrementor'

export const FormIncrementor = ({
    count = 0,
    setCantMakeIt = () => { },
    minimum = 0,
    step = 1,
    setIsAllowed = () => { },
    id,
    placeholder
}) => {
    const { setFieldValue, values } = useFormikContext()
    const [field, meta] = useField({ id })

    const isValid = !!(meta.touched && meta.error)
    const feedbackMsg = isValid ? meta.error : ''

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: '2' }}>
                    <CFormLabel>{placeholder}</CFormLabel>
                </div>
                <div style={{ flex: '1' }}>
                    <Incrementor
                        count={count}
                        minimum={minimum}
                        step={step}
                    />
                </div>
            </div>
            {isValid && <FormInvalidFeedback feedbackMsg={feedbackMsg} />}
        </div>
    )
}
