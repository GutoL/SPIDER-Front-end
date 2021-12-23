export interface Vnf {
    name: string,
    id: string,
    resources: {cpu: number, memory: number, storage: number}
    mttf: number,
    mttr: number,
    availability: number,
    path_to_files: string
}

export interface VnfFlavour{
    name:string;
    cpu: number;
    memory: number;
    storage: number;
    mttf: number;
    mttr: number;
    availability: number;
}