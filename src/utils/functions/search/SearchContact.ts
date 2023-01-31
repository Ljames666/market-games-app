import getStorages from '../storage/getStorage';
import setStorages from '../storage/setStorage';
export default function searchContacts(contact: string) {
    const storage = getStorages('contactList');

    const searched = storage.filter((element: any) => {
        if (element.name === contact) {
            return element;
        }
        if (element.email === contact) {
            return element;
        }
        if (element.phone === contact) {
            return element;
        }
        if (element.address === contact) {
            return element;
        }
        return [];
    });

    setStorages('searchedContacts', searched);
}
