const mongoose = require('mongoose');

const schema = mongoose.Schema({
			name: {
				type: String,
				required: false,
			},
			description : {
				type: String,
				required: false,
			},
	}, {timestamps: true});

export default mongoose.model('Post', schema);
