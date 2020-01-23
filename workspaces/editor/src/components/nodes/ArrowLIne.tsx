/* @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';

import { ArrowHead } from './ArrowHead';

type Props = {
    source: [number, number];
    dest: [number, number];

    baseRadius?: number;
    strokeColor?: string;
    strokeWidth?: number;
};

export const ArrowLine: React.FC<Props> = ({
    source,
    dest,
    baseRadius = 15,
    strokeColor = 'black',
    strokeWidth = 2,
}) => {
    const [sx, sy] = source,
        [dx, dy] = dest;

    const xdir = Math.sign(dx - sx),
        ydir = Math.sign(dy - sy);
    const radius = Math.min(baseRadius, Math.abs(dx - sx));
    const headDir = ydir > 0 ? 90 : 270;

    const cx = dx - radius * xdir;
    const cy = sy + radius * ydir;
    const points = [
        ['M', sx, sy],
        ['L', cx, sy],
        ['A', radius, radius, 0, 0, xdir * ydir > 0 ? 1 : 0, dx, cy],
        ['L', dx, dy],
    ];
    const pathDef = points.map(p => p.join(' ')).join(' ');

    return (
        <React.Fragment>
            <path d={pathDef} fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            <ArrowHead hx={dx} hy={dy} dir={headDir} />
        </React.Fragment>
    );
};
