const router = require("express").Router();
const e = require("express");
const { findOne } = require("../models/user");
const user = require('../models/user');
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const fs = require('fs');
const blogdetail = require("../models/blogdetails");
const multer = require('multer');

// image upload
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now() + "_" + file.originalname);
    },
});

var upload = multer({
    storage: storage,
}).single('thumnail');
// insert user into the databse route



// home route
router.get('/', async (req, resp) => {
    try {
        const data = await blogdetail.find();
        // console.log(data);
        resp.render("index", { title: "Home Page", data: data });
    } catch (error) {
        console.log(error);
    }

})
// blog details page
router.get("/blog-details/:id", async (req, resp) => {
    try {
        const id = req.params.id;
        const artical = await blogdetail.findById(id)
        // console.log(artical);
        resp.render("blog-details", { title: "Blog Details", artical: artical })
    } catch (error) {
        console.log(error);
    }


})

// ragister route
router.get('/ragister', (req, resp) => {
    resp.render("ragister");
})

router.post('/ragister', async (req, resp) => {
    try {
        const ragister = new user({
            email: req.body.email,
            name: req.body.name,
            mobile: req.body.mobile,
            password: req.body.password,
            cpassword: req.body.cpassword
        });
        const token = await ragister.generateAuteToken();
        resp.cookie('jwt', token, {
            expires: new Date(Date.now() + 30000),
            httpOnly: true
        })
        const savedata = await ragister.save();
        // console.log( "svae data"+savedata);
        resp.redirect("/admin");
    } catch (error) {
        console.log(error);
    }
})
// admin route
router.get('/admin', (req, resp) => {
    resp.render("admin");
})

router.post('/admin', async (req, resp) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const useremail = await user.findOne({ email: email });
        const token = await useremail.generateAuteToken();

        resp.cookie('jwt', token, {
            // expires: new Date(Date.now() + 30000),
            httpOnly: true
        })

        if (useremail.password === password) {
            resp.redirect('/dashboard');
        } else {
            resp.send("Invalid user")
        }
    } catch (error) {
        console.log(error);
    }
});

// logout route
router.get('/logout', auth, async (req, resp) => {
    try {
        // console.log(req.myuser)
        req.myuser.tokens = req.myuser.tokens.filter((currentele) => {
            return currentele.token != req.token
        })

        resp.clearCookie("jwt")
        await req.myuser.save();

        resp.redirect('/')
    } catch (error) {
        console.log(error);
    }
})


// dashboard route
router.get('/dashboard', auth, (req, resp) => {
    resp.render("dashboard/index");
})
// dashboard add post
router.get('/dashboard/add-post', (req, resp) => {
    resp.render("dashboard/add-post")
})

router.post('/dashboard/add-post', auth, upload, async (req, resp) => {
    try {
        console.log(req.file);
        const blog = new blogdetail({
            title: req.body.title,
            thumnail: req.file.filename,
            description: req.body.description
        });
        const savedata = await blog.save();
        // console.log(savedata);
        resp.redirect("/dashboard/add-post")
    } catch (error) {
        console.log(error);
    }
})

// dashboard all post
router.get('/dashboard/all-post', auth, async (req, resp) => {
    try {
        const data = await blogdetail.find();
        // console.log(data);
        resp.render("dashboard/all-post", { title: "All Post", data: data });
    } catch (error) {
        console.log(error);
    }
})

// dashboard edit post
router.get('/edit-post/:id', auth, async (req, resp) => {
    try {
        const id = req.params.id;
        const data = await blogdetail.findById(id);
        // console.log(id);
        resp.render("dashboard/edit-post", { title: "adit Post", data: data });
    } catch (error) {
        console.log(error);
    }
})
// update router
router.post('/edit-post/:id', auth, upload, async (req, resp) => {
    try {
        let id = req.params.id;
        let new_image = '';
        if (req.file) {
            new_image = req.file.filename;
            try {
                fs.unlinkSync('./public/uploads/' + req.body.old_image);
            } catch (err) {
                console.log(err);
            }
        } else {
            new_image = req.body.old_image;
        }

        const data = await blogdetail.findByIdAndUpdate(id, {
            title: req.body.title,
            description: req.body.description,
            thumnail: new_image
        })
        // console.log(data);
        resp.redirect("/dashboard")
    } catch (error) {
        console.log(error);
    }

})
// delete routes
router.get('/delete/:id', (req, resp) => {
    let id = req.params.id;
    blogdetail.findByIdAndRemove(id, (err, result) => {
        if (result.thumnail != '') {
            try {
                fs.unlinkSync('./public/uploads/' + result.thumnail);
            } catch (err) {
                console.log(err);
            }
        }
        if (err) {
            result.json({ message: err.message });
        } else {
            req.session.message = {
                type: 'info',
                message: 'user delete successfully!'
            }
            resp.redirect("/dashboard");
        }
    })
})


module.exports = router;