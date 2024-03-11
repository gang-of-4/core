"use client"
import React, { useState } from 'react'
import { Box, Stack, SvgIcon, Typography } from '@mui/material'
import Image01Icon from '@untitled-ui/icons-react/build/esm/Image01';


export default function ItemImages({ images }) {

    const [activeImage, setActiveImage] = useState(0);

    return (
        <>
            <Stack alignItems='center'>
                {
                    images?.length === 0 ? (
                        <>
                            <Box
                                borderRadius={2}
                                component={'img'}
                                width={500}
                                height={500}
                                src={images[activeImage]?.url}
                                alt={images[activeImage]?.alt}
                            />
                            {
                                images?.length > 1 &&
                                <Stack
                                    marginTop={2}
                                    direction="row"
                                    justifyContent="flex-start"
                                    flexWrap={'wrap'}
                                >
                                    {
                                        images?.map((image, index) => (
                                            <Box
                                                key={index}
                                                borderRadius={2}
                                                component={'img'}
                                                width={100}
                                                height={100}
                                                src={image.url}
                                                alt={image?.alt}
                                                onClick={() => setActiveImage(index)}
                                                sx={{
                                                    cursor: 'pointer',
                                                    opacity: activeImage === index ? 1 : 0.5
                                                }}
                                                marginBottom={1}
                                                marginRight={1}
                                            />
                                        ))
                                    }
                                </Stack>
                            }
                        </>
                    ) : (
                        <Stack
                            alignItems='center'
                            justifyContent='center'
                            sx={{
                                height: 500,
                                backgroundColor: 'grey.300',
                                width: '100%',
                                borderRadius: 2
                            }}
                            spacing={2}
                        >
                            <SvgIcon>
                                <Image01Icon />
                            </SvgIcon>
                            <Typography variant="subtitle2">
                                No Images
                            </Typography>
                        </Stack>
                    )
                }
            </Stack>
        </>
    )
}
