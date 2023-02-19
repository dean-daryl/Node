/**
 * @openapi
 * '/api/signup':
 *  post:
 *     tags:
 *     - Users
 *     summary: Signup a new user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - username
 *              - email
 *              - password
 *            properties:
 *              username:
 *                type: string
 *                default: username
 *              email:
 *                type: string
 *                default: email
 *              password:
 *                type: string
 *                default: password
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
*/




/**
 * @openapi
 * '/api/signin':
 *  post:
 *     tags:
 *     - Users
 *     summary: Login a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: email
 *              password:
 *                type: string
 *                default: password
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 */

/**
 * @openapi
 * '/api/signup':
 *  get:
 *     tags:
 *     - Users
 *     summary: Get all users
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 */
