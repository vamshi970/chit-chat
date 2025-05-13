import { Types } from "mongoose";
import { UserRepository } from "../repositories/user.repository";
import { STATUS_BAD_REQUEST, STATUS_NOT_FOUND, STATUS_UNAUTHORIZED } from "../src/constants";
import { ApiError } from "../utils/ApiError";
import otpGenerator from "otp-generator";
import { env, generateTokens, genAccessToken, genHash } from "../helpers";
import crypto from "crypto";

export class AuthService {
  constructor(private readonly authRepo: UserRepository) {}

  async registerUser({
    email,
    password,
    firstName,
    lastName,
  }: {
    email: string;
    password: string;
    lastName: string;
    firstName: string;
  }) {
    if (!email || !password)
      throw new ApiError(STATUS_BAD_REQUEST, "Email and Password are required");

    const queryObj = { email };

    const user = await this.authRepo.getUser(queryObj);

    if (user && user.verified) throw new ApiError(STATUS_BAD_REQUEST, "User already exists");

    const hashedPassword = await genHash(password);
    const userObj = { firstName, lastName, password: hashedPassword };

    if (user) {
      const updatedUser = await this.authRepo.updateUserByEmail(email, userObj);

      return updatedUser;
    }

    const newUser = await this.authRepo.createUser({ ...userObj, email });

    return newUser;
  }

  async sendOtp(id: Types.ObjectId) {
    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const hashed_Otp = await genHash(otp);

    const otp_expiry_time = Date.now() + 10 * 60 * 1000; //* 10 min

    const modifyObj = { otp: hashed_Otp, otp_expiry_time };

    const user = await this.authRepo.updateUserById(id, modifyObj);

    if (!user) throw new ApiError(STATUS_NOT_FOUND, "User doesn't exist");

    return { user, otp };
  }

  async verifyOtp(email: string, otp: string) {
    const queryObj = { email, otp_expiry_time: { $gt: Date.now() } };

    const user = await this.authRepo.getUser(queryObj);

    if (!user) throw new ApiError(STATUS_NOT_FOUND, "Email is invalid or OTP expired");

    if (!(await user.correctOtp(user.otp, otp)))
      throw new ApiError(STATUS_UNAUTHORIZED, "Otp is incorrect. Please try again");

    /*
        Here we can even create an obj with both verified and otp fields and save
        their value to the database by using findByIDAndUpdate else we can easily 
        do the same process like this by changing the retrieved user  
    */

    user.verified = true;
    user.otp = undefined;

    /*
        Here generally we have to set an option to save property of mongoose
        validateBeforSave -> false
        this will make sure not to validate before saving as we are setting a 
        value of a field to undefined which will throw an error but as we already 
        set the value of this property as string | undefined in the TS interface
        there is no need in that
    */

    await user.save();

    const { accessToken, refreshToken } = await generateTokens(user._id);

    return { accessToken, refreshToken };
  }

  async loginUser({ email, password }: { email: string; password: string }) {

    if (!email || !password)
      throw new ApiError(STATUS_BAD_REQUEST, "Email and Password are required");

    const queryObj = { email };

    const user = await this.authRepo.getUser(queryObj);

    if (!user) throw new ApiError(STATUS_NOT_FOUND, "Email or Password is incorrect");

    if (!(await user.correctPassword(user.password, password)))
      throw new ApiError(STATUS_UNAUTHORIZED, "Invalid user credentials");

    const { accessToken, refreshToken } = await generateTokens(user._id);

    return { accessToken, refreshToken };
  }

  async forgotPassword(email: string) {
    const queryObj = { email };

    const user = await this.authRepo.getUser(queryObj);

    if (!user) throw new ApiError(STATUS_NOT_FOUND, "User not found");

    const resetToken = await user.createPasswordResetToken();

    console.log(resetToken);

    const resetURL = `${env.CORS_ORIGIN}/reset-password/${resetToken}`;

    return { resetURL, user };
  }

  async resetPassword(password: string, resetToken: string) {
    if (!password) throw new ApiError(STATUS_BAD_REQUEST, "Password is required");

    if (!resetToken) throw new ApiError(STATUS_BAD_REQUEST, "Token is required");

    const hashedResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    const queryObj = {
      passwordResetToken: hashedResetToken,
      passwordResetExpires: { $gt: Date.now() },
    };

    const user = await this.authRepo.getUser(queryObj);

    if (!user) throw new ApiError(STATUS_NOT_FOUND, "Token is Invalid or Expired");

    const hashedPassword = await genHash(password);

    user.password = hashedPassword;
    user.passwordChangedAt = new Date();
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    const token = genAccessToken(user._id);

    return token;
  }
}
