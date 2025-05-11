function filterObj(obj, ...allowedFields) {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
}

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

module.exports = { filterObj, generateOTP };
