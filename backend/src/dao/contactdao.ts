import { ContactModel } from 'common';
import { DBProvider } from '../dbprovider';

export class ContactDAO {
    private knex = DBProvider.getKnexConnection();

    public async createdContact(contact: ContactModel) {
        const { first_name, last_name, phone, email, comments } = contact;
        const [contactId] = await this.knex('contact').insert({
            first_name, last_name, phone, email, comments
        });
        return contactId;
    }

    public async getContact(contactId: number | string) {
        const contact = await this.knex('contact').first('*').where({ contactId });
        if (!contact) { return null; }
        return ContactModel.fromJSON(contact);
    }

    // public async getContacts() {
    //     const contacts = await this.knex('contact').select('*');

    //     return contacts.map(ContactModel.fromJSON);
    // }
    // public async updateContact(contact: ContactModel) {
    //     const { contactId, first_name, last_name, phone, email, comments } = contact;
    //     await this.knex('contact').update({ first_name, last_name, phone, email, comments }).where({ contactId }); // Ne pas oublié de ne pas mettre le ID
    // }
}

