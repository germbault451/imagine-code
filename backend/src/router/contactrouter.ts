import { ContactModel } from 'common';
import { Router } from 'express';
import { ContactDAO } from '../dao/contactdao';
import { wrap } from '../util';

const contactRouter = Router();
const contactDAO = new ContactDAO;

contactRouter.use('/:contactId', wrap(async (req, res, next) => {
    const contact = await contactDAO.getContact(parseInt(req.params.contactId));
    if (contact === null) { return res.sendStatus(404); }
    req.contact = contact;

    return next();
}));

// contactRouter.get('/', wrap(async (_req, res) => { // Permet d'aller chercher pour afficher les éléments
//     const contacts = await contactDAO.getContacts();
//     return res.send(contacts);
// }));

// contactRouter.get('/:contactId', wrap(async (req, res) => {
//     return res.send(req.contact);
// }));

contactRouter.post('/', wrap(async (req, res) => {
    const contact = ContactModel.fromJSON(req.body);
    const contactId = await contactDAO.createdContact(contact);
    return res.send(await contactDAO.getContact(contactId));
}));

// contactRouter.put('/:contactId', wrap(async (req, res) => { // Permet de mettre à jour un élément lié à l'identifiant
//     const updated = ContactModel.fromJSON(req.body);
//     updated.contactId = req.contact.contactId;

//     await contactDAO.updateContact(updated);

//     return res.send(await contactDAO.getContact(req.contact.contactId));
// }));

// messageRouter.delete('/:messageId', wrap(async (req, res) => {
//     await messageDAO.deleteMessage(req.message.messageId);
//     return res.sendStatus(204);
// }));

export { contactRouter };
