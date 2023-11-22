import { useEffect, useState } from 'react';
import { Modal, Box, Button } from '@mui/material';
import { Cancel } from '@mui/icons-material';
import { useUserContext } from '../../../context/UserContext/UserContext';
import { RideStateEnum } from '../../../api-client';
import { api, getGuestToken } from '../../../Config';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 320,
  bgcolor: 'background.paper',
  borderRadius: '4px',
  boxShadow: 24,
  p: 2.5
};

const RideCanceledModal = () => {
  const { activeRide: ride } = useUserContext();
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    setIsClosed(false);
  }, [ride]);

  async function onClose() {
    const guestToken = getGuestToken() || '';
    await api.ride.postConfirmRideComplete({ guestToken });
    setIsClosed(true);
  }

  return (
    <Modal
      open={!isClosed && ride?.state === RideStateEnum.Canceled}
      disablePortal
      disableEscapeKeyDown
    >
      <Box sx={style}>
        <div className="flex flex-col w-full h-full gap-5">
          <div className="flex flex-col justify-center flex-grow">
            <div className="flex justify-center">
              <Cancel color="error" className="w-12 h-12" />
            </div>
            <h1 className="text-red-600 text-center my-3 text-[22px]">נסיעתך בוטלה</h1>
          </div>
          <p className="text-center text-lg text-gray-600">תוכלו להזמין הסעה חדשה.</p>
          <Button variant="contained" className="flex gap-2" onClick={() => onClose()}>
            תודה, הבנתי
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default RideCanceledModal;
