import axios from "axios";

export async function request<T>(uri: string, defaultValue: T): Promise<T> {
    let data = defaultValue;
    await axios.get(uri)
        .then(res => {
            data = res.data as T;
        }).catch(error => {
            console.error(`Request to ${uri} failed with\n${error}`);
        });
    return data;
}