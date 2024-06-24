const express=require('express')
const router = express.Router()

const { loginuser,  signupEmail,
    verifyOTP,
    acceptUserDetails,
    acceptFirmInfo,
    acceptFirmSizeServices,
    acceptServicesProvided,
    acceptRoleInFirm,
    acceptWebUrlCurrency,
    setPassword} = require('../Controller/usercontroller')
const validateSession =require('../Middleware/Validatesession')
//login
router.post('/login', loginuser)

//sign up 

// router.post('/signup', signupuser)

// router.post('/signup/email',validateSession ,  mailsign)

// router.post('/signup/verify-otp', otpsign)

// router.post('/signup/details', yourinfosign)

// router.post('/signup/firm-info', firminfosign)

// router.post('/signup/firm-size-services', firmdetailsign)

// router.post('/signup/services-provided', servicesign)

// router.post('/signup/role', roleinsign)

// router.post('/signup/web-url-currency', firmsettingsign)

// router.post('/signup/set-password', passwordsign)


router.post('/signup/email', signupEmail);

router.post('/signup/verify-otp', validateSession, verifyOTP);

router.post('/signup/details', validateSession, acceptUserDetails);

router.post('/signup/firm-info', validateSession, acceptFirmInfo);

router.post('/signup/firm-size-services', validateSession, acceptFirmSizeServices);

router.post('/signup/services-provided', validateSession, acceptServicesProvided);

router.post('/signup/role', validateSession, acceptRoleInFirm);

router.post('/signup/web-url-currency', validateSession, acceptWebUrlCurrency);

router.post('/signup/set-password', validateSession, setPassword);

module.exports = router