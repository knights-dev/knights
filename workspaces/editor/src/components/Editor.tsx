/* @jsx jsx */
import { jsx } from '@emotion/core';
import React, { createRef, useEffect, useState } from 'react';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';

import ArrowLayer from './ArrowLayer';
import NodesLayer from './NodesLayer';
import { Graph, NodeID, NodePosition, sampleGraph } from './struct';

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
            tap((event: MouseEvent) => event.preventDefault()),
            filter((event: MouseEvent) => event.shiftKey),
            switchMap(
                (event: MouseEvent): Observable<{ dx: number; dy: number }> => {
                    let prevX = event.clientX;
                    let prevY = event.clientY;

                    return mouseMove$.pipe(
                        map((moveEvent) => {
                            moveEvent.preventDefault();

                            const delta = { dx: moveEvent.clientX - prevX, dy: moveEvent.clientY - prevY };

                            prevX = moveEvent.clientX;
                            prevY = moveEvent.clientY;

                            return delta;
                        }),
                        takeUntil(mouseUp$)
                    );
                }
            ),
            map(({ dx, dy }) => {
                const { offset, scale } = state$.getValue();

                offset.x = offset.x - dx / scale;
                offset.y = offset.y - dy / scale;

                return { offset, scale };
            })
        );

        const zoom$: Observable<State> = fromEvent<WheelEvent>(svgElement, 'wheel').pipe(
            filter((event) => event.deltaY !== 0),
            map((event) => {
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

        const stateSubscription = merge(drag$, zoom$).subscribe((state) => state$.next(state));

        return (): void => {
            viewboxSubscription.unsubscribe();
            stateSubscription.unsubscribe();
        };
    }, []);

    const graph: Graph = sampleGraph;

    const [inputPos, setInputPos] = useState<Map<NodeID, NodePosition[]>>(new Map());
    const [outputPos, setOutputPos] = useState<Map<NodeID, NodePosition>>(new Map());

    return (
        <React.Fragment>
            <div className="editor-container">
                <svg ref={ref} className="editor-screen">
                    <NodesLayer nodes={graph.nodes} setInputPos={setInputPos} setOutputPos={setOutputPos} />
                    <ArrowLayer nodes={graph.nodes} inputPos={inputPos} outputPos={outputPos} />
                </svg>
            </div>
        </React.Fragment>
    );
};
