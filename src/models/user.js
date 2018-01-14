let mongoose = require('mongoose');

let schema = mongoose.Schema({
			name: {
				type: String,
				required: false,
			},
			email : {
				type: String,
				required: false,
			},
	}, {timestamps: true});

export default mongoose.model('User', schema);;
