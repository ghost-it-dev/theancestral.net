import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
	DB_URI: z.string().nonempty(),
	JWT_SECRET: z.string().nonempty(),
	APP_MODE: z.enum(['development', 'production'])
});

const env = {
	DB_URI: process.env.DB_URI,
	JWT_SECRET: process.env.JWT_SECRET,
	APP_MODE: process.env.APP_MODE
};

const parsedEnv = envSchema.safeParse(env);

if (!parsedEnv.success) {
	throw new Error('No env found');
}

const validateEnv = async () => {
	try {
		parsedEnv.data;
	} catch (err) {
		throw new Error(`${err}`);
	}
};

validateEnv();

export default parsedEnv.data;