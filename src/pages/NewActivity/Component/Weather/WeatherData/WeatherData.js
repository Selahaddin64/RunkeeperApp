import React from 'react';

import CurrentTempEl from '../CurrentTempEl';

const WeatherData = ({weatherData}) => {
  return (
    <CurrentTempEl
      data={weatherData && weatherData.length > 0 ? weatherData[0] : {}}
    />
  );
};
export default WeatherData;
