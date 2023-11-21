"use client"

import React from 'react'
import { IssuerGuard } from 'ui/guards/issuer-guard';
import { GuestGuard } from 'ui/guards/guest-guard';
import { Issuer } from 'ui/utils/auth';
import { withGuestGuard } from 'ui/hocs/with-guest-guard';

function layout({ children }) {
    return (
        <>
            <IssuerGuard issuer={Issuer.JWT}>
                <GuestGuard>
                    {children}
                </GuestGuard>
            </IssuerGuard>
        </>
    )
}

export default withGuestGuard(layout);