{ 
note by default admin user will be automatically created.
    email : admin@gmail.com
    password : admin
}


app.use("/registration", registrationRouter);
    router.post("/", postUsers);


app.use("/auth", authRouter);
    router.post("/", authUsers);
    

app.use("/employee", employeeRouter);
    router.get("/", getEmployee);
    router.get("/my-task", getTask);
    router.get("/my-manager", getManager);


app.use("/manager", managerRouter);
    router.get("/", getManager);
    router.put("/push-employee", pushEmployee);
    router.get("/my-team", getMyTeam);


app.use("/team-member", teamMemberRouter);
    router.get("/", getTeamMember);


app.use("/task", taskRouter);
    router.post("/", postTask);