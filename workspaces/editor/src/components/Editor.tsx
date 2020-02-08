/* @jsx jsx */
import { jsx } from '@emotion/core';
import React, { createRef, useEffect, useState } from 'react';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';

import ArrowLayer from './ArrowLayer';
import { ApplyNode, IONode, ValueNode } from './nodes';
import { EventLayout, Graph, GraphNode, NodeID, NodeLayoutInfo, NodePosition, sampleGraph } from './struct';

const createComponent = (node: GraphNode, onLayout: EventLayout): JSX.Element => {
    const [x, y] = node.position;
    switch (node.type) {
        case 'Input':
            return <IONode x={x} y={y} onLayout={onLayout} text={node.params.bind || ''} key={node.id} />;
        case 'Value':
            return <ValueNode x={x} y={y} onLayout={onLayout} text={node.params.name || ''} key={node.id} />;
        case 'Apply':
            return <ApplyNode x={x} y={y} onLayout={onLayout} key={node.id} />;
        case 'Output':
            return <IONode x={x} y={y} onLayout={onLayout} text="Output" key={node.id} />;
        default:
            throw new Error('Unknown type');
    }
};

interface State {
    offset: { x: number; y: number };
    scale: number;
}

export const Editor = (): JSX.Element => {
    const initialViewBox = { minX: 0, minY: 0, width: 800, height: 600 };

    const ref = createRef<SVGSVGElement>();

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const svgElement = ref.current!;

        const state$ = new BehaviorSubject<State>({ offset: { x: 0, y: 0 }, scale: 1.0 });

        const viewboxSubscription = state$.subscribe(({ offset, scale }) => {
            const minX = offset.x;
            const minY = offset.y;
            const width = initialViewBox.width / scale;
            const height = initialViewBox.height / scale;
            svgElement.setAttribute('viewBox', [minX, minY, width, height].join(' '));
        });

        const mouseMove$ = fromEvent<MouseEvent>(svgElement, 'mousemove');
        const mouseUp$ = fromEvent(window, 'mouseup');

        const drag$: Observable<State> = fromEvent<MouseEvent>(svgElement, 'mousedown').pipe(
            switchMap((event: MouseEvent) => {
                event.preventDefault();

                let prevX = event.clientX;
                let prevY = event.clientY;

                return mouseMove$.pipe(
                    map(moveEvent => {
                        moveEvent.preventDefault();

                        const delta = { dx: moveEvent.clientX - prevX, dy: moveEvent.clientY - prevY };

                        prevX = moveEvent.clientX;
                        prevY = moveEvent.clientY;

                        return delta;
                    }),
                    takeUntil(mouseUp$)
                );
            }),
            map(({ dx, dy }) => {
                const { offset, scale } = state$.getValue();

                offset.x = offset.x - dx / scale;
                offset.y = offset.y - dy / scale;

                return { offset, scale };
            })
        );

        const zoom$: Observable<State> = fromEvent<WheelEvent>(svgElement, 'wheel').pipe(
            filter(event => event.deltaY !== 0),
            map(event => {
                event.preventDefault();

                // relative position
                const { left, top } = svgElement.getBoundingClientRect();
                const cursorClientX = event.clientX - left;
                const cursorClientY = event.clientY - top;

                const {
                    offset: { x: prevOffsetX, y: prevOffsetY },
                    scale: prevScale,
                } = state$.getValue();

                const cursorX = prevOffsetX + cursorClientX / prevScale;
                const cursorY = prevOffsetY + cursorClientY / prevScale;

                const scaleRatio = event.deltaY < 0 ? 1.05 : 1 / 1.05;
                const scale = prevScale * scaleRatio;

                // 「カーソルが不動点」かつ「他の点はカーソルから見た方向が同じで距離がスケール変動倍率の逆数倍」になる必要があり、
                // 左上の座標 (offsetX, offsetY) もこの規則に従って変化する
                const offsetX = cursorX + (prevOffsetX - cursorX) / scaleRatio;
                const offsetY = cursorY + (prevOffsetY - cursorY) / scaleRatio;

                return { offset: { x: offsetX, y: offsetY }, scale };
            })
        );

        const stateSubscription = merge(drag$, zoom$).subscribe(state => state$.next(state));

        return (): void => {
            viewboxSubscription.unsubscribe();
            stateSubscription.unsubscribe();
        };
    }, []);

    const graph: Graph = sampleGraph;

    const [inputPos, setInputPos] = useState<Map<NodeID, NodePosition[]>>(new Map());
    const [outputPos, setOutputPos] = useState<Map<NodeID, NodePosition>>(new Map());
    const nodeElements: JSX.Element[] = [];

    for (const node of graph.nodes) {
        const nodeId = node.id;
        const onLayout = (e: NodeLayoutInfo): void => {
            inputPos.set(nodeId, e.inputPoint);
            outputPos.set(nodeId, e.outputPoint);
            setInputPos(inputPos);
            setOutputPos(outputPos);
        };
        const el = createComponent(node, onLayout);
        nodeElements.push(el);
    }

    return (
        <React.Fragment>
            <div className="editor-container">
                <svg ref={ref} className="editor-screen">
                    {nodeElements}
                    <ArrowLayer nodes={graph.nodes} inputPos={inputPos} outputPos={outputPos} />
                </svg>
            </div>
        </React.Fragment>
    );
};
