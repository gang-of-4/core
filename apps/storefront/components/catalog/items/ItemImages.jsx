"use client"
import React, { useState } from 'react'
import { Box, Stack } from '@mui/material'

export default function ItemImages({ images }) {

    const [activeImage, setActiveImage] = useState(0);

    return (
        <>
            <Stack alignItems='center'>
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
            </Stack>
        </>
    )
}
