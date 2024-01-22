import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import {
  ListGroup,
  Row,
  Col,
  Button,
  Modal,
  Form,
  FloatingLabel,
} from 'react-bootstrap';

/**
 * ContactList component for displaying a list of contacts.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.contacts - The array of contacts to display.
 * @param {Function} props.onDeleteContact - The function to handle contact deletion.
 * @param {Function} props.onUpdateContacts - The function to handle updating contacts.
 */
export const ContactList = ({
  contacts,
  onDeleteContact,
  onUpdateContacts,
}) => {
  /**
   * State for the selected contact being edited.
   * @type {Object|null}
   */
  const [selectedContact, setSelectedContact] = useState(null);

  /**
   * State for controlling the visibility of the edit modal.
   * @type {boolean}
   */
  const [showEditModal, setShowEditModal] = useState(false);

  /**
   * Handles opening the edit modal for a specific contact.
   *
   * @param {Object} contact - The contact to be edited.
   */
  const handleEditContact = contact => {
    setSelectedContact(contact);
    setShowEditModal(true);
  };

  /**
   * Handles closing the edit modal.
   */
  const handleEditModalClose = () => {
    setSelectedContact(null);
    setShowEditModal(false);
  };

  /**
   * Handles updating a contact after editing.
   *
   * @param {Object} updatedContact - The updated contact.
   */
  const handleUpdateContact = updatedContact => {
    const updatedContacts = contacts.map(contact =>
      contact.id === updatedContact.id ? updatedContact : contact
    );

    onUpdateContacts(updatedContacts);
  };

  // Sorting contacts by name
  const sortedContacts = contacts.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <ListGroup as="ul">
        {sortedContacts.map(contact => (
          <ContactListItem
            key={contact.id}
            contact={contact}
            onDeleteContact={onDeleteContact}
            onEditContact={handleEditContact}
          />
        ))}
      </ListGroup>

      <ContactEditModal
        show={showEditModal}
        contact={selectedContact}
        onClose={handleEditModalClose}
        onUpdateContact={handleUpdateContact}
      />
    </>
  );
};

/**
 * ContactListItem component for rendering an individual contact in the list.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.contact - The contact to display.
 * @param {Function} props.onDeleteContact - The function to handle contact deletion.
 */
const ContactListItem = ({ contact, onDeleteContact, onEditContact }) => {
  return (
    <ListGroup.Item as="li">
      <Row>
        <Col>
          <div className="fw-bold">{contact.name}</div>
        </Col>
        <Col className="text-start">
          <div className="me-auto">{contact.number}</div>
        </Col>
        <Col className="text-end">
          <Button
            variant="outline-primary"
            size="sm"
            type="button"
            onClick={() => onEditContact(contact)}
            className="me-2"
          >
            Edit
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            type="button"
            onClick={() => onDeleteContact(contact.id)}
          >
            Delete
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

/**
 * ContactEditModal component for editing a contact.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.show - Whether the modal should be visible.
 * @param {Object} props.contact - The contact being edited.
 * @param {Function} props.onClose - The function to handle modal closure.
 * @param {Function} props.onUpdateContact - The function to handle updating the contact.
 */
const ContactEditModal = ({ show, contact, onClose, onUpdateContact }) => {
  /**
   * State for the contact being edited.
   * @type {Object}
   */
  const [editedContact, setEditedContact] = useState(contact || {});

  useEffect(() => {
    // Update the editedContact state when the contact prop changes
    setEditedContact(contact || {});
  }, [contact]);

  /**
   * Handles saving changes to the edited contact.
   */
  const handleSaveChanges = () => {
    // Update the contact with the edited data
    const updatedContact = { ...contact, ...editedContact };

    // Call the onUpdateContact function to update the contact in the parent component
    onUpdateContact(updatedContact);

    // Close the modal after saving changes
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col>
              <FloatingLabel controlId="floatingInput" label="Name">
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={editedContact.name || ''}
                  onChange={e =>
                    setEditedContact({ ...editedContact, name: e.target.value })
                  }
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="floatingInput" label="Number">
                <Form.Control
                  type="text"
                  placeholder="Enter number"
                  value={editedContact.number || ''}
                  onChange={e =>
                    setEditedContact({
                      ...editedContact,
                      number: e.target.value,
                    })
                  }
                />
              </FloatingLabel>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onClose}>
          Close
        </Button>
        <Button variant="success" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// PropTypes for ContactList
ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
  onUpdateContacts: PropTypes.func.isRequired,
};

// PropTypes for ContactListItem
ContactListItem.propTypes = {
  contact: PropTypes.object.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

// PropTypes for ContactEditModal
ContactEditModal.propTypes = {
  show: PropTypes.bool.isRequired,
  contact: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdateContact: PropTypes.func.isRequired,
};

// Exporting ContactListItem for potential reuse
ContactList.Item = ContactListItem;
