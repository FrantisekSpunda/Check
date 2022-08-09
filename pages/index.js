import styles from '../styles/Home.module.scss';
import { useFormik, useField } from 'formik';
import { useEffect } from 'react';
import * as Yup from 'yup';
import Select from 'react-select';

const SignupSchema = Yup.object().shape({
	firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
	lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
	email: Yup.string().email('Invalid email').required('Required'),
});

export default function Home() {
	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
		},
		validationSchema: SignupSchema,
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
		},
	});

	const options = [
		{ value: 'chocolate', label: 'Chocolate' },
		{ value: 'strawberry', label: 'Strawberry' },
		{ value: 'vanilla', label: 'Vanilla' },
	];

	return (
		<div className={styles.container}>
			<form onSubmit={formik.handleSubmit} className={styles.form}>
				<label htmlFor='email'>First name</label>
				<input id='firstName' name='firstName' type='text' onChange={formik.handleChange} value={formik.values.firstName} />
				{formik.touched.firstName && formik.errors.firstName ? <span>{formik.errors.firstName}</span> : null}
				<label htmlFor='email'>Last name</label>
				<input id='lastName' name='lastName' type='text' onChange={formik.handleChange} value={formik.values.lastName} />
				{formik.touched.lastName && formik.errors.lastName ? <span>{formik.errors.lastName}</span> : null}
				<label htmlFor='email'>Email</label>
				<input id='email' name='email' type='email' onChange={formik.handleChange} value={formik.values.email} />
				{formik.touched.email && formik.errors.email ? <span>{formik.errors.email}</span> : null}
				<Select options={options} isMulti={true} />

				<button type='submit'>Submit</button>
			</form>
		</div>
	);
}
