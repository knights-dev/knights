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

const ArrowLine = ({ source, dest, withHead = true, strokeColor = 'black', strokeWidth = 2 }: Props): JSX.Element => {
    const [sx, sy] = source,
        [dx, dy] = dest;

    const headDir = Math.atan2(dx - sx, dy - sy);

    const points = [
        ['M', sx, sy],
        ['L', dx, dy],
    ];
    const pathDef = points.map(p => p.join(' ')).join(' ');

    return (
        <React.Fragment>
            <path d={pathDef} fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            {withHead && <ArrowHead hx={dx} hy={dy} dir={headDir} />}
        </React.Fragment>
    );
};

export default React.memo(ArrowLine);
