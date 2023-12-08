const fs = require('fs').promises;
const path = require('path');
const uniqid = require('uniqid');
const contactsPath = path.join(__dirname, 'db', 'contacts.json');

// TODO: задокументувати кожну функцію
async function listContacts() {
    // ...твій код. Повертає масив контактів.
    const contactsList = await fs.readFile(contactsPath);
    return JSON.parse(contactsList);
}
  
async function getContactById(contactId) {
    // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
    const contactsList = await listContacts();
    const contact = contactsList.find(contact => contact.id === contactId);

    return contact || null;
}
  
async function removeContact(contactId) {
    // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
    const contactsList = await listContacts();
    const indexToRemove = contactsList.findIndex(contact => contact.id === contactId);

    if (indexToRemove !== -1) {
        const removedContact = contactsList.splice(indexToRemove, 1)[0];
        await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
        return removedContact;
    } else {
        return null;
    }
}
  
async function addContact(name, email, phone) {
    // ...твій код. Повертає об'єкт доданого контакту.
    const contactsList = await listContacts();
    const newContact = {
        id: uniqid(),
        name,
        email,
        phone,
    };

    contactsList.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};