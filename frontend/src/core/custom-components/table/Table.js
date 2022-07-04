import * as React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import moment from "moment";

import Format from "../../formats/Format";
import {IconButton, Paper, TableSortLabel, TableRow, TablePagination, TableHead, TableContainer, TableCell, TableBody, Table, Box }from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { Delete, Edit } from "@mui/icons-material";
import currencyService from "../../services/currencyService";

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
  return order === "desc"
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

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort, columns, actions = true } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const { t } = useTranslation();

  return (
    <TableHead>
      <TableRow>
        {columns.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            style={{fontWeight: 'bold'}}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {t(headCell.label)}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        {actions && (
          <TableCell padding="normal" align="center" style={{fontWeight: 'bold'}}>
            {t("actions")}
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function EnhancedTable({
  columns,
  actions = true,
  handleEdit,
  handleDelete,
  rows = [],
  cells = [],
}) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Paper sx={{ width: "100%", mb: 2, pr: 4, pl: 4 }}>
      <TableContainer>
        <Table sx={{ minWidth: 450 }} aria-labelledby="tableTitle" size="small">
          <EnhancedTableHead
            columns={columns}
            actions={actions}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {cells.map((cell) => {
                      return (
                        <TableCell key={cell} align="center">
                          {cell === "date"
                            ? moment(row[cell]).utc().format("DD-MM-YYYY")
                            : cell === "feedback" || cell === "amount" || cell === "deposit" || cell === "change"
                            ? Format.formatCurrency(row[cell])
                            : cell === "currencyM" 
                            ? row.currency.name
                            : row[cell]}
                        </TableCell>
                      );
                    })}
                    { actions && 
                      <TableCell align="center">
                       <IconButton color="primary" onClick={() => handleEdit(row)}>
                         <Edit />
                       </IconButton>
                       <IconButton sx={{ ml: 1 }} color="error" onClick={() => handleDelete(row)}>
                         <Delete />
                       </IconButton>
                     </TableCell>
                    }
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 33 * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        labelRowsPerPage=""
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
