import { isValidObjectId } from "mongoose";

function checkId(req, res, next) {
  if (!isValidObjectId) {
    res.status(404);
    throw new Error(`object ID ${req.params.id}Invalid`);
  }
  next();
}
export default checkId;
