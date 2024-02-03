const router = require('express').Router();
const pool = require('../modules/pool');


//GET 
router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "todos";`;

    pool.query(queryText).then(result => {
        console.log(result.rows);
        res.send(result.rows);
    })
    .catch(err => {
        console.log('error getting books', err);
        res.sendStatus(500);
    });
});

//POST
router.post('/', (req, res) => {
    let newTask = req.body;
    console.log('Adding new to-do', newTask);
    let queryText = `INSERT INTO "todos" ("text") VALUES ($1);`;

    pool.query(queryText, [newTask.text])
    .then(result => {
        res.sendStatus(201);
    })
    .catch(err => {
        console.log('Error adding new task', err);
        res.sendStatus(500);
    });
});

//PUT
router.put('/:id', (req, res) => {
    console.log('PUT/update on server');
    let id = req.params.id;
    let sqlText = `UPDATE "todos" SET "isComplete"=TRUE WHERE id=$1;`;

    pool.query(sqlText, [id]) 
    .then(result => {
        console.log(`put query worked. ${sqlText}`, result);
        res.sendStatus(201);
    })
    .catch(err => {
        console.log(`put query failed. ${sqlText}`, err);
        res.sendStatus(500);
    });
});

//DELETE
router.delete('/:id', (req, res) => {
    console.log('req.params', req.params);
    let id = req.params.id;
    let sqlText = `DELETE FROM "todos" WHERE "id"=$1;`;

    pool.query(sqlText, [id])
    .then(result => {
        console.log(`delete query worked, ${sqlText}`, result);
        res.send(204);
    })
    .catch(err => {
        console.log(`delete query failed. ${sqlText}`, err);
        res.sendStatus(500);
    })
});


module.exports = router;
