'use client'
import { useState, useEffect } from 'react';
import fetchApi from '@/utils/fetch-api';
import EditItemForm from './itemForms/EditItemForm';
import { Box, Container, Stack } from '@mui/material';
import AtomicSpinner from "atomic-spinner";


const EditItem = ({ storeId, itemId, categories, optionGroups }) => {

    const [item, setItem] = useState(null);

    useEffect(() => {
        fetchItem();
    }, [itemId]);

    async function fetchItem() {
        const { data, error } = await fetchApi({
            url: `/vendor/api/catalog/items/${itemId}`,
            options: {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        });

        if (error) {
            console.error(error);
            return;
        }

        setItem(data);
        console.log('item', data);
    }

    return (
        <>
            {item ? (
                <EditItemForm
                    storeId={storeId}
                    item={item}
                    categories={categories}
                    optionGroups={optionGroups}
                />
            ) : (
                <>
                    <Box
                        component="main"
                        sx={{
                            flexGrow: 1,
                            py: 6
                        }}
                    >
                        <Container maxWidth="lg">
                            <Stack
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                spacing={2}
                                sx={{ minHeight: '100%' }}
                            >

                                <AtomicSpinner atomSize={300} />
                                <h1>Loading... please wait</h1>
                            </Stack>
                        </Container>
                    </Box>
                </>
            )}
        </>
    )
};

export default EditItem;
