const express = require("express");
const {handleUrlId,handleRedirectUrl , handleAnalytics} = require('../controller/controller');

const router = express.Router();

router.post("/", handleUrlId);

router.get("/:shortId" , handleRedirectUrl)

router.get("/analytics/:id" , handleAnalytics);



module.exports = router;
