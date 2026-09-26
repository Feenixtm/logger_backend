const getLogin = (req, res) => {
  res.json({ message: "Login gotten!" });
};

const postLogin = (req, res) => {
  const { username, password } = req.body;
  res.json({ username, password });
};

// ----------------------------------------

const getSignUp = (req, res) => {
  res.json({ message: "Sign-up gotten!" }  );
};

const postSignUp = (req, res) => {
    const { username, password } = req.body;
    res.json({ username, password });
};

// ----------------------------------------

export { getLogin, postLogin, getSignUp, postSignUp };