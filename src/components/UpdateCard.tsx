import {useFormik} from "formik";
import {FunctionComponent, useContext, useEffect, useState} from "react";
import * as yup from "yup";
import {getCardById, updateCard} from "../services/cardsService";
import {Cards} from "../interfaces/cards";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "./Loading";
import {errorMessage, successMessage} from "../services/toastify";
import {SiteTheme} from "../theme/theme";

interface UpdateCardProps {}

const valuess = {
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
};

const UpdateCard: FunctionComponent<UpdateCardProps> = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [card, setCard] = useState<Cards>(valuess);
	const {cardId} = useParams<{cardId: string}>();
	const theme = useContext(SiteTheme);
	const navigate = useNavigate();

	useEffect(() => {
		try {
			getCardById(cardId as string)
				.then((res) => {
					setCard(res?.data);
					setIsLoading(false);
				})
				.catch((err) => errorMessage(err));
		} catch (error) {
			errorMessage(`${error}`);
		}
	}, [cardId]);

	const formik = useFormik({
		initialValues: {
			title: card.title || "Add Title",
			subtitle: card.subtitle,
			description: card.description,
			phone: card.phone,
			email: card.email,
			web: card.web,
			image: {
				url: card.image.url,
				alt: card.image.alt,
			},
			address: {
				state: card.address.state,
				country: card.address.country,
				city: card.address.city,
				street: card.address.street,
				houseNumber: card.address.houseNumber,
				zip: card.address.zip,
			},
		},
		enableReinitialize: true,
		validationSchema: yup.object({
			title: yup.string().min(2).max(256).required(),
			subtitle: yup.string().min(2).max(256).required(),
			description: yup.string().min(2).max(1024).required(),
			phone: yup
				.string()
				.min(9, "minimum phone number is 9")
				.max(11, "maximum phone number is 11")
				.required()
				.matches(/^[0-9]{9,11}$/, "Phone number must be between 9 and 11 digits"),
			email: yup.string().min(5).required(),
			web: yup.string().min(14),
			image: yup.object({
				url: yup.string().url().min(14).required(),
				alt: yup.string().min(2).max(256).required(),
			}),
			address: yup.object({
				state: yup.string(),
				country: yup.string().required(),
				city: yup.string().required(),
				street: yup.string().required(),
				houseNumber: yup.number().required(),
				zip: yup.number(),
			}),
		}),
		onSubmit: (values) => {
			try {
				updateCard(cardId as string, values)
					.then((res) => {
						successMessage(`${res.title} has been changed successfully`);
					})
					.catch(() => {
						errorMessage(`This email is exist try another email address`);
					});
			} catch (error) {
				console.log(error);
			}
		},
	});

	if (isLoading) return <Loading />;

	return (
		<main
			style={{backgroundColor: theme.background, color: theme.color}}
			className='min-vh-100 py-5'
		>
			<div className='container'>
				<div className='card-img w-50 m-auto'>
					<img
						className='img-fluid'
						src={card.image.url}
						alt={card.image.alt}
					/>
				</div>
				<form onSubmit={formik.handleSubmit}>
					<div className='row mt-5'>
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
									placeholder='Web'
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
					<div className='row mb-3'>
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
					<div className='d-flex text-center'>
						<div className='w-100'>
							<button
								type='button'
								onClick={() => navigate(-1)}
								className='btn btn-dark w-50'
							>
								Back
							</button>
						</div>
						<div className='w-100'>
							<button
								type='submit'
								disabled={!formik.dirty}
								className='btn btn-success w-50'
							>
								Update
							</button>
						</div>
					</div>
				</form>
			</div>
		</main>
	);
};

export default UpdateCard;
