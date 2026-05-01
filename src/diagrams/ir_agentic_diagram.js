const chart = `flowchart TD
    START([Start]) --> INTAKE[Intake Node]

    subgraph SOURCES[Parallel Source Nodes]
        direction LR
        MISP_NODE[MISP Node]
        SENTINEL_NODE[Sentinel Node]
        CERTIS_NODE[CERT-IS Node]
        MORE_SOURCE["Other Sources
         (SIEM, EDR, etc.)"]
    end

    INTAKE --> MISP_NODE
    INTAKE --> SENTINEL_NODE
    INTAKE --> CERTIS_NODE
    INTAKE --> MORE_SOURCE

    MISP_NODE --> TRIAGE[Triage Node]
    SENTINEL_NODE --> TRIAGE
    CERTIS_NODE --> TRIAGE
    MORE_SOURCE --> TRIAGE

    subgraph POST_TRIAGE[Parallel Post-Triage]
        direction LR
        MATCHING[Matching Node]
        REMEDIATION[Remediation Node]
    end

    TRIAGE --> MATCHING
    TRIAGE --> REMEDIATION

    MATCHING --> END([End])
    REMEDIATION --> END

    %% Style the "Additional Source" as a dashed, lighter placeholder
    classDef future stroke-dasharray: 5 5,fill:#ffffff,color:#555;
    class MORE_SOURCE future;
`
export default chart;