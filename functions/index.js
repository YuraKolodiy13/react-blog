const functions = require('firebase-functions');
const os = require("os");
const path = require("path");
const cors = require("cors")({ origin: true });
const Busboy = require("busboy");
const fs = require("fs");
const UUID = require("uuid-v4");
let uuid = UUID();


const {Storage} = require('@google-cloud/storage');
const gcs = new Storage({
  projectId: "fir-89ca2",
  keyFilename: "fir-89ca2-firebase-adminsdk-rtcg6-e45f325535.json"
});





// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//


exports.uploadFile = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method !== "POST") {
      return res.status(500).json({
        message: "Not allowed"
      });
    }
    const busboy = new Busboy({ headers: req.headers });
    let uploadData = null;
    let name = null;

    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      const filepath = path.join(os.tmpdir(), filename);
      name = filename;

      uploadData = { file: filepath, type: mimetype };
      file.pipe(fs.createWriteStream(filepath));
    });

    busboy.on("finish", () => {
      const bucket = gcs.bucket("fir-89ca2.appspot.com");
      bucket
        .upload(uploadData.file, {
          uploadType: "media",
          metadata: {
            metadata: {
              contentType: uploadData.type,
              firebaseStorageDownloadTokens: uuid
            }
          }
        })
        .then(() => {
          res.status(200).json({
            message: "It worked!",
            url: `https://firebasestorage.googleapis.com/v0/b/fir-89ca2.appspot.com/o/${name}?alt=media&token=${uuid}`
          });
          return null;
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    });
    busboy.end(req.rawBody);
  });
});