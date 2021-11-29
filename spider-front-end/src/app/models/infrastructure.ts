export interface Infrastructure{
    nodes:{_id: string,
            availability: number,
            available_resources: {cpu:number, memory: number, storage: number},
            capabilities:{supported_VNFs:{id: number, type: string}[]},
            energy: number,
            latitude: number,
            longitude: number,
            metadata: [],
            mttf: number,
            mttr: number,
            name: string,
            node_cost: number,
            original_id: string,
            peers: number,
            placed: {},
            ports: string[],
            resources: {cpu:number, memory: number, storage: number},
            status: string,
            type: string
    }[];

    links:{
        _id: string,
        available_resources: {bandwidth: number, cost_link: number, delay: number},
        customer: string,
        id: number,
        interface: string,
        resources: {bandwidth: number, cost_link: number, delay: number},
        type : string,
        src_node: string,
        dst_node: string,
        src_port : string, dst_port : string
    }[]
}