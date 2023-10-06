export interface SWDetailedResponse<T> {
  message: string;
  result: {
    description: string;
    properties: T;
    uid: string;
    __v: number;
    id: string;
  };
}
export interface SWAllItemsResponse {
  message: string;
  total_records: number;
  total_pages: number;
  previous: string | null;
  next: string | null;
  results: SWSingleResult[];
}
export interface SWSingleResult {
  uid: string;
  name: string;
  url: string;
}
export interface SWPlayerItem<T> {
  uid: string;
  properties: T;
}
