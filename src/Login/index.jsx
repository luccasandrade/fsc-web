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
});

export function Login({ signInUser }) {
	const formik = useFormik({
		onSubmit: async (values) => {
			const res = await axios.get(`${import.meta.env.VITE_API_HOST}/login`, {
				auth: { username: values.email, password: values.password },
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
			<h1 className=" text-3xl font-bold">Acesse sua conta</h1>

			<form onSubmit={formik.handleSubmit} className="space-y-3">
				<Input
					type="text"
					name="email"
					placeholder="E-mail"
					value={formik.values.email.toLowerCase()}
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
					className="bg-newPurple font-bold py-3 text-lg disabled:opacity-50 rounded-full w-full"
				>
					{formik.isSubmitting ? "Enviando..." : "Entrar"}
				</button>
			</form>
			<span className="text-sm text-newPurple opacity-70">
				Não tem uma conta?{" "}
				<a className="text-newPurple font-bold" href="/signup">
					Inscreva-se
				</a>
			</span>
		</div>
	);
}
