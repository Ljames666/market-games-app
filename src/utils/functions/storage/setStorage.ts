export default function setStorages(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
}
