/* @jsx jsx */
import { jsx } from '@emotion/core';
import React, { createRef, useEffect } from 'react';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

import { ArrowLine, IONode, PatternNode, ValueNode } from './nodes';

export const Editor = (): JSX.Element => {
    const viewBoxInitSize = [0, 0, 800, 600];

    const ref = createRef<SVGSVGElement>();

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const svgElement = ref.current!;

        const viewBox$ = new BehaviorSubject(viewBoxInitSize);

        const viewboxSubscription = viewBox$.subscribe(size => {
            svgElement.setAttribute('viewBox', size.join(' '));
        });

        const mouseDown$ = fromEvent<MouseEvent>(svgElement, 'mousedown');
        const mouseMove$ = fromEvent<MouseEvent>(svgElement, 'mousemove');
        const mouseUp$ = fromEvent(window, 'mouseup');

        const dragSubscription = mouseDown$
            .pipe(
                switchMap(event => {
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
                })
            )
            .subscribe(({ dx, dy }) => {
                const viewBoxValues = viewBox$.getValue();
                viewBoxValues[0] = viewBoxValues[0] - dx;
                viewBoxValues[1] = viewBoxValues[1] - dy;
                viewBox$.next(viewBoxValues);
            });

        return (): void => {
            viewboxSubscription.unsubscribe();
            dragSubscription.unsubscribe();
        };
    }, []);

    return (
        <React.Fragment>
            <div className="editor-container">
                <svg ref={ref} className="editor-screen">
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
                    <ArrowLine source={[100, 300]} dest={[300, 380]} withHead={false} />
                </svg>
            </div>
        </React.Fragment>
    );
};
