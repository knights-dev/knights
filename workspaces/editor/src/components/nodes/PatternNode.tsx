/* @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';

type Props = {
    x: number;
    y: number;
};

export const PatternNode: React.FC<Props> = props => {
    const height = 30;
    const width = 60;

    const fillColor = 'transparent';
    const strokeColor = 'red';
    const strokeWidth = 2;
    const x = props.x,
        y = props.y;
    const points = [
        [x - width / 2, y - height / 2],
        [x - width / 2, y + height / 2],
        [x + width / 2, y + height / 2],
        [x + width / 2, y - height / 2],
    ];
    const pointsText = points.map(p => p.join(',')).join(' ');

    /*
    const nodeProp = {
        inputPoint:[x - width/2 , y],
        outputPoint:[x + width/2 , y]
    }
    */

    return (
        <React.Fragment>
            <polygon fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} points={pointsText} />
        </React.Fragment>
    );
};
