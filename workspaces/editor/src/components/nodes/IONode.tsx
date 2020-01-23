/* @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';

type Props = {
    x:number,
    y:number,
    text?:string
}

export const IONode: React.FC<Props> = props => {
    const height = 30;
    const width = 60;
    const dentDepth = 10;

    const fillColor = "transparent";
    const strokeColor = "red";
    const strokeWidth = 2;
    const x = props.x, y = props.y;
    const points = [
        [ x - width/2 - dentDepth/2, y - height/2],
        [ x - width/2 + dentDepth/2 , y],
        [ x - width/2 - dentDepth/2, y + height/2],
        [ x + width/2 - dentDepth/2, y + height/2],
        [ x + width/2 + dentDepth/2 , y],
        [ x + width/2 - dentDepth/2, y - height/2],
    ]
    const pointsText = points.map( p => p.join(',') ).join(" ")
    const text = props.text == null ? "" : props.text;
    
    /*
    const nodeProp = {
        inputPoint:points[1],
        outputPoint:points[5]
    }
    */

    return (
        <React.Fragment>
            <polygon fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} points={pointsText} />
            <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="node-text">
                {text}
            </text>
        </React.Fragment>
    );
};
