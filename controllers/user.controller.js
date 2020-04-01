const User = require("../models/user.model");

module.exports = {
  async signUp(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });

      // Check if there's existing user
      if (user) {
        return res.status(401).json({
          error: "Existing user with that email"
        });
      }

      const newUser = new User(req.body);

      return res.status(201).json(await newUser.save());
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error
      });
    }
  },

  async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      // Check if user exists
      if (!user) {
        return res.status(404).json({
          error: "No Such User"
        });
      } else {
        // Check if password is valid
        if (!user.isValidPassword(password)) {
          return res.status(401).json({
            error: "Invalid Password"
          });
        } else {
          return res.json(user);
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error
      });
    }
  }
};
