import React from 'react';
import Circle from './circle';
import Line from './line';
import Path from './path';
import Poll from './poll';
import Polygon from './polygon';
import Polyline from './polyline';
import Text from './text';
import {
  SHAPES,
  isEmpty,
  isEqual,
} from 'utils/data';
import logger from 'utils/logger';

const Canvas = ({
  draws,
  drawsInterval,
  recordId,
}) => {
  if (isEmpty(drawsInterval)) return null;

  const canvas = [];

  for (let i = 0; i < drawsInterval.length; i++) {
    if (!drawsInterval[i]) continue;

    const {
      id,
      shape,
      style,
    } = draws[i];

    const j = i + 1;
    let intermediate = false;
    if (j < drawsInterval.length) {
      intermediate = draws[j].id === id;
    }

    if (intermediate) continue;

    const {
      data,
      type,
    } = shape;

    switch (type) {
      case SHAPES.CIRCLE:
        canvas.push(
          <Circle
            data={data}
            key={id}
            style={style}
          />
        );
        break;
      case SHAPES.LINE:
        canvas.push(
          <Line
            data={data}
            key={id}
            style={style}
          />
        );
        break;
      case SHAPES.PATH:
        canvas.push(
          <Path
            data={data}
            key={id}
            style={style}
          />
        );
        break;
      case SHAPES.POLL:
        canvas.push(
          <Poll
            data={data}
            key={id}
            recordId={recordId}
            style={style}
          />
        );
        break;
      case SHAPES.POLYGON:
        canvas.push(
          <Polygon
            data={data}
            key={id}
            style={style}
          />
        );
        break;
      case SHAPES.POLYLINE:
        canvas.push(
          <Polyline
            data={data}
            key={id}
            style={style}
          />
        );
        break;
      case SHAPES.TEXT:
        canvas.push(
          <Text
            data={data}
            key={id}
            style={style}
          />
        );
        break;
      default:
        logger.debug('unhandled', type);
    }
  }

  return (
    <g>
      {canvas}
    </g>
  );
};

const areEqual = (prevProps, nextProps) => {
  if (!isEqual(prevProps.draws, nextProps.draws)) return false;

  if (!isEqual(prevProps.drawsInterval, nextProps.drawsInterval)) return false;

  return true;
};

export default React.memo(Canvas, areEqual);
