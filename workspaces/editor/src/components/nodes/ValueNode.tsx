/* @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';

type Props = {
    x: number;
    y: number;

    text?: string;
    fillColor?: string;
    strokeColor?: string;
    strokeWidth?: number;
    radius?: number;
};

export const ValueNode: React.FC<Props> = ({
    x,
    y,
    text = '',
    radius = 20,
    fillColor = 'transparent',
    strokeColor = 'red',
    strokeWidth = 2,
}) => {
    /*
    const nodeProp = {
        inputPoint:[x - radius , y],
        outputPoint:[x + radius , y]
    }
    */

    return (
        <React.Fragment>
            <circle fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} cx={x} cy={y} r={radius} />
            <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="node-text">
                {text}
            </text>
        </React.Fragment>
    );
};
