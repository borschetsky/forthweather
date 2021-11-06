import { useEffect, useState } from "react";
import { getPosition } from '../api';

const usePosition = () => {
  const [position, setPosition] = useState(null);
  const [positionError, setPositionError] = useState(null);
  const [navigatorError, setNavigatorError] = useState(false);

  useEffect(() => {
    if (!navigatorError) {
      if (!navigator.geolocation) {
        setNavigatorError(true);
      } else {
        navigator.geolocation.getCurrentPosition((position) => {
          setPosition(position.coords);
        }, () => {
          setNavigatorError(true);
        });
      }
    } else {
      getPosition()
        .then((res) => {
          const { latitude, longitude } = res.data.ip;
          let result = {};
          result.latitude = latitude;
          result.longitude = longitude;
          setPosition(result);

        }).catch(() => {
          setPositionError('Error, fethcing the position.')
        })

    }
  }, [navigatorError])

  return { position, positionError }
};

export default usePosition;