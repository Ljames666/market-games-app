export default function getStorages(key: string) {
    const storages = localStorage.getItem(key) || '[]';
    return JSON.parse(storages);
}
