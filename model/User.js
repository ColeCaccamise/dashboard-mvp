import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
	name: { type: String, required: true },
	credentialId: Schema.Types.ObjectId,
	createdAt: {
		type: Date,
		default: () => Date.now(),
		immutable: true,
	},
	updatedAt: Date,
});

const User = model('User', userSchema);
export default User;
