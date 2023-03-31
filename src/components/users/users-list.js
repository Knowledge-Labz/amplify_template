import { useAppStore } from 'src/store/app-store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Skeleton from '@mui/material/Skeleton';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import EnhancedTableToolbar from './components/toolbar';
import EnhancedTableHead from './components/table-head';
import { motion } from "framer-motion";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
  
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
  
  // This method is created for cross-browser compatibility, if you don't
  // need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
  
const headCells = [
  {
    id: 'id',
    numeric: true,
    disablePadding: true,
    label: 'User ID',
  },
  {
    id: 'name',
      numeric: false,
      disablePadding: false,
      label: 'Name',
  },
  {
    id: 'lastLogin',
    numeric: false,
    disablePadding: false,
    label: 'Last Login',
  }

];

export const UsersList = ({ ...rest }) => {

const [
  users, 
  getActiveUsers, 
  createUser, 
  userName, 
  setUserName, 
  isLoading
  ] = useAppStore((state) => 
  [
  state.users, 
  state.getActiveUsers, 
  state.createUser, 
  state.userName, 
  state.setUserName, 
  state.isLoading]);

const [order, setOrder] = React.useState('asc');
const [orderBy, setOrderBy] = React.useState('id');
const [selected, setSelected] = React.useState([]);
const [page, setPage] = React.useState(0);
const [dense, setDense] = React.useState(false);
const [rowsPerPage, setRowsPerPage] = React.useState(10);

React.useEffect(() => {
  getActiveUsers();
}, []);

const handleRequestSort = (event, property) => {
  const isAsc = orderBy === property && order === 'asc';
  setOrder(isAsc ? 'desc' : 'asc');
  setOrderBy(property);
};

const handleSelectAllClick = (event) => {
  if (event.target.checked) {
    const newSelected = users.map((n) => n.id);
    setSelected(newSelected);
    return;
  }
  setSelected([]);
};

const handleClick = (event, id) => {
  const selectedIndex = selected.indexOf(id);
  let newSelected = [];

  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selected, id);
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selected.slice(1));
  } else if (selectedIndex === selected.length - 1) {
    newSelected = newSelected.concat(selected.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      selected.slice(0, selectedIndex),
      selected.slice(selectedIndex + 1),
    );
  }

  setSelected(newSelected);
};

const handleChangePage = (event, newPage) => setPage(newPage);

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};

const handleChangeDense = (event) => setDense(event.target.checked);

const isSelected = (id) => selected.indexOf(id) !== -1;

// Avoid a layout jump when reaching the last page with empty rows.
const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  
return (
  <Box sx={{ width: '100%' }}>
    <motion.div
      initial={{ y: "80%", opacity: 0 }}
      animate={{ y: "0%", opacity: 1 }}
      transition={{ type: "spring", stiffness: 90 }}
          >
    <Paper sx={{ width: '100%', mb: 2 }}>
      <EnhancedTableToolbar 
        numSelected={selected.length}
        fetchAllUsers={getActiveUsers}
        createUser={createUser}
        userName={userName}
        setUserName={setUserName}
        isLoading={isLoading}

            />
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={dense ? 'small' : 'medium'}
        >
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={users.length}
            headCells={headCells}
          />
          <TableBody>
            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
               rows.sort(getComparator(order, orderBy)).slice() */}
            {stableSort(users, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <>
                  {!isLoading ? 
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        >
                      <Checkbox
                        onClick={(event) => handleClick(event, row.id)}
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                      </motion.div>
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      
                    >
                      {row.id}
                    </TableCell>
                    <TableCell 
                      align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.lastLogin}</TableCell>
                  </TableRow> :  
                  <TableRow key={row.id}>
                    {[...Array(4)].map((_, index) => 
                      <TableCell key={index}>
                        <motion.div transition={{delay: 0.1, duration: 0.4, repeat: Infinity, repeatType: "reverse", repeatDelay: 0.2}} 
                                    animate={{ rotateX: (index % 2 === 0 ? 180 : -180) }}>
                          <Skeleton variant="rectangular"/>
                        </motion.div>
                      </TableCell>)}
                    </TableRow>
                  }
                  </>
                );
              })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: (dense ? 33 : 53) * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </motion.div>
  </Box>
);
}