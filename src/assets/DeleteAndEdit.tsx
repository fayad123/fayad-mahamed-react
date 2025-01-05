import {FunctionComponent} from "react";
import {useNavigate} from "react-router-dom";

interface DeleteAndEditProps {
	onKlickDelete: Function;
	onSowDeleteModal: Function;
	onKlickEdit: Function;
	idForWhatToDelete: string;
}

const DeleteAndEdit: FunctionComponent<DeleteAndEditProps> = ({
	onKlickDelete,
	onKlickEdit,
}) => {

	return (
		<div className='row justify-content-between'>
			<button onClick={() => onKlickEdit()} className='col-4 btn'>
				<i className='fa-solid fa-pen text-warning'></i>
			</button>
			<button onClick={() => onKlickDelete()} className='col-4 btn'>
				<i className='fa-solid fa-trash-can text-danger'></i>
			</button>
		</div>
	);
};

export default DeleteAndEdit;
