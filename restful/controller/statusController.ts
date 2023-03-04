import { Request, Response } from "express";
import { StatusService } from "../service/statusService";
import { errorHandler } from "../../error";
import "../../session";


export class StatusController {
    constructor(private statusService: StatusService) {
      this.statusService = statusService;
    }

    statusCheck = async(req:Request, res:Response)=>{
        try{
            const result = await this.statusService.statusCheck(req.session.userId as number)
            // console.log(req.session.userId);
            // console.log(result);
            
            res.json({
                result
            })
        }catch (err){
            console.log(err)
            errorHandler(err, req, res);
        }

    }

}

