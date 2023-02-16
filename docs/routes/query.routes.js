/*
 Send a query 
 */
/**
 * @openapi
 * '/api/queries':
 *  post:
 *     tags:
 *     - Queries
 *     summary: Send Query
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - email
 *              - message
 *            properties:
 *              name:
 *                type: string
 *                default: name
 *              email:
 *                type: string
 *                default: email
 *              message:
 *                type: string
 *                default: message
 *     responses:
 *      200:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 */
/*
  Get all Queries 
 */
/**
 * @openapi
 * '/api/queries':
 *  get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *     - Queries
 *     summary: Get all Queries
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: number
 *                  name:
 *                    type: string
 *       400:
 *         description: Bad request
 */
