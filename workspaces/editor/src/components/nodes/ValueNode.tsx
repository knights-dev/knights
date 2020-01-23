/* @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';

type Props = {
    x: number;
    y: number;
    text?: string;
};

export const ValueNode: React.FC<Props> = props => {
    const radius = 20;

    const fillColor = 'transparent';
    const strokeColor = 'red';
    const strokeWidth = 2;
    const x = props.x,
        y = props.y;
    const text = props.text == null ? '' : props.text;
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
