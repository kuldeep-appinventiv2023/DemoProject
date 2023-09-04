import { Request, Response } from 'express';
import Customer from '../../models/customerModel';

async function verifyMail(req: Request, res: Response) {
    try {
        const findInfo = await Customer.findOne({ _id: req.query.id, verified: true });
        if (findInfo) {
            res.status(200).json({
                message: 'Your email has been already verified.',
                next: 'Please Login! To the APP',
            });
        } else {
            const updateInfo = await Customer.updateOne({ _id: req.query.id }, { $set: { verified: true } });
            console.log(updateInfo);
            res.status(200).json({
                message: 'Your email has been verified.',
                next: 'Please Login! To the APP',
            });
        }
    } catch (error: any) {
        console.log(error.message);
    }
}
export default verifyMail
