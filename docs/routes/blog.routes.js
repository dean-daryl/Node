// Get All Blogs
/** 
 * @openapi
 * '/api/blogs':
 *  get:
 *     tags:
 *     - Blog
 *     summary: Get all blogs
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


/*
 create a blog
*/
/**
 * @openapi
 * '/api/blogs':
 *  post:    
 *     security:
 *      - jwt: []
 *      - bearerAuth: []
 *     tags:
 *      - Blog
 *     summary: Create a blog
 *     requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *           schema:
 *            type: object
 *            required:
 *              - title
 *              - content
 *              - image
 *            properties:
 *              title:
 *                type: string
 *                default: title
 *              content:
 *                type: string
 *                default: Content of the blog
 *              image:
 *                type: string
 *                format: binary
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
 * '/api/blogs/{id}':
 *  get:
 *     tags:
 *     - Blog
 *     summary: Get single blog by id
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The unique id of the blog
 *        required: true
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


/*

/*
Update a blog
*/
/**
 * @openapi
 * '/api/blogs/{id}':
 *  patch:
 *     security:
 *      - jwt: []
 *      - bearerAuth: []
 *     tags:
 *     - Blog
 *     summary: Update a blog
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The unique id of the blog
 *        required: true
 *     requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *           schema:
 *            type: object
 *            required:
 *              - title
 *              - content
 *              - image
 *            properties:
 *              title:
 *                type: string
 *                default: title
 *              content:
 *                type: string
 *                default: content
 *              image:
 *                type: string
 *                format: binary
 *     responses:
 *      200:
 *        description: Updated
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */




/**
 * @openapi
 * '/api/blogs/{id}':
 *  delete:
 *     security:
 *      - jwt: []
 *      - bearerAuth: []
 *     tags:
 *     - Blog
 *     summary: Remove blog by id
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The unique id of the blog
 *        required: true
 *     responses:
 *      200:
 *        description: Removed
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not Found
 */
/*
comment on a blog
*/
/**
 * @openapi
 * '/api/blogs/{id}/comments':
 *  post:
 *     security:
 *      - jwt: []
 *      - bearerAuth: []
 *     tags:
 *      - Blog
 *     summary: Add comment
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The unique id of the blog
 *        required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - comment
 *            properties:
 *              comment:
 *                type: string
 *                default: comment
 *     responses:
 *      200:
 *        description: Comment successfully added
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */
/* 
*/

/*
get all comments
*/
/**
 * @openapi
 * '/api/blogs/{id}/comments':
 *  get:
 *     tags:
 *     - Blog
 *     summary: Get comments of a single blog
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The unique id of the blog
 *        required: true
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
/*
*/
/*
Like
*/

/**
 * @openapi
 * '/api/blogs/{id}/likes':
 *  post:
 *     security:
 *      - jwt: []
 *      - bearerAuth: []
 *     tags:
 *      - Blog
 *     summary: Add or remove a like on a blog
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The unique id of the blog
 *        required: true
 *     responses:
 *      201:
 *        description: Done
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */
/*





/*
like*/
/**
 * @openapi
 * '/api/blogs/{id}/likes':
 *  get:
 *     tags:
 *     - Blog
 *     summary: Get number of likes on a blog
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The unique id of the blog
 *        required: true
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


