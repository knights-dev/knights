/* @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';

type Props = {
    hx: number;
    hy: number;
    dir: number;

    strokeColor?: string;
    strokeWidth?: number;
    triangleHeight?: number;
    triangleWidth?: number;
};

export const ArrowHead: React.FC<Props> = ({
    hx,
    hy,
    dir,
    triangleHeight = 10,
    triangleWidth = 10,
    strokeColor = 'black',
    strokeWidth = 2,
}) => {
    const dirRadian = (dir * Math.PI) / 180;
    const tx = Math.cos(dirRadian) * triangleHeight,
        ty = Math.sin(dirRadian) * triangleHeight,
        nx = (Math.sin(dirRadian) * triangleWidth) / 2,
        ny = (-Math.cos(dirRadian) * triangleWidth) / 2;

    const points = [['M', hx, hy], ['l', -tx - nx, -ty - ny], ['l', 2 * nx, 2 * ny], ['Z']];
    const pathDef = points.map(p => p.join(' ')).join(' ');

    return (
        <React.Fragment>
            <path d={pathDef} fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
        </React.Fragment>
    );
};
