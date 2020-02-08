/* @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';

import ArrowHead from './ArrowHead';

type Props = {
    source: [number, number];
    dest: [number, number];

    withHead?: boolean;
    baseRadius?: number;
    strokeColor?: string;
    strokeWidth?: number;
};

/*
    左右から左右に繋ぐ線(二回曲がる)
*/

const ArrowLine = ({
    source,
    dest,
    withHead = true,
    baseRadius = 15,
    strokeColor = 'black',
    strokeWidth = 2,
}: Props): JSX.Element => {
    const [sx, sy] = source,
        [dx, dy] = dest;

    const xdir = Math.sign(dx - sx),
        ydir = Math.sign(dy - sy);
    const radius = Math.min(baseRadius, Math.abs(dy - sy) / 2);
    const mx = (dx + sx) / 2;

    const c1x = mx - radius * xdir;
    const c2y = sy + radius * ydir;
    const c3y = dy - radius * ydir;
    const c4x = mx + radius * xdir;
    const points = [
        ['M', sx, sy],
        ['L', c1x, sy],
        ['A', radius, radius, 0, 0, xdir * ydir > 0 ? 1 : 0, mx, c2y],
        ['L', mx, c3y],
        ['A', radius, radius, 0, 0, xdir * ydir < 0 ? 1 : 0, c4x, dy],
        ['L', dx, dy],
    ];
    const pathDef = points.map(p => p.join(' ')).join(' ');

    return (
        <React.Fragment>
            <path d={pathDef} fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            {withHead && <ArrowHead hx={dx} hy={dy} dir={0} />}
        </React.Fragment>
    );
};

export default React.memo(ArrowLine);
