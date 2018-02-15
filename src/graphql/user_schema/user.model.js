import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: false,
		},
		password : {
			type: String,
			required: true,
		},
		email : {
			type: String,
			required: true,
		},
		photo : {
			type: String,
			required: false,
		},
		nickname: {
			type: String,
			required: false,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('User', UserSchema);
