import mongoose from 'mongoose';
const { Schema, model } = mongoose;

/*
1.	username: The unique identifier for the user.
	2.	hashed_password: The hashed password for secure authentication.
	3.	role: The role or access level assigned to the user.
	4.	last_login: The timestamp of the user's last login.
	5.	created_at: The timestamp of when the user account was created.
	6.	updated_at: The timestamp of when the user account was last updated.
*/

const credentialSchema = new Schema({
	userId: Schema.Types.ObjectId,
	username: { type: String, required: true },
	email: { type: String, required: true },
	hashedPassword: { type: String, required: true },
	role: { type: String, required: true },
	lastLogin: Date,
	createdAt: {
		type: Date,
		default: () => Date.now(),
		immutable: true,
	},
	updatedAt: Date,
});

const Credential = model('Credential', credentialSchema);
export default Credential;
