import NextLink from 'next/link';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import Trash01Icon from '@untitled-ui/icons-react/build/esm/Trash01';
import {
    IconButton,
    Link,
    Stack,
    SvgIcon,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from '@mui/material';
import { Scrollbar } from '../../../../components/scrollbar';
import { paths } from '../../../../paths';


export const OptionListTable = (props) => {
    const {
        options,
        optionsCount,
        ...other
    } = props;

    return (
        <div {...other}>
            <Scrollbar>
                <Table sx={{ minWidth: 500 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell width="35%">
                                Group Title
                            </TableCell>
                            <TableCell width="25%">
                                Type
                            </TableCell>
                            <TableCell align="center">
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {options?.map((group) => {

                            return (
                                <TableRow
                                    hover
                                    key={group.id}
                                >
                                    <TableCell
                                        padding="checkbox"
                                        width="25%"
                                    >
                                        <Tooltip title="View Option Group">
                                            <IconButton
                                                component={NextLink}
                                                href={`${paths.dashboard.catalog.options.groups.index}/${group.id}`}
                                            >
                                                <SvgIcon>
                                                    <ArrowRightIcon />
                                                </SvgIcon>
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell width="35%">
                                        <Link
                                            color="inherit"
                                            component={NextLink}
                                            href={`${paths.dashboard.catalog.options.groups.index}/${group.id}`}
                                            variant="subtitle2"
                                        >
                                            {group.title}
                                        </Link>
                                    </TableCell>
                                    <TableCell width="25%">
                                        <Typography variant="subtitle2">
                                            {group.type}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Stack
                                            justifyContent={'center'}
                                            direction="row"
                                            spacing={1}
                                        >
                                            <IconButton
                                                onClick={() => {
                                                    // @NOW-TODO delete group
                                                    console.log('delete', group.id);
                                                }}
                                            >
                                                <SvgIcon>
                                                    <Trash01Icon />
                                                </SvgIcon>
                                            </IconButton>
                                            <IconButton
                                                component={NextLink}
                                                href={`${paths.dashboard.catalog.options.groups.index}/${group.id}/edit`}
                                            >
                                                <SvgIcon>
                                                    <Edit02Icon />
                                                </SvgIcon>
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Scrollbar>
        </div>
    );
};
