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
} from '@mui/material';
import { Scrollbar } from '../../../../components/scrollbar';
import { paths } from '../../../../paths';
import { DeleteCategoryDialog } from './delete-category-dialog';
import { useState } from 'react';
import { catalogApi } from '../../../../api/catalog';


export const CategoryListTable = (props) => {
    const {
        categories,
        categoriesCount,
        handleUpdate,
        ...other
    } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null)

    async function handleDelete(categoryId) {
        try {
            await catalogApi.deleteCategory(categoryId);
            handleUpdate();
        } catch (error) {
            console.error(error);
        } finally {
            setIsOpen(false)
        }
    }

    return (
        <div {...other}>
            <Scrollbar>
                <Table sx={{ minWidth: 500 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell width="50%">
                                Categories
                            </TableCell>
                            <TableCell align="center">
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories?.map((category) => {

                            return (
                                <TableRow
                                    hover
                                    key={category.id}
                                >
                                    <TableCell
                                        padding="checkbox"
                                        width="25%"
                                    >
                                        <Tooltip title="View category">
                                            <IconButton
                                                component={NextLink}
                                                href={`${paths.dashboard.catalog.categories.index}/${category.id}`}
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
                                            href={`${paths.dashboard.catalog.categories.index}/${category.id}`}
                                            variant="subtitle2"
                                        >
                                            {category.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Stack
                                            justifyContent={'center'}
                                            direction="row"
                                            spacing={1}
                                        >
                                            <IconButton
                                                onClick={() => {
                                                    setActiveCategory(category);
                                                    setIsOpen(true);
                                                }}
                                            >
                                                <SvgIcon>
                                                    <Trash01Icon />
                                                </SvgIcon>
                                            </IconButton>
                                            <Tooltip title="This action will be added in a future release" arrow>
                                                <div>
                                                    <IconButton
                                                        component={NextLink}
                                                        href={`${paths.dashboard.catalog.categories.index}/${category.id}/edit`}
                                                        disabled
                                                    >
                                                        <SvgIcon>
                                                            <Edit02Icon />
                                                        </SvgIcon>
                                                    </IconButton>
                                                </div>
                                            </Tooltip>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Scrollbar>
            <DeleteCategoryDialog
                category={activeCategory}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                handleDelete={handleDelete}
            />
        </div>
    );
};
