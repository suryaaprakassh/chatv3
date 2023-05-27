const Yup = require("yup");

const formSchema = Yup.object({
  username: Yup.string()
    .required("User Name required")
    .min(6, " short username")
    .max(28, "too long username"),
  password: Yup.string()
    .required("Password required")
    .min(6, " short Password")
    .max(28, "too long Password"),
});

const validateForm = (req, res, next) => {
  const formData = req.body;
  formSchema
    .validate(formData)
    .catch((err) => {
      console.log(err.errors);
      res.status(422).send();
    })
    .then((valid) => {
      if (valid) {
        console.log("form is good");
        next();
      } else {
        res.status(422).send();
      }
    });
};

module.exports = validateForm;
