const express = require("express");

function events(db) {
  const router = express.Router();
  const owner = "";

  router.get("/invitados", (req, res, next) => {
    db.query("select * from invitado", (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: "error" });
      } else {
        res.status(200).json(results);
      }
    });
  });

  router.get("/invitado", (req, res, next) => {
    var id = req.query.id;
    db.query(
      "select * from invitado where invitado_codigo = ?",
      [id],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: "error" });
        } else {
          let inv_id = results[0]["invitado_id"];
          db.query(
            "select * from invitacion where invitado_id = ?",
            [inv_id],
            (error, childs) => {
              if (error) {
                console.log(error);
                res.status(500).json({ status: "error" });
              } else {
                var invitado = {
                  invitado_id: results[0]["invitado_id"],
                  invitado_nombre: results[0]["invitado_nombre"],
                  numero_invitaciones: results[0]["numero_invitaciones"],
                  invitaciones: childs,
                };
                res.status(200).json(invitado);
              }
            }
          );
        }
      }
    );
  });

  router.post("/invitado", (req, res, next) => {
    console.log(req.body);
    req.body.invitaciones.forEach((element) => {
      updateQuery =
        "update invitacion  set confirmado = ? where invitacion_id = ?";
      db.query(
        updateQuery,
        [element.confirmado, element.invitacion_id],
        (error, results) => {
          if (error) {
            console.log(error);
            res.status(500).json({ status: "error" });
          } else {
          }
        }
      );
    });
    res.status(200).json({ status: "ok" });
  });

  return router;
}

module.exports = events;
