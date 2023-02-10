import { getQueries,postQuery } from "../controllers/queries.controller";
import Query from "../models/queries.js"
import { signup } from "../controllers/users.controller";



jest.mock('../models/queries.js', () => ({
    find: jest.fn().mockResolvedValue([{ id: 1, name: 'Query 1' }, { id: 2, name: 'Query 2' }]),
    findOne: jest.fn(),
    deleteOne:jest.fn(),
    save:jest.fn()
   
  
    
    
  }));

  
describe('getQueries', () => {
    let req, res, next;
  
    beforeEach(() => {
      req = {};
      res = {
        send: jest.fn()
      };
      next = jest.fn();
    });
  
  
    it('retrieves and returns all Queries', async () => {
      await getQueries(req, res, next);
  
      expect(Query.find).toHaveBeenCalled();
      expect(res.send).toHaveBeenCalledWith([{ id: 1,  name: 'Query 1' }, { id: 2,  name: 'Query 2' }]);
    });
  });
  

  describe('postQuery', () => {
    let req, res;
  
    beforeEach(() => {
      req = {
        body: {
          name: 'My Query',
          message: 'This is my query content'
        },

      };
      res = {
        json: jest.fn(),
        status: jest.fn().mockReturnValue({ json: jest.fn() })
      };
    });
  
    it('should post a new query and return it', async () => {
      const query = {
        name: 'My Query',
        message: 'This is my query content'
        
      };
  
      jest.spyOn(query.prototype, 'save').mockResolvedValue(blog);
      await postQuery(req, res);
    
      expect( query.prototype.save).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(query);
    });
  
  })