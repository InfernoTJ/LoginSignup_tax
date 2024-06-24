const express = require('express')
const User = require('../Models/user')
const jqwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { check, validationResult } = require('express-validator');
const validator = require('validator')





const createToken = (_id, timeout) => {
    return jqwt.sign({ _id }, process.env.SECRET, { expiresIn: timeout })
}

function generateOTP() {
    return parseInt(Math.floor(100000 + Math.random() * 900000).toString()) // Generate a 6-digit OTP
}



async function sendOTP(email, otp) {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'tanmay3048@gmail.com',
            pass: 'fmmptucyjmwhvnpq',
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log('Server is ready to take our messages');
        }
    });

    const mailOptions = {
        from: '"Your Name" <tanmay3048@gmail.com>', // Sender address
        to: email, // Recipient address
        subject: 'Your OTP for Verification', // Subject line
        text: `Your OTP for verification is: ${otp}`, // Plain text body
        html: `<p>Your OTP for verification is: <strong>${otp}</strong></p>`, // HTML body
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send OTP');
    }
}
//login
const loginuser = async (req, res) => {

    const { email, usrpassword, timeout, checkbox } = req.body

    try {
        const user = await User.login(email, usrpassword)
        if (!timeout) {
            throw new Error('Select Stay Signed in')
        }
        if (!checkbox) {
            throw new Error('Agree to terms and conditons')
        }
        //create a tken
        const token = createToken(user._id, timeout)

        // //  res.status(200).json({email,token})
        setTimeout(async () => { res.status(200).json({ email, token }); }, 8000)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }


}

//---------------------------------------------------------------------------------------

const mailsign =   async (req, res)  => {

    const { email } = req.body;

    if (!validator.isEmail(email)) {
       res.status(400).json({error: 'Not a Valid Email'})
      }
   


      const otp = generateOTP();
      req.session.signupData = { email, otp} ;
      
      
      try {
    await sendOTP(email, otp);
    res.status(200).json({ message: 'OTP sent to email' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send OTP' });
  }

}

const otpsign = async (req, res) => {

}
const yourinfosign = async (req, res) => {

}
const firminfosign = async (req, res) => {

}
const firmdetailsign = async (req, res) => {

}
const servicesign = async (req, res) => {

}
const roleinsign = async (req, res) => {

}
const firmsettingsign = async (req, res) => {

}
const passwordsign = async (req, res) => {

}




//-----------------------------------------------------------------------------------------
//signupp
const signupuser = async (req, res) => {
    //   ,,firmname ,country,state,firmsize, firmservices ,roleinfirm,weburl,currency,usrpassword
    const { email, firstname, lastname, phoneno, firmname, country, state, firmsize, firmservices, roleinfirm, weburl, currency, usrpassword, userOTP, sessiontime } = req.body
    const timeout = parseInt(sessiontime)
    if (!timeout) {
        throw new Error('Select Stay Signed in')
    }
    try {
        const user = await User.signup(email, firstname, lastname, phoneno, firmname, country, state, firmsize, firmservices, roleinfirm, weburl, currency, usrpassword, userOTP)
        //create a tken
        const token = createToken(user._id, timeout)

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {

    signupuser, loginuser, mailsign, otpsign, yourinfosign, firminfosign, firmdetailsign, servicesign, roleinsign, firmsettingsign, passwordsign
}