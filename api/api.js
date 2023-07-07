const express = require('express');
const cors = require('cors');

const logRoutes = require('./middleware/logger');
const objectRouter = require('./routers/recyclableObject');
const addressRouter = require('./routers/address');
const userRouter = require('./routers/user');
const collectDaysRouter = require('./routers/collectDays');
const collectBulkyWasteRouter = require('./routers/collectBulkyWaste');
const weekdayRouter = require('./routers/weekday');
const binRouter = require('./routers/bin');
const materialsTypeRouter = require('./routers/materialsType');
const addressZonesRouter = require('./routers/addressZone');
const appointmentRouter = require('./routers/appointment');

const api = express();

api.use(cors());
api.use(express.json());
api.use(logRoutes);

api.get("/", (req, res) => {
    res.json({
        name: "Recycle bin for the win",
        description: "Why did the recycle bin get promoted? It always sorted things out!"
    })
})

api.use("/address", addressRouter);
api.use("/object", objectRouter);
api.use("/users", userRouter);
api.use("/collectDay", collectDaysRouter);
api.use("/collectBulkyWaste", collectBulkyWasteRouter);
api.use('/weekday', weekdayRouter);
api.use('/bin', binRouter);
api.use('/material', materialsTypeRouter);
api.use('/zone', addressZonesRouter);
api.use('/appointment', appointmentRouter);

module.exports = api;
