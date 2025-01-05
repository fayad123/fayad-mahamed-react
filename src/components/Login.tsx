import {FormikValues, useFormik} from "formik";
import {FunctionComponent, useContext} from "react";
import * as yup from "yup";
import {loginUser} from "../services/usersService";
import {useAutherContext} from "../context/userContext";
import {useNavigate} from "react-router-dom";
import {SiteTheme} from "../theme/theme";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
	const navTo = useNavigate();
	const {setIsLogedin} = useAutherContext();
	const theme = useContext(SiteTheme);

	const formik: FormikValues = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: yup.object({
			email: yup.string().required().email().min(5),
			password: yup.string().required().min(7).max(20),
		}),
		onSubmit: (values) => {
			loginUser(values)
				.then((res) => {
					localStorage.setItem("token", res.data);
					setIsLogedin(true);
					navTo("/");
				})
				.catch((err) => {
					console.error("Login error:", err);
					formik.setStatus({error: "Invalid login credentials"});
				});
		},
	});

	return (
		<main
			style={{backgroundColor: theme.background, color: theme.color}}
			className='main min-vh-100 d-flex'
		>
			<div
				className='container m-auto bg-dark p-5'
				style={{maxWidth: "20rem", margin: "auto"}}
			>
				<form onSubmit={formik.handleSubmit} className='w-100'>
					<div className='form-floating mb-3 w-100'>
						<input
							style={{
								backgroundColor: theme.background,
								color: theme.color,
							}}
							type='email'
							className='form-control'
							id='email'
							placeholder='Email'
							value={formik.values.email}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.email && formik.errors.email && (
							<p className='text-danger'>{formik.errors.email}</p>
						)}
						<label htmlFor='email'>Email address</label>
					</div>

					<div className='form-floating'>
						<input
							style={{
								backgroundColor: theme.background,
								color: theme.color,
							}}
							type='password'
							className='form-control'
							id='password'
							placeholder='Password'
							value={formik.values.password}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.password && formik.errors.password && (
							<p className='text-danger'>{formik.errors.password}</p>
						)}
						<label htmlFor='password'>Password</label>
					</div>

					{formik.status?.error && (
						<div className='alert alert-danger mt-3'>
							{formik.status.error}
						</div>
					)}

					<div className='text-center mt-4'>
						<button
							style={{
								color: theme.color,
							}}
							className='btn btn-primary w-100 fw-bold fs-6'
							type='submit'
							disabled={!formik.isValid || !formik.dirty}
						>
							Login
						</button>
					</div>
				</form>
			</div>
		</main>
	);
};

export default Login;
