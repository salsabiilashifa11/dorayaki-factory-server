const RequestService = require('../services/RequestService');
const ItemService = require('../services/ItemService');
const IngredientService = require('../services/IngredientService');
const AdminService = require('../services/AdminService');
const Response = require('../utils/Response');
const Mailer = require('../utils/Mailer');
const { convertTZ } = require('../utils/DatetimeHelper');

module.exports = {
  async getAllRequests(req, res) {
    try {
      const query = await RequestService.findAllRequests();
      let requests = [];

      // eslint-disable-next-line no-restricted-syntax
      for (const el of query) {
        requests.push({
          id: el.id,
          name: el.Item.name,
          quantity: el.quantity,
          status: el.status,
          createdBy: el.createdBy,
          createdAt: convertTZ(el.createdAt, 'Asia/Jakarta'),
          updatedAt: convertTZ(el.updatedAt, 'Asia/Jakarta'),
        });
      }

      res.status(200).send(new Response(true, requests, '').createResponse());
    } catch (error) {
      res.status(500).send(new Response(false, error, 'Something went wrong').createResponse());
    }
  },

  async updateRequestStatus(req, res) {
    try {
      const { id, status } = req.body;
      const request = await RequestService.findRequestById(id);
      if (!request) {
        res.status(400).send(new Response(false, {}, 'Request Id not found').createResponse());
        return;
      }
      if (request.status === 'Accepted' || request.status === 'Declined') {
        res.status(400).send(new Response(false, {}, 'Request has been confirmed').createResponse());
        return;
      }
      const item = await ItemService.findItemById(request.itemId);

      if (status === 'Accepted') {
        // eslint-disable-next-line no-restricted-syntax
        for await (const el of item.ingredients) {
          const ing = await IngredientService.findIngredientById(el.id);
          if (ing.stock < (el.ItemIngredient.quantity * request.quantity)) {
            res.status(400).send(new Response(false, {}, `Not enough ${el.name} stock. Needed: ${el.ItemIngredient.quantity * request.quantity}`).createResponse());
            return;
          }
        }
      }

      // eslint-disable-next-line no-restricted-syntax
      for await (const el of item.ingredients) {
        const ing = await IngredientService.findIngredientById(el.id);
        const newQty = ing.stock - (el.ItemIngredient.quantity * request.quantity);
        await IngredientService.editIngredient(el.id, { stock: newQty });
      }
      await RequestService.editRequest(id, { status });

      res.status(200).send(new Response(true, {}, 'Done!').createResponse());
    } catch (error) {
      res.status(500).send(new Response(false, error, 'Something went wrong').createResponse());
    }
  },

  async addNewRequest(req, res) {
    try {
      const { recipeId, quantity } = req.body;

      const query = await RequestService.createRequest({
        itemId: recipeId,
        quantity,
        createdBy: '',
      });

      const admins = await AdminService.findAllAdmins();
      const emails = admins.map((admin) => admin.email);

      await Mailer.sendMail('New Request Received', emails.toString());
      res.status(200).send(new Response(true, query, '').createResponse());
    } catch (error) {
      res.status(500).send(new Response(false, error, 'Something went wrong').createResponse());
    }
  },
};
