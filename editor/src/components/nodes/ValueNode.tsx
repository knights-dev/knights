import React from 'react';

import { EventLayout } from '../struct';

type Props = {
    x: number;
    y: number;

    text?: string;
    fillColor?: string;
    strokeColor?: string;
    strokeWidth?: number;
    radius?: number;

    onLayout: EventLayout;
};

export const ValueNode: React.VFC<Props> = ({
    x,
    y,
    onLayout,
    text = '',
    radius = 20,
    fillColor = 'transparent',
    strokeColor = 'red',
    strokeWidth = 2,
}) => {
    onLayout({
        inputPoint: [[x - radius, y]],
        outputPoint: [x + radius, y],
    });

    return (
        <>
            <circle fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} cx={x} cy={y} r={radius} />
            <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="node-text">
                {text}
            </text>
        </>
    );
};
