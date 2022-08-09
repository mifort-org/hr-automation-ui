const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const rootFolderName = process.env.BUILD_DIRECTORY || 'dist'
// configuration
const config = {
  s3BucketName: 'mifort.automation',
  folderPath: `./${rootFolderName}` // path relative script's location
};

// initialize S3 client
const s3Config = {
  signatureVersion: 'v4',
  accessKeyId: 'AKIASX47IJYBDHWCGEGQ',
  secretAccessKey: 'Y7+0hKYmW4QhXxxmDRRIkjqbqQcbsmnyz9Qs64zC'
}
const s3 = new AWS.S3(s3Config);

//remove this log in production
// Github show  **** instead of your keys(some privacy things), so //don't panic if you see your password like that
console.log('s3 config ', s3Config)
// resolve full folder path
const distFolderPath = path.join(__dirname, config.folderPath);

uploadDirectoryFiles(distFolderPath)

function uploadDirectoryFiles(distFolderPath) {
  const files = fs.readdirSync(distFolderPath)
  if (!files || files.length === 0) {
    console.log(`provided folder '${distFolderPath}' is empty or does not exist.`);
    return;
  }
  for (const fileName of files) {
    // get the full path of the file
    const filePath = path.join(distFolderPath, fileName);
    // If it was directory recursively call this function again
    if (fs.lstatSync(filePath).isDirectory()) {
      uploadDirectoryFiles(filePath)
      continue;
    }
    uploadFile(filePath, fileName)
  }

}

function uploadFile(filePath, fileName) {
  const relativeFilePath = `${__dirname}/${rootFolderName}/`
  const fileKey = filePath.replace(relativeFilePath, '')
  console.log({fileName, filePath, fileKey})
  const fileContent = fs.readFileSync(filePath)
  // upload file to S3
  s3.putObject({
    Bucket: config.s3BucketName,
    Key: fileKey,
    Body: fileContent
  }, (err, res) => {
    if (err) {
      return console.log("Error uploading file ", err)
    }
    console.log(`Successfully uploaded '${fileKey}'!`, {res});
  });

}
