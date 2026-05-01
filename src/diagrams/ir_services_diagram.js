const chart=
`graph LR
    subgraph Sources["🔌 Feed Sources"]
        MockSvc["🎭 Mock Services<br/>:8004"]
        MISP["📋 MISP<br/>:7001"]
        MockSvc -->|Feed| MISP
    end

    subgraph Processing["⚙️ Processing Layer"]
        Orch["🔧 Orchestrator<br/>:8002<br/>Dedup + Plugins"]
        Agents["🧠 Agents<br/>:8003<br/>LangGraph Pipeline"]
        Orch -->|"POST /pipeline/process"| Agents
    end

    subgraph Data["💾 Data Stores"]
        Neo["📊 Neo4j<br/>:7687"]
        MySQL["🗄️ MySQL<br/>:3306"]
        Redis["📬 Redis<br/>:6379"]
    end

    subgraph AI["🤖 AI Services"]
        AzureOAI["🧠 Azure OpenAI<br/>GPT-4.1"]
    end

    subgraph Client["🖥️ Client Layer"]
        CoreAPI["🌐 Core API<br/>:8000"]
        Socket["⚡ Socket.IO<br/>:3001"]
        Frontend["💻 Frontend<br/>:5173"]
        Frontend -->|"REST API"| CoreAPI
        Frontend -->|"WebSocket"| Socket
    end

    %% Cross-group edges
    MISP -->|Feed| Orch
    MockSvc -->|Feed| Orch
    MISP -->|Cache| Redis
    Agents -->|Read/Write| Neo
    Agents -->|Read/Write| MySQL
    Agents -->|"LLM Calls"| AzureOAI
    CoreAPI -->|"LLM Calls"| AzureOAI
    Agents -->|HTTP| CoreAPI
    CoreAPI -->|Query| Neo
    CoreAPI -->|Query| MySQL
    Orch -->|Events| Socket
    Frontend -->|"WebSocket"| Orch

`
export default chart;