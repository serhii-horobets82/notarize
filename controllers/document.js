const Document = require("../models/Document");
const fs = require("fs");
var path = require("path");

/**
 * GET /document/:type/:id
 * Get document by type and id.
 */
exports.getDocument = (req, res) => {
  Document.findById(req.params.id, (err, document) => {
    if (err) {
      return next(err);
    }
    if (document) {
      res.render(`document/${req.params.type}`, {
        title: `View ${req.params.type} document`,
        document: {
          id: req.params.id,
          content: document.content
        }
      });
    } else {
      req.flash("errors", {
        msg: "Document not found."
      });
      return res.redirect("/");
    }
  });
};

/**
 * POST /document/:type/
 * Create new document
 */
exports.postDocument = (req, res) => {
  const templatePath = path.join(
    __dirname,
    "..",
    "templates",
    `${req.params.type}.html`
  );
  const document = new Document({
    type: req.params.type,
    content: fs.readFileSync(templatePath)
  });
  document.save(err => {
    if (err) {
      return next(err);
    }
    req.flash("success", { msg: "Document has been created successfully!" });
    return res.redirect(`/document/${req.params.type}/${document.id}`);
  });
};
