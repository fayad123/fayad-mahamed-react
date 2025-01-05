import {FunctionComponent, useContext} from "react";
import {SiteTheme} from "../theme/theme";
import {useFormik} from "formik";
import * as yup from "yup";
import {User} from "../interfaces/users";
import {regiSterNewUser} from "../services/usersService";
interface RegisterProps {}

const Register: FunctionComponent<RegisterProps> = () => {
	const theme = useContext(SiteTheme);

	const formik = useFormik<User>({
		initialValues: {
			name: {
				first: "",
				middle: "",
				last: "",
			},
			phone: "",
			email: "",
			password: "",
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
		},
		validationSchema: yup.object({
			name: yup.object({
				first: yup.string().required("Name is required").min(2).max(256),
				middle: yup.string().min(2).max(256).optional(),
				last: yup.string().required().min(2).max(256),
			}),
			phone: yup
				.string()
				.required()
				.min(9)
				.max(10)
				.matches(
					/^(\(\d{3}\)\s?|\d{3}[-]?)\d{3}[-]?\d{4}$|^\d{10}$/,
					"Invalid phone number format. Example: (123) 456-7890 or 123-456-7890",
				),
			email: yup
				.string()
				.required("Email is required")
				.email("Invalid email format")
				.min(5, "Email must be at least 5 characters long")
				.matches(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/),
			password: yup
				.string()
				.required("Password is required")
				.min(7, "Password must be at least 7 characters long")
				.max(20, "Password must be at most 20 characters long")
				.matches(
					/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/,
				),
			image: yup.object({
				url: yup
					.string()
					.min(14, "Image URL must be at least 14 characters long")
					.url("Please provide a valid URL")
					.optional()
					.matches(/https?:\/\/[^\s]+/),
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
			isBusiness: yup.boolean(),
		}),
		onSubmit: (values) => {
			regiSterNewUser(values)
				.then((res) => console.log(res?.data))
				.catch((err) => console.log(err));
		},
	});

	return (
		<main
			style={{backgroundColor: theme.background, color: theme.color}}
			className='main min-vh-100'
		>
			<div className='container m-auto p-5'>
				<h1 className='text-center'>Register</h1>
				<form onSubmit={formik.handleSubmit}>
					{/* 1 */}
					<div className='row'>
						<div className='col-6 '>
							<div className='form-floating'>
								<input
									style={{
										backgroundColor: theme.background,
										color: "green",
									}}
									type='text'
									className='form-control '
									id='name.first'
									placeholder='name'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.name.first}
								/>
								{formik.touched.name?.first &&
									formik.errors.name?.first && (
										<p className='text-danger'>
											{formik.errors.name.first}
										</p>
									)}
								<label htmlFor='name.first'>first name</label>
							</div>
						</div>
						<div className='col-6 '>
							<div className='form-floating'>
								<input
									style={{
										backgroundColor: theme.background,
										color: "green",
									}}
									type='text'
									className='form-control '
									id='name.middle'
									placeholder='middle name'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.name.middle}
								/>
								<label htmlFor='name.middle'>middle name</label>
							</div>
						</div>
					</div>
					{/* 2 */}
					<div className='row mt-2'>
						<div className='col-6'>
							<div className='form-floating'>
								<input
									style={{
										backgroundColor: theme.background,
										color: "green",
									}}
									type='text'
									className='form-control '
									id='name.last'
									placeholder='name'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.name.last}
								/>
								{formik.touched.name?.last &&
									formik.errors.name?.last && (
										<p className='text-danger'>
											{formik.errors.name.last}
										</p>
									)}
								<label htmlFor='name.last'>last name</label>
							</div>
						</div>
						<div className='col-6'>
							<div className=' form-floating'>
								<input
									style={{
										backgroundColor: theme.background,
										color: "green",
									}}
									type='text'
									className='form-control '
									id='phone'
									placeholder='phone'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.phone}
								/>
								{formik.touched.phone && formik.errors.phone && (
									<p className='text-danger'>{formik.errors.phone}</p>
								)}
								<label htmlFor='phone'>Phone</label>
							</div>
						</div>
					</div>
					{/* 3 */}
					<div className='row mt-2'>
						<div className='col-6 '>
							<div className='form-floating'>
								<input
									style={{
										backgroundColor: theme.background,
										color: "green",
									}}
									type='email'
									className='form-control '
									id='email'
									placeholder='email'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.email}
								/>
								{formik.touched.email && formik.errors.email && (
									<p className='text-danger'>{formik.errors.email}</p>
								)}
								<label htmlFor='email'>email</label>
							</div>
						</div>
						<div className='col-6 '>
							<div className='form-floating'>
								<input
									style={{
										backgroundColor: theme.background,
										color: "green",
									}}
									type='password'
									className='form-control '
									id='password'
									placeholder='password'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.password}
								/>
								{formik.touched.password && formik.errors.password && (
									<p className='text-danger'>
										{formik.errors.password}
									</p>
								)}
								<label htmlFor='password'>password</label>
							</div>
						</div>
					</div>

					{/* image url */}
					<div className='row mt-2'>
						<div className='col-6 '>
							<div className='form-floating'>
								<input
									style={{
										backgroundColor: theme.background,
										color: "green",
									}}
									type='url'
									className='form-control '
									id='image.url'
									placeholder='image Url'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.image.url}
								/>
								{formik.touched.image?.url &&
									formik.errors.image?.url && (
										<p className='text-danger'>
											{formik.errors.image.url}
										</p>
									)}
								<label htmlFor='image.url'>image Url</label>
							</div>
						</div>
						{/* image alt */}
						<div className='col-6'>
							<div className='form-floating'>
								<input
									style={{
										backgroundColor: theme.background,
										color: "green",
									}}
									type='text'
									className='form-control '
									id='image.alt'
									placeholder='image text'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.image.alt}
								/>
								{formik.touched.image?.alt &&
									formik.errors.image?.alt && (
										<p className='text-danger'>
											{formik.errors.image.alt}
										</p>
									)}
								<label htmlFor='image.alt'>image text</label>
							</div>
						</div>
					</div>

					{/* address */}
					<div className='row mt-2'>
						<div className='col-4 '>
							<div className='form-floating'>
								{/* state */}
								<input
									style={{
										backgroundColor: theme.background,
										color: "green",
									}}
									type='text'
									className='form-control '
									id='address.state'
									placeholder='State'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.address.state}
								/>
								{formik.touched.address?.state &&
									formik.errors.address?.state && (
										<p className='text-danger'>
											{formik.errors.address.state}
										</p>
									)}
								<label htmlFor='address.state'>State</label>
							</div>
						</div>
						{/* country */}
						<div className='col-4'>
							<div className='form-floating'>
								<input
									style={{
										backgroundColor: theme.background,
										color: "green",
									}}
									type='text'
									className='form-control '
									id='address.country'
									placeholder='country'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.address.country}
								/>
								{formik.touched.address?.country &&
									formik.errors.address?.country && (
										<p className='text-danger'>
											{formik.errors.address.country}
										</p>
									)}
								<label htmlFor='address.country'>country</label>
							</div>
						</div>
						{/* city */}
						<div className='col-4 form-floating'>
							<div className='form-floating'>
								<input
									style={{
										backgroundColor: theme.background,
										color: "green",
									}}
									type='text'
									className='form-control '
									id='address.city'
									placeholder='city'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.address.city}
								/>
								{formik.touched.address?.city &&
									formik.errors.address?.city && (
										<p className='text-danger'>
											{formik.errors.address.city}
										</p>
									)}
								<label htmlFor='address.city'>City</label>
							</div>
						</div>
					</div>

					{/* street */}
					<div className='row mt-2'>
						<div className='col-4'>
							<div className='form-floating'>
								<input
									style={{
										backgroundColor: theme.background,
										color: "green",
									}}
									type='text'
									className='form-control '
									id='address.street'
									placeholder='street'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.address.street}
								/>
								{formik.touched.address?.street &&
									formik.errors.address?.street && (
										<p className='text-danger'>
											{formik.errors.address.street}
										</p>
									)}
								<label htmlFor='address.street'>Street</label>
							</div>
						</div>
						{/* houseNo */}
						<div className='col-4'>
							<div className='form-floating'>
								<input
									style={{
										backgroundColor: theme.background,
										color: "green",
									}}
									type='number'
									className='form-control '
									id='address.houseNumber'
									placeholder='house Number'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.address.houseNumber}
								/>
								{formik.touched.address?.houseNumber &&
									formik.errors.address?.houseNumber && (
										<p className='text-danger'>
											{formik.errors.address.houseNumber}
										</p>
									)}
								<label htmlFor='address.houseNumber'>House No</label>
							</div>
						</div>
						{/* zip code */}
						<div className='col-4'>
							<div className='form-floating'>
								<input
									style={{
										backgroundColor: theme.background,
										color: "green",
									}}
									type='number'
									className='form-control '
									id='address.zip'
									placeholder='house Number'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.address.zip}
								/>
								{formik.touched.address?.zip &&
									formik.errors.address?.zip && (
										<p className='text-danger'>
											{formik.errors.address.zip}
										</p>
									)}
								<label htmlFor='address.zip'>Zip Code</label>
							</div>
						</div>
					</div>
					<div className='text-start my-3  w-50'>
						<hr />
						<input
							type='checkbox'
							name='isBusiness'
							className='form-check-input'
							id='isBusiness'
							checked={formik.values.isBusiness ? true : false}
							onChange={formik.handleChange}
						/>
						<label
							className='form-check-label fw-bold mx-2'
							htmlFor='isBusiness'
						>
							Business Account
						</label>
					</div>
					<button
						type='submit'
						disabled={!formik.dirty || !formik.isValid}
						className='btn btn-success mt-4'
					>
						Register
					</button>
				</form>
			</div>
		</main>
	);
};

export default Register;
