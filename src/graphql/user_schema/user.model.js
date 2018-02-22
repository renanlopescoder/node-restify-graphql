import mongoose from 'mongoose'

const UserSchema = mongoose.Schema(
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
)

exports.User = mongoose.model('User', UserSchema)
