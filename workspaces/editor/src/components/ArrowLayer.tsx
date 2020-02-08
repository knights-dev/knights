/* @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';

import { ArrowLine } from './nodes';
import { GraphNode, NodeID, NodePosition } from './struct';

type Props = {
    nodes: GraphNode[];
    inputPos: Map<NodeID, NodePosition[]>;
    outputPos: Map<NodeID, NodePosition>;
};

const PatternNode = ({ nodes, inputPos, outputPos }: Props): JSX.Element => {
    const arrowElements: JSX.Element[] = [];
    for (const node of nodes) {
        const toId = node.id;
        const destPosList = inputPos.get(toId);
        if (destPosList == null) continue;
        const argLength = node.inputs.length;
        for (let argId = 0; argId < argLength; argId++) {
            const fromId = node.inputs[argId];
            const sourcePos = outputPos.get(fromId);
            const destPos = destPosList[argId];
            if (sourcePos != null && destPos != null) {
                const el = (
                    <ArrowLine
                        source={sourcePos}
                        dest={destPos}
                        horizontal={argId == 0}
                        withHead={argId > 0 || argLength <= 1}
                    />
                );
                arrowElements.push(el);
            }
        }
    }
    return (
        <React.Fragment>
            <g className="layer-arrows">{arrowElements}</g>
        </React.Fragment>
    );
};

export default React.memo(PatternNode);
