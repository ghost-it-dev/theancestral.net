import * as yup from 'yup';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = yup.object().shape({
	DB_URI: yup.string().optional(),
	JWT_SECRET: yup.string().required(),
	APP_MODE: yup.string().required()
});

const env = envSchema.cast({
	DB_URI: process.env.DB_URI,
	JWT_SECRET: process.env.JWT_SECRET,
	APP_MODE: process.env.APP_MODE
});

if (!env) {
	throw new Error('No env found');
}

const validateEnv = async () => {
	try {
		await envSchema.validate(env);
	} catch (err) {
		throw new Error(`${err}`);
	}
};

validateEnv();

export default env;