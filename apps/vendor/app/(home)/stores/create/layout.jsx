'use client'
import { withAuthGuard } from 'ui/hocs/with-auth-guard'


function layout({ children }) {
    return (
        <>
            {children}
        </>
    )
}

export default withAuthGuard(layout, { role: 'vendor' })
