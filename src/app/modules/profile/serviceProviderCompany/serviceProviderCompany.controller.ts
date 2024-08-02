import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import ServiceProviderCompanyervices from "./serviceProviderCompany.service";

// create ServiceProviderCompany
const createServiceProviderCompanyProfile = catchAsync(async (req, res) => {
  const payload = req.body;
  const userId = req.user.id;
  const result =
    await ServiceProviderCompanyervices.createServiceProviderCompanyProfile(
      payload,
      userId
    );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "ServiceProviderCompany profile created successfully",
    data: result,
  });
});

const ServiceProviderCompanyControllers = {
  createServiceProviderCompanyProfile,
};

export default ServiceProviderCompanyControllers;
