import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

mermaid.initialize({ startOnLoad: false, theme: "dark" });

let idCounter = 0;

export default function MermaidDiagram({ chart }) {
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current && chart) {
            const id = `mermaid-diagram-${idCounter++}`;
            mermaid.render(id, chart).then(({ svg }) => {
                containerRef.current.innerHTML = svg;
            });
        }
    }, [chart]);

    return <div ref={containerRef} />;
}
