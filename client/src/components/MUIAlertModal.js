import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useContext } from "react";
import AuthContext from "../auth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function MUIAlertModal() {
  const { auth } = useContext(AuthContext);

  if (!auth.error) return null;
  let open = auth.error.is_error;

  function handleCloseModal() {
    auth.hideMode();
  }

  return (
    <Modal open={open}>
      <Box sx={style}>
        <div className='modal-dialog'>
          <Alert severity='error'>{auth.error.errorMessage}</Alert>
          <div id='cancel-container'>
            <button
              id='dialog-no-button'
              className='modal-button'
              onClick={handleCloseModal}
            >
              close
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
