import { useState, useCallback } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { Stack } from '@mui/material';
import withLayout from '../../../components/LayoutHOC.tsx';
import { Driver, Ride, RideStateEnum } from '../../../../api-client';
import { api, POLLING_INTERVAL } from '../../../../services/api';
import { useUserStore } from '../../../../services/auth/user';
import { RideCard } from './RideCard/RideCard.tsx';
import RideApprovalModal, { SubmitRideInputs } from './RideApprovalModal/RideApprovalModal';
import { useActiveRide } from '../../../../hooks/activeRide';
import { IconButton, Tab, Tabs, Typography } from '@material-ui/core';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const tabStyles = {
  display: 'flex',
  height: '48px',
  padding: '8px 33px',
  justifyContent: 'center',
  alignItems: 'center',
  flex: '1 0 0',
  background: 'var(--White, #FFF)',
  boxShadow:
    '0px 1px 10px 0px rgba(0, 0, 0, 0.12), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 2px 4px -1px rgba(0, 0, 0, 0.20)'
};

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div style={{ padding: 24 }}>
          <Typography>{children}</Typography>
        </div>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const Rides = () => {
  const [selectedRide, setSelectedRide] = useState<Ride>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState(0);
  const user = useUserStore((state) => state.user);
  const { reFetch: reFetchActiveRide } = useActiveRide();
  const { data: rides = [] } = useQuery({
    queryKey: ['ridesGet'],
    queryFn: () => api.ride.ridesGet({ state: RideStateEnum.WaitingForDriver }),
    refetchInterval: POLLING_INTERVAL
  });

  const sortedRides = [...rides].sort((a, b) => {
    const waitingTimeA = a.requestTimeStamp?.getTime() || 0;
    const waitingTimeB = b.requestTimeStamp?.getTime() || 0;
    return waitingTimeA - waitingTimeB;
  });

  const MyRides = 0;

  const onSelectRideCallback = useCallback((ride: Ride) => {
    setSelectedRide(ride);
  }, []);

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const onSubmitRide: SubmitHandler<SubmitRideInputs> = async ({ minutesToArrive }) => {
    if (selectedRide?.state === RideStateEnum.WaitingForDriver) {
      const driver = user as Driver;
      await api.ride.updateRide({
        rideId: selectedRide?.rideId || '',
        ride: {
          state: RideStateEnum.Booked,
          driver: {
            userId: driver?.userId,
            firstName: driver?.firstName,
            lastName: driver?.lastName,
            cellPhone: driver?.cellPhone,
            carManufacturer: driver?.carManufacturer,
            carModel: driver?.carModel,
            carColor: driver?.carColor,
            carPlateNumber: driver?.carPlateNumber
          },
          destinationArrivalTime: new Date().getTime() + minutesToArrive * 60000
        }
      });
      await reFetchActiveRide();
      // navigation will occur automatically (in @../Driver.tsx)

      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div style={{ width: '100%' }}>
        <div style={{ borderBottom: '1px solid divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            indicatorColor="primary"
            textColor="primary" // Set the text color of the selected tab label to "primary" or your preferred color
          >
            <Tab
              label={`קריאות פתוחות (${sortedRides.length})`}
              {...a11yProps(0)}
              style={tabStyles}
            />
            <Tab label={`נסיעות שלי (${MyRides})`} {...a11yProps(1)} style={tabStyles} />
          </Tabs>
        </div>
        <CustomTabPanel value={value} index={0}>
          <RideApprovalModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={onSubmitRide}
          />
          <div className="w-full h-full flex flex-col gap-5 pb-4">
            {sortedRides.length > 0 ? (
              <>
                <h1 className="m-0 text-center text-black">
                  בחרו נסיעה מתוך {sortedRides.length} קריאות פתוחות
                </h1>
                <Stack spacing={2}>
                  {sortedRides.map((ride) => (
                    <RideCard
                      ride={ride}
                      key={`ride-${ride.rideId}`}
                      onSelect={onSelectRideCallback}
                      selected={selectedRide?.rideId === ride.rideId}
                      onApprovePassenger={() => setIsModalOpen(true)}
                    />
                  ))}
                </Stack>
              </>
            ) : (
              <div className="h-full flex flex-col justify-center items-center gap-4">
                <p className="text-center text-black">
                  כרגע אין קריאות פתוחות,
                  <br />
                  נשלח לך ברגע שתפתח קריאה חדשה.
                </p>
              </div>
            )}
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {' '}
          <div className="h-full flex flex-col justify-center items-center">
            <IconButton>
              <SentimentDissatisfiedIcon style={{ width: '48px', height: '48px' }} />
            </IconButton>
            <p className="text-center text-gray-600">
              אין לך נסיעות. <br />
              בחר/י נסיעה מקריאות פתוחות.
            </p>
          </div>
        </CustomTabPanel>
      </div>
    </>
  );
};

const RidesHOC = () => {
  const RidesWithLayout = withLayout(Rides, {
    title: 'נסיעות',
    showLogoutButton: false,
    backgroundColor: 'bg-gray-100',
    hideFooter: true,
    wrapperClassName: 'w-full h-full flex flex-col gap-5 pb-4'
  });

  return <RidesWithLayout />;
};

export default RidesHOC;
