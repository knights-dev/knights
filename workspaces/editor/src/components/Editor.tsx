/* @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';

import { ArrowLine } from './nodes/ArrowLine';
import { IONode } from './nodes/IONode';
import { PatternNode } from './nodes/PatternNode';
import { ValueNode } from './nodes/ValueNode';

export const Editor: React.FC = () => {
    const viewBox = [0,0,800,600]
    const viewBoxStr = viewBox.join(' ')
    return (
        <React.Fragment>
            <div className="editor-container">
                <svg viewBox={viewBoxStr} className="editor-screen">
                    <IONode x={50} y={50} text="Input" />
                    <PatternNode x={50} y={150} />
                    <ValueNode x={50} y={250} text="f" />

                    <ArrowLine source={[100, 50]} dest={[300, 130]} />
                    <ArrowLine source={[100, 250]} dest={[300, 170]} />

                    <ArrowLine source={[550, 50]} dest={[350, 130]} />
                    <ArrowLine source={[550, 250]} dest={[350, 170]} />

                    <ArrowLine source={[300, 130]} dest={[100, 50]} />
                    <ArrowLine source={[300, 170]} dest={[100, 250]} />

                    <ArrowLine source={[350, 130]} dest={[550, 50]} />
                    <ArrowLine source={[350, 170]} dest={[550, 250]} />

                    <ArrowLine source={[325, 50]} dest={[330, 250]} />
                </svg>
            </div>
        </React.Fragment>
    );
};
