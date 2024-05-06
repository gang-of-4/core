import { capitalize } from '@/utils/format-string';
import { config } from "ui/config";
import {
    Stack,
    Typography,
} from '@mui/material';
import { SeverityPill } from "ui/components/severity-pill";

const getStatusColor = (status) => {
    switch (status) {
        case "DELIVERED":
            return "success";
        case "INPROGRESSS":
            return "warning";
        case "CANCELLED":
            return "error";
        default:
            return "info";
    }
};

export function DetailsOrderStatus({ order }) {
    const statusColor = getStatusColor(order.status);
    return (
        <>
            <Stack
                spacing={2}
                sx={{ width: '100%' }}
                direction={'row'}
                justifyContent={'space-around'}
            >
                <Stack>
                    <Typography color="textPrimary" variant='h6'>
                        {`${capitalize(config.order.name)} ID`}
                    </Typography>
                    <Typography color="textPrimary" variant='h7'>
                        {order.id}
                    </Typography>
                </Stack>

                <Stack>
                    <Typography color="textPrimary" variant='h6'>
                        {`${capitalize(config.order.name)} Created`}
                    </Typography>
                    <Typography color="textPrimary" variant='h7'>
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </Typography>
                </Stack>

                <Stack >
                    <Typography color="textPrimary" variant='h6'>
                        {`${capitalize(config.order.name)} Status`}
                    </Typography>
                    <Typography color="textPrimary" variant='h7'>
                        <SeverityPill color={statusColor}>
                            {order.status}
                        </SeverityPill>
                    </Typography>
                </Stack>
            </Stack>
        </>
    )
}
