const chart = `graph LR
    Event["🔔 New Event<br/>From Feed"]
    Dedup{"Already<br/>Seen?"}
    Skip["⏭️ Skip"]
    Intake["📥 Intake<br/>Classify source"]
    Parallel["⚡ Extract Entities<br/>Each Plugin Type in parallel"]
    Triage["⚖️ Triage<br/>Score confidence"]
    Decision{"Incident?"}
    Discard["🗑️ Discard"]
    Match["👤 Assign Analyst"]
    Remed["🛡️ Generate Actions"]
    Store["💾 Save Incident"]

    Event --> Dedup
    Dedup -->|"Yes"| Skip
    Dedup -->|"No"| Intake
    Intake --> Parallel
    Parallel --> Triage
    Triage --> Decision
    Decision -->|"No"| Discard
    Decision -->|"Yes"| Match
    Decision -->|"Yes"| Remed
    Match --> Store
    Remed --> Store
`
export default chart;