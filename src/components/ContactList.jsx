import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

/**
 * ContactList component for displaying a list of contacts.
 * @param {Object} props - The component props.
 * @param {Array} props.contacts - The array of contacts to display.
 * @param {Function} props.onDeleteContact - The function to handle contact deletion.
 */
export const ContactList = ({ contacts, onDeleteContact }) => {
  // Sorting contacts by name
  const sortedContacts = contacts.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <ListGroup as="ul">
      {sortedContacts.map(contact => (
        <ContactListItem
          key={contact.id}
          contact={contact}
          onDeleteContact={onDeleteContact}
        />
      ))}
    </ListGroup>
  );
};

/**
 * ContactListItem component for rendering an individual contact in the list.
 * @param {Object} props - The component props.
 * @param {Object} props.contact - The contact to display.
 * @param {Function} props.onDeleteContact - The function to handle contact deletion.
 */
const ContactListItem = ({ contact, onDeleteContact }) => {
  return (
    <ListGroup.Item
      as="li"
      className="d-flex justify-content-between align-items-start"
    >
      <div className="fw-bold">{contact.name}</div>

      <div className="ms-4 me-auto">{contact.number}</div>

      <Button
        variant="outline-danger"
        size="sm"
        type="button"
        onClick={() => onDeleteContact(contact.id)}
      >
        Delete
      </Button>
    </ListGroup.Item>
  );
};

// PropTypes for ContactList
ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

// PropTypes for ContactListItem
ContactListItem.propTypes = {
  contact: PropTypes.object.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

// Exporting ContactListItem for potential reuse
ContactList.Item = ContactListItem;
