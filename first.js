const express=require("express");
const app=express();
const bodyparser=require("body-parser");
const fs=require("fs");
app.use(express.json());
app.use(bodyparser());

// get all courses (1)
app.get("/courses",(req,res)=>{
    let data=fs.readFileSync(__dirname+"/first.json");
    let data1=JSON.parse(data);
    res.send(data1)
})

// create new courses (2)
app.post("/course",(req,res)=>{
    let name=req.body.name;
    let description=req.body.description;
    let body={};
    body.name=name;
    body.description=description;
    let data=fs.readFileSync(__dirname+"/first.json")
    let data1=JSON.parse(data);
    if (data1.length==0){
        var id=1
    }else{
        var id=data1[data1.length-1].id+1
    }
    body.id=id
    data1.push(body)
    fs.writeFile(__dirname+"/first.json",(JSON.stringify(data1,null,2)))
    res.send(body)
})


// get  courses details by id  (3)
app.get("/course/:id",(req,res)=>{
    let id = req.params.id;
    let data = fs.readFileSync(__dirname+"/first.json")
    let data1 = JSON.parse(data);
    let maindata = data1[id-1]
    // console.log(data1)
    for (var i of data1 ){
        var ourdata;
        if (i.id==id){
            ourdata=i;
            res.send(ourdata)
        }
    }
})

// edit cource by id (4)
app.put("/course/:id", (req,res)=>{
    let data=fs.readFileSync(__dirname+"/first.json");
    let data1=JSON.parse(data);
    let id= req.params.id;
    for (var i of data1){
        if (i.id==id){
            i.name=(req.body.name)
            i.description=(req.body.description)
            fs.writeFileSync(__dirname+"/first.json",JSON.stringify(data1,null,2));
            res.send(i)
        }
    }
})


// get exersise of a courese
app.get("/course/:_id/exercises",(req,res)=>{
    var id = req.params._id;
    var j_data = fs.readFileSync(__dirname+"/first.json");
    var data = JSON.parse(j_data);
    for (var i of data){
        if (i.id==id){
            res.send(i.exercises)
        }
    }

})




// create exercise of a cource (5)
app.post("/course/:id/exercise",(req,res)=>{
    var id=req.params.id;
    var j_data=fs.readFileSync(__dirname+"/first.json");
    var data=JSON.parse(j_data);
    for (var i of data){
        if (i.id==id){
            if (false==i.hasOwnProperty("exercises")){
                i.exercises=[]
            }if (i.exercises.length==0){
                var exercise_id=1
            }else{
                var exercise_id=i.exercises[i.exercises.length-1].id+1
            }var new_dic={};
            new_dic.id=exercise_id;
            new_dic.name=req.body.name;
            new_dic.course_id=id
            new_dic.content=req.body.content;
            new_dic.hint=req.body.hint;
            i.exercises.push(new_dic);
            fs.writeFileSync(__dirname+"/first.json",JSON.stringify(data,null,2));
            res.send(new_dic)
        }
    }
})


// get exercise of a cource by a exercies id (6)
app.get("/course/:c_id/exercise/:e_id",(req,res)=>{
    var c_id=req.params.c_id;
    var e_id=req.params.e_id;
    var j_data=fs.readFileSync(__dirname+"/first.json");
    var data=JSON.parse(j_data);
    for (var i of data){
        if (i.id==c_id){
            for (var j of i.exercises){
                if (j.id==e_id){
                    res.send(j)
                }
            }
        }
    }
}) 


// edit exersise of a course
app.put("/course/:_id/exercise/:id",(req,res)=>{
    var c_id=req.params._id;
    var e_id=req.params.id;
    var j_data=fs.readFileSync(__dirname+"/first.json");
    var data=JSON.parse(j_data);
    for (var i of data){
        if (i.id==c_id){
            for (var j of i.exercises){
                if (j.id==e_id){
                    j.course_id=c_id;
                    j.name=req.body.name;
                    j.content=req.body.content;
                    j.hint=req.body.hint
                    console.log(data)
                    fs.writeFileSync(__dirname+"/first.json",(JSON.stringify(data,null,2)));
                    res.send(j)
                }

            }
        }
    }
})

// create submission of a exersise
app.post("/course/:c_id/exercise/:e_id/submission",(req,res)=>{
    var c_id=req.params.c_id;
    var e_id=req.params.e_id;
    var j_data = fs.readFileSync(__dirname+"/first.json");
    var data=JSON.parse(j_data);
    for (var i of data){
        if (i.id==c_id){
            for (var j of i.exercises){
                if (j.id==e_id){
                   if (false==j.hasOwnProperty("submission")){
                       j.submission=[]
                   }if (j.submission.length==0){
                      var id=1 
                   }else{
                       var id=j.submission[j.submission.length-1].id+1;
                   }var our_data={};
                    our_data.id=id;
                    our_data.course_id=c_id;
                    our_data.exercise_id=e_id;
                    our_data.name=req.body.name;
                    our_data.content=req.body.content;
                    j.submission.push(our_data)
                    fs.writeFileSync(__dirname+"/first.json",JSON.stringify(data,null,2));
                    res.send(our_data)
                }
            }
        }
    }
})

// get submissions of a exersise
app.get("/course/:c_id/exersise/:e_id/submission",(req,res)=>{
    var c_id=req.params.c_id;
    var e_id=req.params.e_id;
    var j_data=fs.readFileSync(__dirname+"/first.json");
    var data=JSON.parse(j_data);
    console.log(data)
    for (var i of data){
        if (i.id==c_id){
            for (var j of i.exersise){
                if (j.id==e_id){
                    res.send(j.submission);
                }
            }
        }
    }
})

// our server
app.listen(4000,()=>{
    console.log("server is working on port 4000")
});