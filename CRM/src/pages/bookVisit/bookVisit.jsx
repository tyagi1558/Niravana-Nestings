import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar'; // Import Snackbar for displaying toast
import MuiAlert from '@mui/material/Alert'; // Import Alert for the toast message
import { getAllBookVisit, updateBookVisit } from "../../utils/api.js";

const columns = [
  { id: 'property', label: 'Property', minWidth: 120, editable: false }, // Add new column for property
  { id: 'propertyCity', label: 'Property City', minWidth: 120, editable: false },
  { id: 'name', label: 'Name', minWidth: 120, editable: false },
  { id: 'phone', label: 'Phone', minWidth: 120, editable: false },
  { id: 'userCity', label: 'User City', minWidth: 120, editable: false },
  { id: 'createdAt', label: 'Created', minWidth: 120, editable: false },
  { id: 'updatedAt', label: 'Last Updated', minWidth: 120, editable: false }, // Add new column for updatedAt
  { id: 'followUp', label: 'Follow-Up', minWidth: 120, editable: true },
  { id: 'reason', label: 'Reason', minWidth: 120, editable: true },
  { id: 'response', label: 'Response', minWidth: 120, editable: true },
  { id: 'nextFollowUp', label: 'Next Follow-Up', minWidth: 120, editable: true },
  { id: 'calendarCondition', label: 'Calendar Condition', minWidth: 120, editable: true },
];
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
}

const ContactDetails = () => {
  const [contactDetails, setContactDetails] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [editMode, setEditMode] = React.useState(null);
  const [editedValues, setEditedValues] = React.useState({});
  const [toastOpen, setToastOpen] = React.useState(false); // State for controlling toast
  const [refreshTable, setRefreshTable] = React.useState(false); // State for refreshing table data

  React.useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const data = await getAllBookVisit();
        setContactDetails(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching contact details", error);
        // Handle error accordingly
      }
    };

    fetchContactDetails();
  }, [refreshTable]); // Trigger effect on refreshTable state change

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEdit = (id) => {
    setEditMode(id);
    const contact = contactDetails.find(contact => contact.id === id);
    setEditedValues(contact);
  };

  const handleSave = async () => {
    try {
      await updateBookVisit(editedValues.id, editedValues);
      console.log("Booking visit updated successfully");
      setEditMode(null);
      setRefreshTable(!refreshTable); // Trigger table data refresh
      setToastOpen(true); // Show toast message
    } catch (error) {
      console.error("Error updating booking visit", error);
      // Handle error accordingly
    }
  };

  const handleCancel = () => {
    setEditMode(null);
  };

  const handleInputChange = (e, field) => {
    setEditedValues({ ...editedValues, [field]: e.target.value });
  };

  const handleCloseToast = () => {
    setToastOpen(false); // Close the toast message
  };

  return (
    <div>
      <h2>Book Visit Details</h2>
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        fullWidth
        style={{ marginBottom: '16px' }}
      />
      <Snackbar open={toastOpen} autoHideDuration={6000} onClose={handleCloseToast}>
        <MuiAlert onClose={handleCloseToast} severity="success" sx={{ width: '100%' }}>
          Booking visit updated successfully
        </MuiAlert>
      </Snackbar>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="center"
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">Loading...</TableCell>
                </TableRow>
              ) : (
                contactDetails
                  .filter((contact) =>
                    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    contact.phone.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover key={row.id}>
  {columns.map((column) => (
    <TableCell align="center" key={column.id}>
      {column.editable && editMode === row.id ? (
        <TextField
          value={editedValues[column.id]}
          onChange={(e) => handleInputChange(e, column.id)}
          fullWidth
        />
        ) : column.id === 'createdAt' || column.id === 'updatedAt' ? (
          formatDate(row[column.id])
      ) : column.id === 'propertyCity' ? (
        // Display property's city from Residency
        row.Residency?.city
      ) : column.id === 'userCity' ? (
        // Display user's city
        row.city
      ) : (
        row[column.id]
      )}
    </TableCell>
  ))}
                      <TableCell align="center">
                        {editMode === row.id ? (
                          <div>
                            <IconButton onClick={handleSave} color="primary">
                              <SaveIcon />
                            </IconButton>
                            <IconButton onClick={handleCancel} color="secondary">
                              <CancelIcon />
                            </IconButton>
                          </div>
                        ) : (
                          <IconButton onClick={() => handleEdit(row.id)} color="primary">
                            <EditIcon />
                          </IconButton>
                        )}
                      </TableCell>
                      
                    </TableRow>
                  ))
              )}

            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={contactDetails.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default ContactDetails;
