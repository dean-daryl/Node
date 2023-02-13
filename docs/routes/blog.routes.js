/**
*◘ 
*

*/

/**
 * @openapi
 * /api/blogs:
 *    get:
 *      tags: [post routes]
 *      description: Returns all posts from our database
 *      responses:
 *        200:
 *          description: Get all posts from our API
 */


/** 

 * @openapi
 * '/api/blogs':
 *  post:
 *     tags:
 *     - Hero
 *     summary: Modify a hero
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - id
 *              - name
 *            properties:
 *              id:
 *                type: number
 *                default: 1
 *              name:
 *                type: string
 *                default: Hulk
 *     responses:
 *      200:
 *        description: Modified
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */



/** 
 * @openapi
 * '/api/blogs/{id}':
 *  patch:
 *     tags:
 *     - Hero
 *     summary: Modify a hero
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - id
 *              - name
 *            properties:
 *              id:
 *                type: number
 *                default: 1
 *              name:
 *                type: string
 *                default: Hulk
 *     responses:
 *      200:
 *        description: Modified
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */