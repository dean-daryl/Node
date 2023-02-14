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
 *     tags:
 *     - Blog
 *     summary: Create a Blog
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - title
 *              - content
 *            properties:
 *              title:
 *                type: string
 *                default: title
 *              content:
 *                type: string
 *                default: content
 *     responses:
 *      200:
 *        description: Blog Created
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

// Get one Blog
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
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - title
 *              - content
 *            properties:
 *              title:
 *                type: string
 *                default: title
 *              content:
 *                type: string
 *                default: content
 *     responses:
 *      200:
 *        description: Updated
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

/*
 delete a blog
*/
/**
 * @openapi
 * '/api/blogs/{id}':
 *  delete:
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
*/

/*
comment on a blog
*/
/**
 * @openapi
 * '/api/blogs/{id}/comments':
 *  post:
 *     tags:
 *     - Blog
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
 *     tags:
 *     - Blog
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


