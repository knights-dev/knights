/* @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';

type Props = {
    hx: number;
    hy: number;
    dir: number;
};

export const ArrowHead: React.FC<Props> = props => {
    const strokeColor = 'black';
    const strokeWidth = 2;
    const triangleHeight = 10;
    const triangleWidth = 10;
    const hx = props.hx,
        hy = props.hy,
        dir = (props.dir * Math.PI) / 180;
    const tx = Math.cos(dir) * triangleHeight,
        ty = Math.sin(dir) * triangleHeight,
        nx = (Math.sin(dir) * triangleWidth) / 2,
        ny = (-Math.cos(dir) * triangleWidth) / 2;

    const points = [['M', hx, hy], ['l', -tx - nx, -ty - ny], ['l', 2 * nx, 2 * ny], ['Z']];
    const pathDef = points.map(p => p.join(' ')).join(' ');

    return (
        <React.Fragment>
            <path d={pathDef} fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
        </React.Fragment>
    );
};
