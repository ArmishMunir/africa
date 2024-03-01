import { CFormFeedback, CImage } from '@coreui/react-pro'
import React from 'react'
import exclamationTriangle from './exclamation-triangle.svg'

export const FormInvalidFeedback = ({ feedbackMsg }) => {
    return (
        <CFormFeedback invalid>
            <p className="text-end" style={{ marginTop: '3px', display: 'flex', justifyContent: 'flex-end' }}>
                <CImage src={exclamationTriangle} className="pb-1 pe-1" /> {feedbackMsg}
            </p>
        </CFormFeedback>
    )
}
