const Hello = (app)=>{
    app.get("/hello",(req,res)=>{res.send("Life is good!")});
    app.get("/",(req,res)=>{res.send("Welcome to full stack Development!")});
}

export default Hello;