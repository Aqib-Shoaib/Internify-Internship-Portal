const slugify = require('slugify');

exports.generateSlug = (text) => slugify(text, { lower: true, strict: true });
