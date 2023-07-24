import { Box, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import DataGridMUI from './dataGrid/DataGridMUI';
import NestedList from './nestedCheckboxes/NestedList';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const SecondPage = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState<string | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('formData');
    setFormData(data);
    if (!data) {
      setShowAlert(true);
      setTimeout(() => {
        navigate('/first-page');
      }, 5000);
    }
  }, []);

  return (
    <Box>
      <Snackbar
        open={showAlert}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert severity="warning" elevation={6} variant="filled">
          Form data not found. Redirecting to form page.
        </MuiAlert>
      </Snackbar>
      {formData && (
        <>
          <DataGridMUI />
          <Box sx={{ my: 2 }} />
          <NestedList />
        </>
      )}
    </Box>
  );
};

export default SecondPage;
