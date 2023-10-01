export interface SWResponse<T> {
    message: string;
    result: {
        description: string;
        properties: T;
        uid: string;
        __v: number;
        id: string;
    }
}