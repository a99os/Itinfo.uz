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
  getAdmins,
  getAdminById,
  addAdmin,
  loginAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/admin.controller");
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
  getAuthors,
  getAuthorById,
  addAuthor,
  updateAuthor,
  deleteAuthor,
  loginAuthor,
} = require("../controllers/author.controller");
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
const {
  getUsers,
  getUserById,
  addUser,
  loginUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const adminCreatorPolice = require("../middleware/adminCreatorPolice");
const adminPolice = require("../middleware/adminPolice");
const adminSelfPolice = require("../middleware/adminSelfPolice");

const router = Router();
router.prefix("/", (rout) => {
  rout.prefix("/", (admin) => {
    admin.get("/", adminCreatorPolice, getAdmins);
    admin.get("/add/:id", adminSelfPolice, getAdminById);
    admin.post("/", adminCreatorPolice, addAdmin);
    admin.post("/login", loginAdmin);
    admin.put("/edit/:id", adminSelfPolice, updateAdmin);
    admin.delete("/delete/:id", adminSelfPolice, deleteAdmin);
  });
  rout.prefix("/description", (admin) => {
    admin.post("/", adminPolice, addDesc);
    admin.get("/", adminPolice, getDescs);
    admin.get("/:id", adminPolice, getDescById);
    admin.put("/:id", adminPolice, updateDesc);
    admin.delete("/:id", adminPolice, deleteDesc);
  });
  rout.prefix("/author_social", (admin) => {
    admin.post("/", adminPolice, addAS);
    admin.get("/", adminPolice, getASs);
    admin.get("/:id", adminPolice, getASById);
    admin.put("/:id", adminPolice, updateAS);
    admin.delete("/:id", adminPolice, deleteAS);
  });
  rout.prefix("/author", (admin) => {
    admin.post("/", adminPolice, addAuthor);
    admin.get("/", adminPolice, getAuthors);
    admin.get("/:id", adminPolice, getAuthorById);
    admin.put("/:id", adminPolice, updateAuthor);
    admin.delete("/:id", adminPolice, deleteAuthor);
  });
  rout.prefix("/category", (admin) => {
    admin.post("/", adminPolice, addCategory);
    admin.get("/", adminPolice, getCategories);
    admin.get("/:id", adminPolice, getCategoryById);
    admin.put("/:id", adminPolice, updateCategory);
    admin.delete("/:id", adminPolice, deleteCategory);
  });
  rout.prefix("/desc_qa", (admin) => {
    admin.post("/", adminPolice, addDesc_QA);
    admin.get("/", adminPolice, getDesc_QAs);
    admin.get("/:id", adminPolice, getDesc_QAById);
    admin.put("/:id", adminPolice, updateDesc_QA);
    admin.delete("/:id", adminPolice, deleteDesc_QA);
  });
  rout.prefix("/desc_topic", (admin) => {
    admin.post("/", adminPolice, addDesc_Topic);
    admin.get("/", adminPolice, getDesc_Topics);
    admin.get("/:id", adminPolice, getDesc_TopicById);
    admin.put("/:id", adminPolice, updateDesc_Topic);
    admin.delete("/:id", adminPolice, deleteDesc_Topic);
  });
  rout.prefix("/dictionary", (admin) => {
    admin.post("/", adminPolice, addTerm);
    admin.get("/", adminPolice, getTerms);
    admin.get("/:id", adminPolice, getTermById);
    admin.put("/:id", adminPolice, updateTerm);
    admin.delete("/:id", adminPolice, deleteTerm);
  });
  rout.prefix("/media", (admin) => {
    admin.post("/", adminPolice, addMedia);
    admin.get("/", adminPolice, getMedias);
    admin.get("/:id", adminPolice, getMediaById);
    admin.put("/:id", adminPolice, updateMedia);
    admin.delete("/:id", adminPolice, deleteMedia);
  });
  rout.prefix("/question_answer", (admin) => {
    admin.post("/", adminPolice, addQuestion_Answer);
    admin.get("/", adminPolice, getQuestion_Answers);
    admin.get("/:id", adminPolice, getQuestion_AnswerById);
    admin.put("/:id", adminPolice, updateQuestion_Answer);
    admin.delete("/:id", adminPolice, deleteQuestion_Answer);
  });
  rout.prefix("/social", (admin) => {
    admin.post("/", adminPolice, addSocial);
    admin.get("/", adminPolice, getSocials);
    admin.get("/:id", adminPolice, getSocialById);
    admin.put("/:id", adminPolice, updateSocial);
    admin.delete("/:id", adminPolice, deleteSocial);
  });
  rout.prefix("/synonim", (admin) => {
    admin.post("/", adminPolice, addSynonim);
    admin.get("/", adminPolice, getSynonims);
    admin.get("/:id", adminPolice, getSynonimById);
    admin.put("/:id", adminPolice, updateSynonim);
    admin.delete("/:id", adminPolice, deleteSynonim);
  });
  rout.prefix("/tag", (admin) => {
    admin.post("/", adminPolice, addTag);
    admin.get("/", adminPolice, getTags);
    admin.get("/:id", adminPolice, getTagById);
    admin.put("/:id", adminPolice, updateTag);
    admin.delete("/:id", adminPolice, deleteTag);
  });
  rout.prefix("/topic", (admin) => {
    admin.post("/", adminPolice, addTopic);
    admin.get("/", adminPolice, getTopics);
    admin.get("/:id", adminPolice, getTopicById);
    admin.put("/:id", adminPolice, updateTopic);
    admin.delete("/:id", adminPolice, deleteTopic);
  });
  rout.prefix("/user", (admin) => {
    admin.post("/", adminPolice, addUser);
    admin.get("/", adminPolice, getUsers);
    admin.get("/:id", adminPolice, getUserById);
    admin.put("/:id", adminPolice, updateUser);
    admin.delete("/:id", adminPolice, deleteUser);
  });
});

module.exports = router;
