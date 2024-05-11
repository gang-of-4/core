"use client"
import { capitalize, getIndefiniteArticle } from '@/utils/format-string';
import {
    Box,
    Container,
    Stack,
    Card,
    CardContent,
    Typography,
} from '@mui/material';
import { config } from 'ui/config';


export default function SelectStore() {

    const storeName = capitalize(config.store.name);

    return (
        <>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="xl">
                    <Stack spacing={4}>
                        <Card>
                            <CardContent>
                                <Stack spacing={2}>
                                    <Typography variant="h4">
                                        No {storeName} Selected
                                    </Typography>
                                    <Typography variant="body1">
                                        Select {getIndefiniteArticle(storeName)} {storeName} from the sidebar to manage {config.catalog.item.plural}.
                                    </Typography>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};
