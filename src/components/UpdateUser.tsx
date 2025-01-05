import {FunctionComponent, useContext, useEffect, useState} from "react";
import {SiteTheme} from "../theme/theme";
import {User} from "../interfaces/users";
import {useNavigate, useParams} from "react-router-dom";
import {getUserById, updateUser} from "../services/usersService";
import * as yup from "yup";
import {useFormik} from "formik";
import {errorMessage, successMessage} from "../services/toastify";
interface UpdateUserProps {}

const userUpdateValues = {
	name: {
		first: "",
		middle: "",
		last: "",
	},
	phone: "",
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
	isBusiness: false,
	isAdmin: false,
};

const UpdateUser: FunctionComponent<UpdateUserProps> = () => {
	const theme = useContext(SiteTheme);
	const [user, setUser] = useState<User>(userUpdateValues);
	const navTo = useNavigate();
	const {userId} = useParams<string>();

	useEffect(() => {
		if (!userId) return;
		try {
			getUserById(userId as string)
				.then((res) => {
					setUser(res?.data);
				})
				.catch((err) => {
					console.log(err);
				});
		} catch (error) {
			console.log(error);
		}
	}, [userId]);

	const formik = useFormik({
		initialValues: {
			name: {
				first: user.name.first,
				middle: user.name.middle,
				last: user.name.last,
			},
			phone: user.phone,
			image: {
				url: user.image.url,
				alt: user.image.alt,
			},
			address: {
				state: user.address.state,
				country: user.address.country,
				city: user.address.city,
				street: user.address.street,
				houseNumber: user.address.houseNumber,
				zip: user.address.zip,
			},
		},
		enableReinitialize: true,
		validationSchema: yup.object({
			name: yup.object({
				first: yup.string().required().min(2).max(256),
				middle: yup.string().min(2).max(256).optional(),
				last: yup.string().required().min(2).max(256),
			}),
			phone: yup
				.string()
				.required("Phone number is required  (123) 456-7890 or 123-456-7890")
				.min(9)
				.max(11)
				.matches(
					/^(\(\d{3}\)\s?|\d{3}[-.\s]?)\d{3}[-.\s]?\d{4}$/,
					"Invalid phone number format. Example: (123) 456-7890 or 123-456-7890",
				),
			image: yup.object({
				url: yup
					.string()
					.min(14, "Image URL must be at least 14 characters long")
					.url("Please provide a valid URL")
					.optional(),
				alt: yup
					.string()
					.min(2, "Image alt text must be at least 2 characters long")
					.optional(),
			}),
			address: yup.object({
				state: yup.string().min(2).max(256).optional(),
				country: yup.string().min(2).max(256).required("Country is required"),
				city: yup.string().min(2).max(256).required("City is required"),
				street: yup.string().min(2).max(256).required("Street is required"),
				houseNumber: yup.number().min(1).required("House number is required"),
				zip: yup.number().min(2).required("Zip code is required"),
			}),
		}),
		onSubmit: (values) => {
			try {
				updateUser(userId as string, values)
					.then((res: User) => {
						successMessage(`${res.name.first} has been changed successfully`);
					})
					.catch((err) => {
						errorMessage(err);
					});
			} catch (error) {
				console.log(error);
			}
		},
	});

	return (
		<main
			style={{backgroundColor: theme.background, color: theme.color}}
			className='min-vh-100'
		>
			<div className='container m-auto p-5 text-center'>
				<h1 className='text-center'>Update User Details</h1>
				<img
					className='img-fluid w-50'
					src={user.image.url}
					alt={user.image.alt}
				/>
				{user._id && (
					<form className=' text-start' onSubmit={formik.handleSubmit}>
						{/* Name Inputs */}
						<div className='form-group my-2'>
							<label htmlFor='name.first'>First Name</label>
							<input
								type='text'
								className='form-control'
								id='name.first'
								name='name.first'
								value={formik.values.name.first}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.name?.first && formik.errors.name?.first && (
								<div className='text-danger'>
									{formik.errors.name.first}
								</div>
							)}
						</div>

						<div className='form-group'>
							<label htmlFor='name.middle'>Middle Name</label>
							<input
								type='text'
								className='form-control'
								id='name.middle'
								name='name.middle'
								value={formik.values.name.middle}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.name?.middle &&
								formik.errors.name?.middle && (
									<div className='text-danger'>
										{formik.errors.name?.middle}
									</div>
								)}
						</div>

						<div className='form-group'>
							<label htmlFor='name.last'>Last Name</label>
							<input
								type='text'
								className='form-control'
								id='name.last'
								name='name.last'
								value={formik.values.name.last}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.name?.last && formik.errors.name?.last && (
								<div className='text-danger'>
									{formik.errors.name?.last}
								</div>
							)}
						</div>

						{/* Phone */}
						<div className='form-group'>
							<label htmlFor='phone'>Phone</label>
							<input
								type='text'
								className='form-control'
								id='phone'
								name='phone'
								value={formik.values.phone}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.phone && formik.errors.phone && (
								<div className='text-danger'>{formik.errors.phone}</div>
							)}
						</div>

						{/* Image URL */}
						<div className='form-group'>
							<label htmlFor='imag.url'>Image URL</label>
							<input
								type='text'
								className='form-control'
								id='image.url'
								name='image.url'
								value={formik.values.image.url}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.image?.url && formik.errors.image?.url && (
								<div className='text-danger'>
									{formik.errors.image?.url}
								</div>
							)}
						</div>

						<div className='form-group'>
							<label htmlFor='imageAlt'>Image Alt</label>
							<input
								type='text'
								className='form-control'
								id='imageAlt'
								name='image.alt'
								value={formik.values.image.alt}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.image?.alt && formik.errors.image?.alt && (
								<div className='text-danger'>
									{formik.errors.image?.alt}
								</div>
							)}
						</div>

						{/* Address */}
						<div className='form-group'>
							<label htmlFor='street'>Street</label>
							<input
								type='text'
								className='form-control'
								id='street'
								name='address.street'
								value={formik.values.address.street}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.address?.street &&
								formik.errors.address?.street && (
									<div className='text-danger'>
										{formik.errors.address?.street}
									</div>
								)}
						</div>

						<div className='form-group'>
							<label htmlFor='city'>City</label>
							<input
								type='text'
								className='form-control'
								id='city'
								name='address.city'
								value={formik.values.address.city}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.address?.city &&
								formik.errors.address?.city && (
									<div className='text-danger'>
										{formik.errors.address?.city}
									</div>
								)}
						</div>

						<div className='form-group'>
							<label htmlFor='state'>State</label>
							<input
								type='text'
								className='form-control'
								id='state'
								name='address.state'
								value={formik.values.address.state}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.address?.state &&
								formik.errors.address?.state && (
									<div className='text-danger'>
										{formik.errors.address?.state}
									</div>
								)}
						</div>

						<div className='form-group'>
							<label htmlFor='country'>Country</label>
							<input
								type='text'
								className='form-control'
								id='country'
								name='address.country'
								value={formik.values.address.country}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.address?.country &&
								formik.errors.address?.country && (
									<div className='text-danger'>
										{formik.errors.address?.country}
									</div>
								)}
						</div>

						<div className='form-group'>
							<label htmlFor='houseNumber'>House Number</label>
							<input
								type='number'
								className='form-control'
								id='houseNumber'
								name='address.houseNumber'
								value={formik.values.address.houseNumber}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.address?.houseNumber &&
								formik.errors.address?.houseNumber && (
									<div className='text-danger'>
										{formik.errors.address?.houseNumber}
									</div>
								)}
						</div>

						<div className='form-group'>
							<label htmlFor='zip'>Zip Code</label>
							<input
								type='number'
								className='form-control'
								id='zip'
								name='address.zip'
								value={formik.values.address.zip}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.address?.zip &&
								formik.errors.address?.zip && (
									<div className='text-danger'>
										{formik.errors.address?.zip}
									</div>
								)}
						</div>
						<div className=' d-flex'>
							<div className='w-50 text-center'>
								<button
									type='button'
									style={{
										backgroundColor: theme.background,
										color: theme.color,
									}}
									onClick={() => navTo(-1)}
									className='btn btn-primary mt-3 w-50'
								>
									Back
								</button>
							</div>
							<div className='w-50 text-center'>
								{/* Submit Button */}
								<button
									disabled={!formik.dirty}
									type='submit'
									className='btn btn-success mt-3 w-50'
								>
									Update User
								</button>
							</div>
						</div>
					</form>
				)}
			</div>
		</main>
	);
};

export default UpdateUser;
