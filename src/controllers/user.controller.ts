import { Request, Response } from 'express';
import { ApiResponse } from '../utils/apiResponse';
import ApiError from '../utils/apiError';
import { prisma } from '../lib/prisma';





const healthCheck = (req:Request, res: Response)=>{

 res.status(200).json(
        new ApiResponse(200, {}, "health check completed in production s")
    );

}
export {

    healthCheck
}    