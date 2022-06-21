import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

const Input = (props) => (
	<input
		{...props}
		className="w-full bg-transparent p-4 border rounded-xl border-onix outline-none focus:border-platinum"
	/>
);

const validationSchema = yup.object({
	email: yup.string().required("Digite seu e-mail").email("E-mail inválido"),
	password: yup.string().required("Digite sua senha"),
	username: yup.string().required("Digite um nome de usuário"),
	name: yup.string().required("Digite seu nome"),
});

export function Signup({ signInUser }) {
	const formik = useFormik({
		onSubmit: async (values) => {
			const res = await axios.post("http://localhost:9901/signup", {
				email: values.email,
				name: values.name,
				username: values.username,
				password: values.password,
			});
			signInUser(res.data);
		},

		validationSchema,
		validateOnMount: true,
		initialValues: {
			email: "",
			password: "",
		},
	});
	return (
		<div className="h-full flex flex-col justify-center items-center p-12 space-y-4">
			<h1 className=" text-3xl font-bold">Crie sua conta</h1>

			<form onSubmit={formik.handleSubmit} className="space-y-3">
				<Input
					type="text"
					name="name"
					placeholder="Nome"
					value={formik.values.name}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					disabled={formik.isSubmitting}
				></Input>
				{formik.touched.name && formik.errors.name && (
					<span className="text-red-500 opacity-70 text-sm">
						{formik.errors.name}
					</span>
				)}
				<Input
					type="text"
					name="username"
					placeholder="Nome de usuário"
					value={formik.values.username}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					disabled={formik.isSubmitting}
				></Input>
				{formik.touched.username && formik.errors.username && (
					<span className="text-red-500 opacity-70 text-sm">
						{formik.errors.username}
					</span>
				)}
				<Input
					type="text"
					name="email"
					placeholder="E-mail"
					value={formik.values.email}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					disabled={formik.isSubmitting}
				></Input>
				{formik.touched.email && formik.errors.email && (
					<span className="text-red-500 opacity-70 text-sm">
						{formik.errors.email}
					</span>
				)}
				<Input
					type="password"
					name="password"
					placeholder="Senha"
					value={formik.values.password}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					disabled={formik.isSubmitting}
				></Input>
				{formik.touched.password && formik.errors.password && (
					<span className="text-red-500 opacity-70 text-sm">
						{formik.errors.password}
					</span>
				)}

				<button
					type="Submit"
					disabled={formik.isSubmitting || !formik.isValid}
					className="bg-birdBlue font-bold py-3 text-lg disabled:opacity-50 rounded-full w-full"
				>
					{formik.isSubmitting ? "Enviando..." : "Cadastrar"}
				</button>
			</form>
			<span className="text-sm text-platinum opacity-50">
				Já tem uma conta?{" "}
				<a className="text-birdBlue" href="/login">
					Acesse.
				</a>
			</span>
		</div>
	);
}
