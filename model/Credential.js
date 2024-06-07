import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const credentialSchema = new Schema({
	userId: Schema.Types.ObjectId,
	email: { type: String, required: true },
	hashedPassword: { type: String, required: true },
	lastLogin: Date,
	temporaryEmail: Boolean,
	createdAt: {
		type: Date,
		default: () => Date.now(),
		immutable: true,
	},
	updatedAt: Date,
});

const Credential = model('Credential', credentialSchema);
export default Credential;
