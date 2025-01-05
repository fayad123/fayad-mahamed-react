import {FunctionComponent} from "react";
import {Button, Modal} from "react-bootstrap";

interface DeleteModalProps {
	handleClose: Function;
	show: boolean;
	toDelete: Function;
	deleteTitle: string;
}

const DeleteModal: FunctionComponent<DeleteModalProps> = ({
	handleClose,
	show,
	toDelete,
	deleteTitle,
}) => {
	return (
		<Modal
			show={show}
			onHide={() => handleClose()}
			backdrop='static'
			keyboard={false}
		>
			<Modal.Header closeButton>
				<i className='fa-solid fa-triangle-exclamation fs-3 text-danger'></i>
				<Modal.Title> Delete {deleteTitle}</Modal.Title>
			</Modal.Header>
			<Modal.Body> Are you sure to delete this {deleteTitle}?</Modal.Body>
			<Modal.Footer>
				<Button
					variant='secondary'
					onClick={() => {
						toDelete();
						handleClose();
					}}
				>
					DELETE
				</Button>
				<Button variant='secondary' onClick={() => handleClose()}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default DeleteModal;
