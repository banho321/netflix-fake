const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
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
   * /api/v1/users:
   *   post:
   *     summary: Create a new user
   *     tags: [Users]
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
   *               fulllname:
   *                 type: string
   *               phone:
   *                 type: string
   *               roles:
   *                 type: array
   *                 items:
   *                   type: string
   *             example:
   *               username: user1
   *               email: user1@example.com
   *               password: pass123
   *               roles: [ "user" ]
   *               fullname: sang
   *               phone: 0346204298
   *     responses:
   *       201:
   *         description: User created successfully
   *       400:
   *         description: Validation error
   *       500:
   *         description: Internal server error
   */

  app.post("/api/v1/users", [authJwt.verifyToken, authJwt.isAdmin], controller.createUser);

  /**
   * @swagger
   * /api/v1/users/{id}:
   *   put:
   *     summary: Update a user
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: User ID
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
   *               roles:
   *                 type: array
   *                 items:
   *                   type: string
   *             example:
   *               username: updatedUser
   *               email: updated@example.com
   *               password: updatedPass123
   *               roles: [ "user", "admin" ]
   *     responses:
   *       200:
   *         description: User updated successfully
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal server error
   */
  app.put("/api/v1/users/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.updateUser);

  /**
   * @swagger
   * /api/v1/users/{id}:
   *   delete:
   *     summary: Delete a user
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: User ID
   *     responses:
   *       200:
   *         description: User deleted successfully
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal server error
   */
  app.delete("/api/v1/users/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteUser);
};
