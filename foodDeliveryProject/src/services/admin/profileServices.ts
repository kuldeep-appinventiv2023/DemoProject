import bcrypt from 'bcrypt';
import Admin from '../../models/adminModel';
import jwt from 'jsonwebtoken';
import { secretKey } from '../../middleware/jwtMiddleware';
import { Constants } from '../../constants';

class AdminServices {
    async loginAdmin(email: string, password: string) {
        const admin: any = await Admin.findOne({ email });

        if (!admin) {
            throw new Error(Constants.errorMsgs.adminNotFound);
        }

        const checkPassword = await bcrypt.compare(password, admin.password);
        if (!checkPassword) {
            throw new Error(Constants.errorMsgs.invalidPassword);
        }

        const token = jwt.sign({ email: admin.email, id: admin._id }, secretKey, {
            expiresIn: '1h',
        });

        return token;
    }

    async getAdminProfile(email: string) {
        try {
            const admin = await Admin.findOne({ email });
            if (!admin) {
                throw new Error(Constants.errorMsgs.adminNotFound);
            }
            return admin;
        } catch (error) {
            console.log(error);
            throw new Error(Constants.errorMsgs.adminNotFound);
        }
    }

    async updateAdminProfile(email: string, adminData: any) {
        try {
            if (adminData.password) {
                const hashedPassword = await bcrypt.hash(adminData.password, 5);
                adminData.password = hashedPassword;
            }

            const updatedAdminProfile = await Admin.findOneAndUpdate(
                { email: email },
                { $set: adminData },
                { new: true }
            );

            if (!updatedAdminProfile) {
                throw new Error(Constants.errorMsgs.adminNotFound);
            }
            else {
                return updatedAdminProfile;
            }
            
        } catch (error) {
            console.log(error);
            throw new Error(Constants.errorMsgs.updateFailed);
        }
    }

    async deleteAdminProfile(email: string) {
        try {
            const deleteAdminProfile = await Admin.findOneAndDelete({ email });

            if (!deleteAdminProfile) {
                throw new Error(Constants.errorMsgs.adminNotFound);
            }
            else {
                return deleteAdminProfile;
            }
        } catch (error) {
            console.log(error);
            throw new Error(Constants.errorMsgs.deleteFailed);
        }
    }

    async resetAdminPassword(email: string, superAdminEmail: string, newPassword: string) {
        try {
            const admin = await Admin.findOne({ email });

            if (!admin) {
                return { success: false, message: Constants.errorMsgs.adminNotFound };
            }

            if (superAdminEmail === admin.superAdminEmail) {
                const hashedPassword = await bcrypt.hash(newPassword, 5);
                admin.password = hashedPassword;
                await admin.save();
                const token = jwt.sign({ email: admin.email }, secretKey);
                return {
                    success: true,
                    message: Constants.successMsgs.passwordUpdated,
                    token,
                };
            } else {
                return { success: false, message: Constants.errorMsgs.securityFailed };
            }
        } catch (error) {
            console.log(error);
            return { success: false, message: Constants.errorMsgs.somethingWentWrong };
        }
    }
}

export default new AdminServices();
