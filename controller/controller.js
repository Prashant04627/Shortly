const shortid = require("shortid");
const URL = require("../model/model");

async function handleUrlId(req, res) {
  console.log(req.body,"req");
  const originalUrl = req.body;
  if (!originalUrl.url) return res.status(400).json("Url Required");
  const shorId = shortid.generate();
  console.log(shorId);
  await URL.create({
    shortId: shorId,
    redirectUrl: originalUrl.url,
    visit: [],
  });
  res.render("index.ejs" , { id: shorId });
}

async function handleRedirectUrl(req, res) {
  const result = req.params.shortId;
  console.log(result , "result");

  const entry = await URL.findOneAndUpdate(
    { "shortId":result },
    {
      $push: {
        visit: {
          timestamps: Date.now(),
        },
      },
    }
  );

  res.redirect(entry.redirectUrl);
  console.log(entry, "entry");
}

async function handleAnalytics(req, res) {
  const id = req.params.id;
  
  const document = await URL.findOne({ shortId: id });
   return res.json({Clicks: document.visit.length});
}

module.exports = { handleAnalytics, handleUrlId, handleRedirectUrl };
