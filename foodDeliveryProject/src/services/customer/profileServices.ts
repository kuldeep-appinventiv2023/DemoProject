import bcrypt from "bcrypt";
import Customer from "../../models/customerModel";
import Session from "../../models/sessionModel";
import jwt from "jsonwebtoken";
import { secretKey } from '../../middleware/jwtMiddleware';
import { createClient } from "redis";
import mongoose from "mongoose";
import { connectToRedis, getFromRedis, setToRedis } from "../../utils/redisClient";
import { Constants } from "../../constants";

class CustomerService {
    async signup(username: string, password: any, firstName: string, lastName: string, email: string, favoriteFood: string) {
        const existingCustomer = await Customer.findOne({ email });

        if (existingCustomer) {
            throw new Error(Constants.errorMsgs.customerExists);
        }

        const hashedPassword = await bcrypt.hash(password, 2);

        const newCustomer = new Customer({
            username,
            password: hashedPassword,
            firstName,
            lastName,
            email,
            favoriteFood,
        });

        await newCustomer.save();
        return newCustomer;
    }

    async login(email: string, password: string) {
        const customer: any = await Customer.findOne({ email });

        if (!customer) {
            throw new Error(Constants.errorMsgs.customerNotFound);
        }

        const checkPassword = await bcrypt.compare(password, customer.password);
        if (!checkPassword) {
            throw new Error(Constants.errorMsgs.invalidPassword);
        }

        const activeSession = await Session.findOne({
            customerId: customer._id,
            isActive: true,
        });

        if (!activeSession) {
            const token = jwt.sign(
                { email: customer.email, id: customer._id },
                secretKey,
                { expiresIn: "1h" }
            );
            const session = new Session({
                customerId: customer._id,
                isActive: true,
            });

            await connectToRedis();

            let payload: any = {
                customerId: customer.id,
                deviceID: "12345",
                IP_Address: "127.0.0.1:8765",
                isActive: true,
            };
            const redisKey = `customer:${payload.customerId}`;
            await setToRedis(redisKey, JSON.stringify(payload));
            await session.save();
            return ({customer, token});
        } 
        else {
            return { message: Constants.errorMsgs.alreadyLoggedIn };
        }
    }

    async getProfile(email: string) {
        try {
            const customer = await Customer.findOne({ email });
            if (!customer) {
                throw new Error(Constants.errorMsgs.customerNotFound);
            }
            else{
                return customer;
            }
        } catch (error) {
            throw new Error(Constants.errorMsgs.customerNotFound);
        }
    }

    async updateProfile(email: string, customerData: any) {
        try {
            if (customerData.password) {
                const hashedPassword = await bcrypt.hash(customerData.password, 5);
                customerData.password = hashedPassword;
            }

            const updatedCustomerProfile = await Customer.findOneAndUpdate(
                { email: email },
                { $set: customerData },
                { new: true }
            );
            return updatedCustomerProfile;
        } catch (error) {
            throw new Error(Constants.errorMsgs.updateProfileFailed);
        }
    }

    async deleteProfile(email: string) {
        try {
            const deleteCustomerProfile = await Customer.findOneAndDelete({ email });
            return deleteCustomerProfile;
        } catch (error) {
            throw new Error(Constants.errorMsgs.deleteProfileFailed);
        }
    }

    async forgetPassword(email: string, favoriteFood: string, newPassword: string) {
        try {
            const customer = await Customer.findOne({ email });
            if (!customer) {
                return { success: false, message: Constants.errorMsgs.customerNotFound };
            }
            if (favoriteFood === customer.favoriteFood) {
                const hashedPassword = await bcrypt.hash(newPassword, 5);
                customer.password = hashedPassword;
                await customer.save();
                const token = jwt.sign({ email: customer.email }, secretKey);
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

    async logout(email: string) {
        try {
            const customer = await Customer.findOne({ email });
            const cid = customer?.id;
            const client = createClient();
            client.on("error", (error) => console.log("error"));

            await connectToRedis();

            const redisKey = `customer:${cid}`;
            const cachedData = await getFromRedis(redisKey);
            if (cachedData) {
                const customerData = JSON.parse(cachedData);
                customerData.isActive = false;
                await setToRedis(redisKey, JSON.stringify(customerData));
                return { success: true };
            } else {
                await Session.findOneAndUpdate(
                    {
                        customerId: mongoose.Types.ObjectId.createFromHexString(cid),
                        isActive: true,
                    },
                    { $set: { isActive: false } }
                );
                return { success: true };
            }
        } catch (error) {
            console.log(error);
            return { success: false };
        }
    }
}

export default new CustomerService();
