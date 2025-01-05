import {useFormik} from "formik";
import {FunctionComponent, useContext} from "react";
import {Button, Modal} from "react-bootstrap";
import * as yup from "yup";
import {AddNewBusinessCard} from "./cardsService";
import {SiteTheme} from "../theme/theme";
import {Cards} from "../interfaces/cards";
import { successMessage } from "./toastify";

interface AddCardModalProps {
	onHide: Function;
	show: boolean;
}

const AddCardModal: FunctionComponent<AddCardModalProps> = ({onHide, show}) => {
	const theme = useContext(SiteTheme);

	const formik = useFormik({
		initialValues: {
			title: "",
			subtitle: "",
			description: "",
			phone: "",
			email: "",
			web: "",
			image: {
				url: "",
				alt: "",
			},
			address: {
				state: "",
				country: "",
				city: "",
				street: "",
				houseNumber: 0,
				zip: 0,
			},
		},
		validationSchema: yup.object({
			title: yup.string().min(2).max(256).required(),
			subtitle: yup.string().min(2).max(256).required(),
			description: yup.string().min(2).max(1024).required(),
			phone: yup
				.string()
				.min(9, "minimum phone number is 9")
				.max(11, "maximum phone number is 11")
				.required()
				.matches(
					/^(\(\d{3}\)\s?|\d{3}[-.\s]?)\d{3}[-.\s]?\d{4}$/,
					"Invalid phone number format. Example: (123) 456-7890 or 123-456-7890",
				),
			email: yup.string().min(5).required(),
			web: yup.string().min(14).url(),
			image: yup.object({
				url: yup
					.string()
					.url()
					.min(14)
					.url()
					.required("web must be at least 14 characters"),
				alt: yup
					.string()
					.min(2)
					.max(256)
					.required("you must add image placeholder"),
			}),
			address: yup.object({
				state: yup.string(),
				country: yup.string().required("Country is required"),
				city: yup.string().required("City where you live is required"),
				street: yup.string().required("street name is required"),
				houseNumber: yup.number().required(),
				zip: yup.number(),
			}),
		}),
		onSubmit: (values) => {
			try {
				AddNewBusinessCard(values as Cards)
					.then(() => {
						onHide();
						successMessage("The Business Card Has Bbeen Created Successfully");
					})
					.catch((err) => {
						console.log(err);
					});
			} catch (error) {
				console.log(error);
			}
		},
	});

	return (
		<Modal
			centered
			show={show}
			onHide={() => onHide()}
			backdrop='static'
			keyboard={false}
		>
			<Modal.Header
				style={{backgroundColor: theme.background, color: theme.color}}
				closeButton
			>
				<Modal.Title>Add new card</Modal.Title>
			</Modal.Header>
			<Modal.Body style={{backgroundColor: theme.background, color: theme.color}}>
				<div className='container'>
					<div className='row'>
						<div className='col-6'>
							<div className='form-floating mb-3'>
								<input
									type='text'
									id='title'
									name='title'
									value={formik.values.title}
									placeholder='Title'
									className={`form-control w-100 ${
										formik.touched.title && formik.errors.title
											? "is-invalid"
											: ""
									}`}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									aria-label='Title'
								/>
								{formik.touched.title && formik.errors.title && (
									<div className='invalid-feedback'>
										{formik.errors.title}
									</div>
								)}
								<label
									htmlFor='title'
									className='form-label fw-bold text-secondary'
								>
									Title
								</label>
							</div>
						</div>
						<div className='col-6'>
							<div className='form-floating mb-3'>
								<input
									type='text'
									id='subtitle'
									name='subtitle'
									value={formik.values.subtitle}
									placeholder='Subtitle'
									className={`form-control w-100 ${
										formik.touched.subtitle && formik.errors.subtitle
											? "is-invalid"
											: ""
									}`}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									aria-label='Subtitle'
								/>
								{formik.touched.subtitle && formik.errors.subtitle && (
									<div className='invalid-feedback'>
										{formik.errors.subtitle}
									</div>
								)}
								<label
									htmlFor='subtitle'
									className='form-label fw-bold text-secondary'
								>
									Subtitle
								</label>
							</div>
						</div>
					</div>
					<div className='row'>
						<div className='col-12'>
							<div className='form-floating mb-3'>
								<textarea
									id='description'
									name='description'
									value={formik.values.description}
									placeholder='Description'
									className={`form-control w-100 ${
										formik.touched.description &&
										formik.errors.description
											? "is-invalid"
											: ""
									}`}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									aria-label='Description'
								/>
								{formik.touched.description &&
									formik.errors.description && (
										<div className='invalid-feedback'>
											{formik.errors.description}
										</div>
									)}
								<label
									htmlFor='description'
									className='form-label fw-bold text-secondary'
								>
									Description
								</label>
							</div>
						</div>
						<div className='col-6'>
							<div className='form-floating mb-3'>
								<input
									type='text'
									id='phone'
									name='phone'
									value={formik.values.phone}
									placeholder='Phone'
									className={`form-control w-100 ${
										formik.touched.phone && formik.errors.phone
											? "is-invalid"
											: ""
									}`}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									aria-label='Phone'
								/>
								{formik.touched.phone && formik.errors.phone && (
									<div className='invalid-feedback'>
										{formik.errors.phone}
									</div>
								)}
								<label
									htmlFor='phone'
									className='form-label fw-bold text-secondary'
								>
									Phone
								</label>
							</div>
						</div>
						<div className='col-6'>
							<div className='form-floating mb-3'>
								<input
									type='text'
									id='email'
									name='email'
									value={formik.values.email}
									placeholder='Email'
									className={`form-control w-100 ${
										formik.touched.email && formik.errors.email
											? "is-invalid"
											: ""
									}`}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									aria-label='email'
								/>
								{formik.touched.email && formik.errors.email && (
									<div className='invalid-feedback'>
										{formik.errors.email}
									</div>
								)}
								<label
									htmlFor='email'
									className='form-label fw-bold text-secondary'
								>
									Email
								</label>
							</div>
						</div>
					</div>
					<div className='row'>
						<div className='col-12'>
							<div className='form-floating mb-3'>
								<input
									type='url'
									id='web'
									name='web'
									value={formik.values.web}
									placeholder='Website'
									className={`form-control w-100 ${
										formik.touched.web && formik.errors.web
											? "is-invalid"
											: ""
									}`}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									aria-label='web'
								/>
								{formik.touched.web && formik.errors.web && (
									<div className='invalid-feedback'>
										{formik.errors.web}
									</div>
								)}
								<label
									htmlFor='web'
									className='form-label fw-bold text-secondary'
								>
									Website Url
								</label>
							</div>
						</div>
						<div className='col-6'>
							<div className='form-floating mb-3'>
								<input
									type='url'
									id='image.url'
									name='image.url'
									value={formik.values.image.url}
									placeholder='image url'
									className={`form-control w-100 ${
										formik.touched.image?.url &&
										formik.errors.image?.url
											? "is-invalid"
											: ""
									}`}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									aria-label='image.url'
								/>
								{formik.touched.image?.url &&
									formik.errors.image?.url && (
										<div className='invalid-feedback'>
											{formik.errors.image.url}
										</div>
									)}
								<label
									htmlFor='image.url'
									className='form-label fw-bold text-secondary'
								>
									Image url
								</label>
							</div>
						</div>
						<div className='col-6'>
							<div className='form-floating mb-3'>
								<input
									type='text'
									id='image.alt'
									name='image.alt'
									value={formik.values.image.alt}
									placeholder='image alt'
									className={`form-control w-100 ${
										formik.touched.image?.alt &&
										formik.errors.image?.alt
											? "is-invalid"
											: ""
									}`}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									aria-label='image.alt'
								/>
								{formik.touched.image?.alt &&
									formik.errors.image?.alt && (
										<div className='invalid-feedback'>
											{formik.errors.image.alt}
										</div>
									)}
								<label
									htmlFor='image.alt'
									className='form-label fw-bold text-secondary'
								>
									image name
								</label>
							</div>
						</div>
					</div>
					<div className='row'>
						<div className='col-6'>
							<div className='form-floating mb-3'>
								<input
									type='text'
									id='address.state'
									name='address.state'
									value={formik.values.address.state}
									placeholder='State'
									className={`form-control w-100 ${
										formik.touched.address?.state &&
										formik.errors.address?.state
											? "is-invalid"
											: ""
									}`}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									aria-label='State'
								/>
								{formik.touched.address?.state &&
									formik.errors.address?.state && (
										<div className='invalid-feedback'>
											{formik.errors.address.state}
										</div>
									)}
								<label
									htmlFor='address.state'
									className='form-label fw-bold text-secondary'
								>
									State
								</label>
							</div>
						</div>
						<div className='col-6'>
							<div className='form-floating mb-3'>
								<input
									type='text'
									id='address.country'
									name='address.country'
									value={formik.values.address.country}
									placeholder='Country'
									className={`form-control w-100 ${
										formik.touched.address?.country &&
										formik.errors.address?.country
											? "is-invalid"
											: ""
									}`}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									aria-label='Country'
								/>
								{formik.touched.address?.country &&
									formik.errors.address?.country && (
										<div className='invalid-feedback'>
											{formik.errors.address.country}
										</div>
									)}
								<label
									htmlFor='address.country'
									className='form-label fw-bold text-secondary'
								>
									Country
								</label>
							</div>
						</div>
					</div>
					<div className='row'>
						<div className='col-4'>
							<div className='form-floating mb-3'>
								<input
									type='text'
									id='address.city'
									name='address.city'
									value={formik.values.address.city}
									placeholder='city'
									className={`form-control w-100 ${
										formik.touched.address?.city &&
										formik.errors.address?.city
											? "is-invalid"
											: ""
									}`}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									aria-label='City'
								/>
								{formik.touched.address?.city &&
									formik.errors.address?.city && (
										<div className='invalid-feedback'>
											{formik.errors.address.city}
										</div>
									)}
								<label
									htmlFor='address.city'
									className='form-label fw-bold text-secondary'
								>
									City
								</label>
							</div>
						</div>
						<div className='col-3'>
							<div className='form-floating mb-3'>
								<input
									type='text'
									id='address.street'
									name='address.street'
									value={formik.values.address.street}
									placeholder='street'
									className={`form-control w-100 ${
										formik.touched.address?.street &&
										formik.errors.address?.street
											? "is-invalid"
											: ""
									}`}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									aria-label='Street'
								/>
								{formik.touched.address?.street &&
									formik.errors.address?.street && (
										<div className='invalid-feedback'>
											{formik.errors.address.street}
										</div>
									)}
								<label
									htmlFor='address.street'
									className='form-label fw-bold text-secondary'
								>
									Street
								</label>
							</div>
						</div>
						<div className='col-3'>
							<div className='form-floating mb-3'>
								<input
									type='text'
									id='address.houseNumber'
									name='address.houseNumber'
									value={formik.values.address.houseNumber}
									placeholder='houseNumber'
									className={`form-control w-100 ${
										formik.touched.address?.houseNumber &&
										formik.errors.address?.houseNumber
											? "is-invalid"
											: ""
									}`}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									aria-label='HouseNumber'
								/>
								{formik.touched.address?.houseNumber &&
									formik.errors.address?.houseNumber && (
										<div className='invalid-feedback'>
											{formik.errors.address.houseNumber}
										</div>
									)}
								<label
									htmlFor='address.houseNumber'
									className='form-label fw-bold text-secondary'
								>
									House No
								</label>
							</div>
						</div>
						<div className='col-2'>
							<div className='form-floating mb-3'>
								<input
									type='text'
									id='address.zip'
									name='address.zip'
									value={formik.values.address.zip}
									placeholder='zip'
									className={`form-control w-100 ${
										formik.touched.address?.zip &&
										formik.errors.address?.zip
											? "is-invalid"
											: ""
									}`}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									aria-label='Zip'
								/>
								{formik.touched.address?.zip &&
									formik.errors.address?.zip && (
										<div className='invalid-feedback'>
											{formik.errors.address.zip}
										</div>
									)}
								<label
									htmlFor='address.zip'
									className='form-label fw-bold text-secondary'
								>
									Zip
								</label>
							</div>
						</div>
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer style={{backgroundColor: theme.background, color: theme.color}}>
				<Button
					type='submit'
					onClick={() => formik.handleSubmit()}
					variant='success'
				>
					Create
				</Button>
				<Button variant='secondary' onClick={() => onHide()}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default AddCardModal;
