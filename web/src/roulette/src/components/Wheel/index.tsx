import React, { useState, useEffect, useRef } from 'react';

import { getRotationDegrees } from '../../utils.ts';
import { rouletteSelector } from '../common/images';
import {
  RouletteContainer,
  RouletteSelectorImage,
  RotationContainer,
} from './styles';
import {
  DEFAULT_BACKGROUND_COLORS,
  DEFAULT_TEXT_COLORS,
  DEFAULT_OUTER_BORDER_COLOR,
  DEFAULT_OUTER_BORDER_WIDTH,
  DEFAULT_INNER_RADIUS,
  DEFAULT_INNER_BORDER_COLOR,
  DEFAULT_INNER_BORDER_WIDTH,
  DEFAULT_RADIUS_LINE_COLOR,
  DEFAULT_RADIUS_LINE_WIDTH,
  DEFAULT_FONT_SIZE,
  DEFAULT_TEXT_DISTANCE,
} from '../../strings';
import { WheelData } from './types';
import WheelCanvas from '../WheelCanvas/index.tsx';

interface Props {
  mustStartSpinning: boolean;
  prizeNumber: number;
  data: WheelData[];
  onStopSpinning?: () => any;
  backgroundColors?: string[];
  textColors?: string[];
  outerBorderColor?: string;
  outerBorderWidth?: number;
  innerRadius?: number;
  innerBorderColor?: string;
  innerBorderWidth?: number;
  radiusLineColor?: string;
  radiusLineWidth?: number;
  fontSize?: number;
  perpendicularText?: boolean;
  textDistance?: number;
  startSpinTime : number;
  continueSpinTime : number;
  stopSpinTime : number;
  stopDegrees : number;
  startDegrees : number;
  continueDegrees : number;
}

const STARTED_SPINNING = 'started-spinning';

// const START_SPINNING_TIME = 2600;
// const CONTINUE_SPINNING_TIME = 5750;
// const STOP_SPINNING_TIME = 15000;

export const Wheel = ({
  mustStartSpinning,
  prizeNumber,
  data,
  startSpinTime = 2600,
  stopSpinTime = 15000,
  continueSpinTime = 5750,
  startDegrees = 720,
  stopDegrees = 1440,
  continueDegrees = 2880,
  onStopSpinning = () => null,
  backgroundColors = DEFAULT_BACKGROUND_COLORS,
  textColors = DEFAULT_TEXT_COLORS,
  outerBorderColor = DEFAULT_OUTER_BORDER_COLOR,
  outerBorderWidth = DEFAULT_OUTER_BORDER_WIDTH,
  innerRadius = DEFAULT_INNER_RADIUS,
  innerBorderColor = DEFAULT_INNER_BORDER_COLOR,
  innerBorderWidth = DEFAULT_INNER_BORDER_WIDTH,
  radiusLineColor = DEFAULT_RADIUS_LINE_COLOR,
  radiusLineWidth = DEFAULT_RADIUS_LINE_WIDTH,
  fontSize = DEFAULT_FONT_SIZE,
  perpendicularText = false,
  textDistance = DEFAULT_TEXT_DISTANCE,
}: Props) => {
  const [wheelData, setWheelData] = useState<WheelData[]>([...data]);
  const [startRotationDegrees, setStartRotationDegrees] = useState(0);
  const [finalRotationDegrees, setFinalRotationDegrees] = useState(0);
  const [hasStartedSpinning, setHasStartedSpinning] = useState(false);
  const [hasStoppedSpinning, setHasStoppedSpinning] = useState(false);
  const [isCurrentlySpinning, setIsCurrentlySpinning] = useState(false);
  const [isDataUpdated, setIsDataUpdated] = useState(false);

  const mustStopSpinning = useRef<boolean>(false);

  useEffect(() => {
    const dataLength = data.length;
    const wheelDataAux = [{ option: '' }] as WheelData[];
    for (let i = 0; i < dataLength; i++) {
      wheelDataAux[i] = {
        ...data[i],
        style: {
          backgroundColor:
            data[i].style?.backgroundColor ||
            backgroundColors[i % backgroundColors.length],
          textColor:
            data[i].style?.textColor || textColors[i % textColors.length],
        },
      };
    }
    setWheelData([...wheelDataAux]);
    setIsDataUpdated(true);
  }, [data, backgroundColors, textColors]);

  useEffect(() => {
    if (mustStartSpinning && !isCurrentlySpinning) {
      setIsCurrentlySpinning(true);
      startSpinning();
      const finalRotationDegreesCalculated = getRotationDegrees(
        prizeNumber,
        data.length
      );
      setFinalRotationDegrees(finalRotationDegreesCalculated);
    }
  }, [mustStartSpinning]);

  useEffect(() => {
    if (hasStoppedSpinning) {
      setIsCurrentlySpinning(false);
      setStartRotationDegrees(finalRotationDegrees);
    }
  }, [hasStoppedSpinning]);

  const startSpinning = () => {
    setHasStartedSpinning(true);
    setHasStoppedSpinning(false);
    mustStopSpinning.current = true;
    setTimeout(() => {
      if (mustStopSpinning.current) {
        mustStopSpinning.current = false;
        setHasStartedSpinning(false);
        setHasStoppedSpinning(true);
        onStopSpinning();
      }
    }, startSpinTime + continueSpinTime + stopSpinTime - 300);
  };

  const getRouletteClass = () => {
    if (hasStartedSpinning) {
      return STARTED_SPINNING;
    }
    return '';
  };

  if (!isDataUpdated) {
    return null;
  }

  return (
    <RouletteContainer>
      <RotationContainer
        className={getRouletteClass()}
        startSpinningTime={startSpinTime}
        continueSpinningTime={continueSpinTime}
        stopSpinningTime={stopSpinTime}
        startingDegrees = {startDegrees}
        continueDegrees = {continueDegrees}
        stopDegrees = {stopDegrees}
        startRotationDegrees={startRotationDegrees}
        finalRotationDegrees={finalRotationDegrees}
      >
        <WheelCanvas
          width="900"
          height="900"
          data={wheelData}
          outerBorderColor={outerBorderColor}
          outerBorderWidth={outerBorderWidth}
          innerRadius={innerRadius}
          innerBorderColor={innerBorderColor}
          innerBorderWidth={innerBorderWidth}
          radiusLineColor={radiusLineColor}
          radiusLineWidth={radiusLineWidth}
          fontSize={fontSize}
          perpendicularText={perpendicularText}
          textDistance={textDistance}
        />
      </RotationContainer>
      <RouletteSelectorImage src={rouletteSelector.src} alt="roulette-static" />
    </RouletteContainer>
  );
};
