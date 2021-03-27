exports.createPostValidator = (req, res, next) => {
  // title
  req.check('title', 'Write a title').notEmpty();
  req.check('title', 'Title must be between 5 to 150 characters').isLength({
    min: 5, 
    max: 150
  });

  // body
  req.check('body', 'Write a body').notEmpty();
  req.check('body', 'Body must be between 20 to 2000 characters').isLength({
    min: 20, 
    max: 2000
  });

  // Check for errors
  const errors = req.validationErrors()
  // If error show the first one as the as they happen
  if(errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  // Proceed to next middleware
  next();
};