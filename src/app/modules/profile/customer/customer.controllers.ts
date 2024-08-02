import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import CustomerServices from "./customer.services";

// create customer profile
const createCustomerProfile = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const payload = req.body;
  const result = await CustomerServices.createCustomer(payload, userId);

  sendResponse(res, {
    data: result,
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Customer profile created successfully",
  });
});

const CustomerControllers = { createCustomerProfile };
export default CustomerControllers;
