"use client"
import {
    Box,
    Container,
    Stack,
    Card,
    CardContent,
    Typography,
} from '@mui/material';


export default function SelectStore() {
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
                                        No Store Selected
                                    </Typography>
                                    <Typography variant="body1">
                                        Select a store from the sidebar to manage items.
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
