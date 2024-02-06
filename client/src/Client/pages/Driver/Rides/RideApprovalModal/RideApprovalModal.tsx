import { Modal, Box, Button, IconButton, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import CarIcon from '@mui/icons-material/DirectionsCarFilled';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Ride } from '../../../../../api-client';
import { formatPickupDateTime } from '../../../../../Backoffice/components/Main/components/TimeFunctions/TimeFunctions';

const commonStyle = {
  display: 'flex',
  alignItems: 'stretch',
  gap: '8px'
};

const commonTextStyle = {
  marginRight: '8px',
  fontFamily: 'Heebo',
  fontWeight: '400',
  fontSize: '12px',
  width: '80px',
  Letter: '0.4px',
  align: 'right',
  lineHeight: '20px'
};

const boldTextStyle = {
  ...commonTextStyle,
  fontWeight: '700',
  fontSize: '16px',
  width: '195px',
  letter: '0.15px'
};

const firstTitleStyle = {
  ...boldTextStyle,
  fontWeight: '500',
  fontSize: '22px',
  color: '#007DFF'
};

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

export type SubmitRideInputs = {
  minutesToArrive: number;
};

const RideApprovalModal = ({
  ride,
  open,
  onClose,
  onSubmit
}: {
  ride?: Ride;
  open: boolean;
  onClose: () => void;
  onSubmit: SubmitHandler<SubmitRideInputs>;
}) => {
  const { handleSubmit } = useForm<SubmitRideInputs>();

  return (
    <Modal open={open} disablePortal disableEscapeKeyDown>
      <Box
        className="fixed top-109 left-27 w-320 h-auto p-0 pt-0 pb-20 bg-white rounded-lg shadow-lg flex flex-col gap-20"
        sx={style}
      >
        <form
          className="flex flex-col w-full h-full gap-8"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="flex flex-col w-full h-full gap-8">
            <div className="flex flex-row w-80 h-14 p-3 items-center justify-between">
              <Typography style={firstTitleStyle}>פרטי נסיעה</Typography>
              <IconButton size="small" onClick={onClose}>
                <Close />
              </IconButton>
            </div>

            <div className="flex items-center gap-2">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Line 1: מועד איסוף */}
                <div style={commonStyle}>
                  <Typography style={{ ...commonTextStyle, width: '80px' }}>מועד איסוף:</Typography>
                  <Typography style={boldTextStyle}>
                    {formatPickupDateTime(ride?.pickupDateTime, ride?.relevantTime)}
                  </Typography>
                </div>

                {/* Line 2: כמות */}
                <div style={commonStyle}>
                  <Typography style={commonTextStyle}>כמות:</Typography>
                  <Typography style={boldTextStyle}>{ride?.passengerCount}</Typography>
                </div>

                {/* Line 3: כתובת איסוף */}
                <div style={commonStyle}>
                  <Typography style={commonTextStyle}>כתובת איסוף:</Typography>
                  <a
                    style={{ fontFamily: 'Heebo' }}
                    href={`https://waze.com/ul?q=${ride?.origin}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {ride?.origin}
                  </a>
                </div>

                {/* Line 4: יעד נסיעה */}
                <div style={commonStyle}>
                  <Typography style={commonTextStyle}>יעד נסיעה:</Typography>
                  <a
                    style={{ fontFamily: 'Heebo' }}
                    href={`https://waze.com/ul?q=${ride?.destination}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {ride?.destination}
                  </a>
                </div>

                {/* Line 5: תיאור הנסיעה */}
                <div style={commonStyle}>
                  <Typography style={commonTextStyle}>תיאור הנסיעה:</Typography>
                  <Typography style={boldTextStyle}>{ride?.comment}</Typography>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Button
              className="w-280 h-40px p-[13px 16px] m-20px rounded-md gap-8"
              variant="contained"
              color="primary"
              type="submit"
            >
              בחירת נסיעה
            </Button>
            <Button variant="outlined" color="primary" onClick={onClose}>
              ביטול
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default RideApprovalModal;
