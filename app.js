const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const DataForm = require("./models/dataForms");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.render("index");
});


app.get("/send-data", async (req, res) => {
    const dataForm = new DataForm({
        city: {
            cityName: 'cheby',
            company: [{
                    companyName: 'fist.inc',
                    workers: [{
                            workerName: 'Tolyan',
                        },
                        {
                            workerName: 'Lena',
                        },
                        {
                            workerName: 'Roma',
                        },
                    ],
                },
                {
                    companyName: 'fist132.inc',
                    workers: [{
                            workerName: 'Tolyan',
                        },
                        {
                            workerName: 'Lena',
                        },
                        {
                            workerName: 'Roma',
                        },
                    ],
                },
                {
                    companyName: 'fist.inc',
                    workers: [{
                            workerName: 'Tolyan',
                        },
                        {
                            workerName: 'Lena',
                        },
                        {
                            workerName: 'Roma',
                        },
                    ],
                },
            ],
        },
        
    });

   dataForm.save()
    .then((result) => {
        res.redirect('/');
    })
    .catch((err)=>{
        console.log(err);
    })
});


app.get("/all-data", async (req, res) => {
    try {
        const data = await DataForm.find()
        res.send(data);
    } catch (err) {
        console.log(err);
    }
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.use((req, res) => {
    res.status(404).render("404");
});

const dbURI = "mongodb+srv://toushiro:asagilove@cluster0.ssuiv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((result) => {
        app.listen(5000)
        console.log("app is working")
    })
    .catch((err) => console.log(err));