const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const axios = require('axios');
const FormData = require('form-data');

require('dotenv').config();

const response = require('../configurations/response');
const { JWT, D7_CONFIGURATIONS } = require('../common/constant');
const User = require('../models/User');

const AuthRoutes = {
  authenticate: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response.fail(req, res, response.messages.invalid_params, {
          errors: errors.array(),
        });
      }

      const { email, password } = req.body;

      const isUserAvailable = await User.getUserByEmail(email);

      if (!isUserAvailable) {
        return response.fail(
          req,
          res,
          response.messages.server_error,
          'Invalid credentials'
        );
      }

      const isMatch = await bcrypt.compare(password, isUserAvailable?.password);

      if (!isMatch) {
        return response.fail(
          req,
          res,
          response.messages.server_error,
          'Invalid credentials'
        );
      }
      const payload = {
        user: {
          id: isUserAvailable.id,
          email: isUserAvailable.email,
        },
      };
      const _user = _.omit(isUserAvailable, ['password']);
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: JWT.EXPIRE_TIME },
        (err, token) => {
          if (err) throw err;
          return response.success(
            req,
            res,
            { user: _user, token },
            'Authenticated'
          );
        }
      );
    } catch (err) {
      return response.fail(
        req,
        res,
        response.messages.server_error,
        err.message
      );
    }
  },
  register: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response.fail(req, res, response.messages.invalid_params, {
          errors: errors.array(),
        });
      }

      const { username, fullName, email, password, confirmPassword } = req.body;

      const salt = await bcrypt.genSalt(10);
      let encryptedPassword = await bcrypt.hash(password, salt);

      const _user = {
        username,
        fullName,
        email,
        password: encryptedPassword,
        confirmPassword,
      };

      const isRegistered = await User.createUser(_user);
      if (isRegistered?.insertId) {
        const newUser = await User.getUserById(isRegistered.insertId);
        const payload = {
          user: {
            id: newUser.id,
            email: newUser.email,
          },
        };

        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: JWT.EXPIRE_TIME },
          (err, token) => {
            if (err) throw err;
            return response.success(
              req,
              res,
              { user: newUser, token },
              'User created'
            );
          }
        );
      } else {
        return response.fail(
          req,
          res,
          response.messages.server_error,
          'User registration failed'
        );
      }
    } catch (err) {
      return response.fail(
        req,
        res,
        response.messages.server_error,
        err.message
      );
    }
  },
  sendOTP: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response.fail(req, res, response.messages.invalid_params, {
          errors: errors.array(),
        });
      }
      const { mobileNumber } = req.body;

      const data = new FormData();

      data.append('mobile', mobileNumber); //customer mobile number
      data.append('sender_id', D7_CONFIGURATIONS.SENDER_ID); // your sendID
      data.append(
        'message',
        'Hi, kindly key in the following OTP to continue with your log in. OTP - {code}'
      );
      data.append('expiry', D7_CONFIGURATIONS.EXPIRATION); // token expiration time

      const result = await axios({
        method: 'post',
        url: `${D7_CONFIGURATIONS.BASE_URL}/${D7_CONFIGURATIONS.METHODS.SEND}`,
        headers: {
          Authorization: `Token ${D7_CONFIGURATIONS.RAPID_TOKEN}`, // your Rapid API Token
          ...data.getHeaders(),
        },
        data: data,
      });

      if (!result?.data) {
        return response.fail(
          req,
          res,
          response.messages.server_error,
          'OTP sending failed'
        );
      }

      return response.success(
        req,
        res,
        { otpId: result?.data?.otp_id, expiry: result?.data?.expiry },
        'OTP sent successfully'
      );
    } catch (err) {
      return response.fail(
        req,
        res,
        response.messages.server_error,
        err.message
      );
    }
  },
  verifyOTP: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return response.fail(req, res, response.messages.invalid_params, {
          errors: errors.array(),
        });
      }
      const { otpId, otpCode } = req.body;

      const data = new FormData();
      data.append('otp_id', otpId); //OTP ID you have received from the previous api response
      data.append('otp_code', otpCode); // OTP code you have received to your mobile device

      const result = await axios({
        method: 'POST',
        url: `${D7_CONFIGURATIONS.BASE_URL}/${D7_CONFIGURATIONS.METHODS.VERIFY}`,
        headers: {
          Authorization: `Token ${D7_CONFIGURATIONS.RAPID_TOKEN}`, // your Rapid API Token
          ...data.getHeaders(),
        },
        data: data,
      });

      if (result?.data) {
        return response.success(
          req,
          res,
          { success: true },
          'OTP verified successfully'
        );
      } else {
        return response.fail(
          req,
          res,
          response.messages.server_error,
          'Invalid OTP'
        );
      }
    } catch (err) {
      return response.fail(
        req,
        res,
        response.messages.server_error,
        err.response.data || err.message
      );
    }
  },
};
module.exports = AuthRoutes;
