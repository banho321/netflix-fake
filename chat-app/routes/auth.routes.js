const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  /**
   * @swagger
   * /api/v1/auth/signup:
   *   post:
   *     summary: Sign up a new user
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *             example:
   *               username: user1
   *               email: user1@example.com
   *               password: pass123
   *     responses:
   *       200:
   *         description: User registered successfully
   *       400:
   *         description: Validation error
   *       500:
   *         description: Internal server error
   */
  app.post(
    "/api/v1/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  /**
   * @swagger
   * /api/v1/auth/signin:
   *   post:
   *     summary: Sign in a user
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *               password:
   *                 type: string
   *             example:
   *               username: user1
   *               password: pass123
   *     responses:
   *       200:
   *         description: User signed in successfully
   *       401:
   *         description: Unauthorized
   *       500:
   *         description: Internal server error
   */
  app.post("/api/v1/auth/signin", controller.signin);

  /**
   * @swagger
   * /api/v1/auth/signout:
   *   post:
   *     summary: Sign out a user
   *     tags: [Auth]
   *     responses:
   *       200:
   *         description: User signed out successfully
   */
  app.post("/api/v1/auth/signout", controller.signout);
};
