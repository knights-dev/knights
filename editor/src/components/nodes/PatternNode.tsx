import React from 'react';

import { EventLayout } from '../struct';

type Props = {
    x: number;
    y: number;

    fillColor?: string;
    strokeColor?: string;
    strokeWidth?: number;
    width?: number;
    height?: number;

    onLayout: EventLayout;
};

export const PatternNode: React.VFC<Props> = ({
    x,
    y,
    onLayout,
    height = 30,
    width = 60,
    fillColor = 'transparent',
    strokeColor = 'red',
    strokeWidth = 2,
}) => {
    const points = [
        [x - width / 2, y - height / 2],
        [x - width / 2, y + height / 2],
        [x + width / 2, y + height / 2],
        [x + width / 2, y - height / 2],
    ];
    const pointsText = points.map((p) => p.join(',')).join(' ');

    onLayout({
        inputPoint: [[x - width / 2, y]],
        outputPoint: [x + width / 2, y],
    });

    return <polygon fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} points={pointsText} />;
};
