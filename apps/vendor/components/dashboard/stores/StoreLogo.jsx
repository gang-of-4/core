import { Box, Button, SvgIcon } from '@mui/material'
import Image01Icon from '@untitled-ui/icons-react/build/esm/Image01';
import { blueGrey } from '@mui/material/colors';
import React from 'react'

export default function StoreLogo({logo}) {
    return (
        <>
            <Box
                style={{ backgroundImage: `url(${logo})` }}
                sx={{
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    borderRadius: 1,
                    height: 348,
                    position: 'relative',
                    '&:hover': {
                        '& button': {
                            visibility: 'visible'
                        }
                    }
                }}
            >
                <Button
                    startIcon={(
                        <SvgIcon>
                            <Image01Icon />
                        </SvgIcon>
                    )}
                    sx={{
                        backgroundColor: blueGrey[900],
                        bottom: {
                            lg: 24,
                            xs: 'auto'
                        },
                        color: 'common.white',
                        position: 'absolute',
                        right: 24,
                        top: {
                            lg: 'auto',
                            xs: 24
                        },
                        visibility: 'hidden',
                        '&:hover': {
                            backgroundColor: blueGrey[900]
                        }
                    }}
                    variant="contained"
                >
                    Change Logo
                </Button>
            </Box>
        </>
    )
}
