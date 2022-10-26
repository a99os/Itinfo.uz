const { Router } = require("express");
const express = require("express");
express.application.prefix = express.Router.prefix = function (
  path,
  configure
) {
  const router = express.Router();
  this.use(path, router);
  configure(router);
  return router;
};
const {
  getAuthors,
  getAuthorById,
  addAuthor,
  updateAuthor,
  deleteAuthor,
  loginAuthor,
} = require("../controllers/author.controller");

const {
  addDesc,
  getDescs,
  getDescById,
  updateDesc,
  deleteDesc,
} = require("../controllers/description.controller");
const {
  getASs,
  getASById,
  addAS,
  updateAS,
  deleteAS,
} = require("../controllers/author_social.controller");

const {
  addCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");
const {
  getDesc_QAs,
  getDesc_QAById,
  addDesc_QA,
  updateDesc_QA,
  deleteDesc_QA,
} = require("../controllers/Desc_QA.controller");
const {
  addDesc_Topic,
  getDesc_Topics,
  getDesc_TopicById,
  updateDesc_Topic,
  deleteDesc_Topic,
} = require("../controllers/desc_topic.controller");
const {
  addTerm,
  getTerms,
  getTermsByLetter,
  getTermById,
  updateTerm,
  deleteTerm,
} = require("../controllers/dictionary.controller");
const {
  addMedia,
  getMedias,
  getMediaById,
  updateMedia,
  deleteMedia,
} = require("../controllers/media.controller");
const {
  addQuestion_Answer,
  getQuestion_Answers,
  getQuestion_AnswerById,
  updateQuestion_Answer,
  deleteQuestion_Answer,
} = require("../controllers/question_answer.controller");
const {
  getSocials,
  getSocialById,
  updateSocial,
  deleteSocial,
  addSocial,
} = require("../controllers/social.controller");
const {
  addSynonim,
  getSynonims,
  getSynonimById,
  updateSynonim,
  deleteSynonim,
} = require("../controllers/synonim.controller");
const {
  addTag,
  getTags,
  getTagById,
  updateTag,
  deleteTag,
} = require("../controllers/tag.controller");
const {
  addTopic,
  getTopics,
  getTopicById,
  updateTopic,
  deleteTopic,
} = require("../controllers/topic.controller");

const authorPolice = require("../middleware/authorPolice");
const authorRolePolice = require("../middleware/authorRolePolice");
const authorSelfPolice = require("../middleware/authorSelfPolice");

const router = Router();
router.prefix("/", (rout) => {
  router.prefix("/", (admin) => {
    admin.get("/", authorPolice, getAuthors);
    admin.get("/:id", authorRolePolice(["ChANGE", "READ"]), getAuthorById);
    admin.post("/", addAuthor);
    admin.post("/login", loginAuthor);
    admin.put("/edit/:id", authorSelfPolice, updateAuthor);
    admin.delete("/delete/:id", authorSelfPolice, deleteAuthor);
  });
  rout.prefix("/description", (admin) => {
    admin.post("/", authorPolice, addDesc);
    admin.get("/", authorPolice, getDescs);
    admin.get("/:id", authorPolice, getDescById);
    admin.put("/:id", authorPolice, updateDesc);
    admin.delete("/:id", authorPolice, deleteDesc);
  });
  rout.prefix("/author_social", (admin) => {
    admin.post("/", authorPolice, addAS);
    admin.get("/", authorPolice, getASs);
    admin.get("/:id", authorPolice, getASById);
    admin.put("/:id", authorPolice, updateAS);
    admin.delete("/:id", authorPolice, deleteAS);
  });
  rout.prefix("/category", (admin) => {
    admin.post("/", authorPolice, addCategory);
    admin.get("/", authorPolice, getCategories);
    admin.get("/:id", authorPolice, getCategoryById);
    admin.put("/:id", authorPolice, updateCategory);
    admin.delete("/:id", authorPolice, deleteCategory);
  });
  rout.prefix("/desc_qa", (admin) => {
    admin.post("/", authorPolice, addDesc_QA);
    admin.get("/", authorPolice, getDesc_QAs);
    admin.get("/:id", authorPolice, getDesc_QAById);
    admin.put("/:id", authorPolice, updateDesc_QA);
    admin.delete("/:id", authorPolice, deleteDesc_QA);
  });
  rout.prefix("/desc_topic", (admin) => {
    admin.post("/", authorPolice, addDesc_Topic);
    admin.get("/", authorPolice, getDesc_Topics);
    admin.get("/:id", authorPolice, getDesc_TopicById);
    admin.put("/:id", authorPolice, updateDesc_Topic);
    admin.delete("/:id", authorPolice, deleteDesc_Topic);
  });
  rout.prefix("/dictionary", (admin) => {
    admin.post("/", authorPolice, addTerm);
    admin.get("/", authorPolice, getTerms);
    admin.get("/:id", authorPolice, getTermById);
    admin.put("/:id", authorPolice, updateTerm);
    admin.delete("/:id", authorPolice, deleteTerm);
  });
  rout.prefix("/media", (admin) => {
    admin.post("/", authorPolice, addMedia);
    admin.get("/", authorPolice, getMedias);
    admin.get("/:id", authorPolice, getMediaById);
    admin.put("/:id", authorPolice, updateMedia);
    admin.delete("/:id", authorPolice, deleteMedia);
  });
  rout.prefix("/question_answer", (admin) => {
    admin.post("/", authorPolice, addQuestion_Answer);
    admin.get("/", authorPolice, getQuestion_Answers);
    admin.get("/:id", authorPolice, getQuestion_AnswerById);
    admin.put("/:id", authorPolice, updateQuestion_Answer);
    admin.delete("/:id", authorPolice, deleteQuestion_Answer);
  });
  rout.prefix("/social", (admin) => {
    admin.post("/", authorPolice, addSocial);
    admin.get("/", authorPolice, getSocials);
    admin.get("/:id", authorPolice, getSocialById);
    admin.put("/:id", authorPolice, updateSocial);
    admin.delete("/:id", authorPolice, deleteSocial);
  });
  rout.prefix("/synonim", (admin) => {
    admin.post("/", authorPolice, addSynonim);
    admin.get("/", authorPolice, getSynonims);
    admin.get("/:id", authorPolice, getSynonimById);
    admin.put("/:id", authorPolice, updateSynonim);
    admin.delete("/:id", authorPolice, deleteSynonim);
  });
  rout.prefix("/tag", (admin) => {
    admin.post("/", authorPolice, addTag);
    admin.get("/", authorPolice, getTags);
    admin.get("/:id", authorPolice, getTagById);
    admin.put("/:id", authorPolice, updateTag);
    admin.delete("/:id", authorPolice, deleteTag);
  });
  rout.prefix("/topic", (admin) => {
    admin.post("/", authorPolice, addTopic);
    admin.get("/", authorPolice, getTopics);
    admin.get("/:id", authorPolice, getTopicById);
    admin.put("/:id", authorPolice, updateTopic);
    admin.delete("/:id", authorPolice, deleteTopic);
  });
});

module.exports = router;
