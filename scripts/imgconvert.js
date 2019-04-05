'use strict';

const fs = require("fs");
const path = require('path');
const datauri = require('../node_modules/datauri');
const git = require('simple-git/promise');
const gitPath = path.resolve(__dirname, '..');
const bundlecss = require('./bundlecss');

const convertDir = function convertDir(imgpath, scsspath, changedfiles, uris = {},  fileNameToVarName = {}) {

  if(!fs.lstatSync(imgpath).isDirectory()) {
    throw new TypeError('Argument to convertDir() must be a directory.');
  }

  if(changedfiles !== 'all') {
    if(changedfiles.toDelete) {
      changedfiles.toDelete.forEach(imgpath => {
        const scssfilename = process.cwd() + '/' + scsspath + '_' + path.basename(imgpath).replace(/\.(png|jpg|jpeg|gif|svg)/, '.scss');
        if(fs.existsSync(scssfilename)) {
          fs.unlinkSync(scssfilename);
        }
      });
    }
  }

  const contents = fs.readdirSync(imgpath);
  for (var i in contents) {
    if(fs.lstatSync(imgpath + contents[i]).isDirectory()) {
      convertDir(imgpath + contents[i] + '/', scsspath, changedfiles, uris,  fileNameToVarName);
    } else {
      let update = true;
      if(changedfiles !== 'all') {
        update = false;
        if(changedfiles.toUpdate.indexOf(imgpath + contents[i]) !== -1) {
          update = true;
        }
      }
      const uri = datauri.convert(imgpath + contents[i]);
      if(update) {
        if(uri) {
          uris[imgpath + contents[i]] = uri;
        }
      }
       fileNameToVarName[imgpath + contents[i]] = '_IMG_' + path.basename(contents[i]).replace(/\.(png|jpg|jpeg|gif|svg)/, '');
    }
  }
  return { uris,  fileNameToVarName };

};

async function getIsGitRepo (workingDir) {

   let isRepo = false;
   try {
      isRepo = await git(workingDir).checkIsRepo();
   }
   catch (e) {
    console.log('Error checking if directory is a GIT repo.');
   }

   return isRepo;
}

async function getGitStatus (workingDir) {
   const git = require('simple-git/promise');

   let statusSummary = null;
   try {
      statusSummary = await git(workingDir).status();
   }
   catch (e) {
    console.log('Error getting status of GIT repo.');
   }

   return statusSummary;
}

module.exports.imageConvert = async function (imgpath, scsspath, updateall = false) {

  if(imgpath.charAt(imgpath.length - 1)!== '/') {
    imgpath += '/';
  }

  if(scsspath.charAt(scsspath.length - 1)!== '/') {
    scsspath += '/';
  }

  if(!fs.existsSync(imgpath)) {
    throw new ReferenceError('First argument to imageConvert must be a valid file or directory.');
  }

  if(!scsspath) {
    scsspath = path.dirname(imgpath);
  }

  const isRepo = await getIsGitRepo(gitPath);
  let status = await getGitStatus(gitPath);
  let changedfiles = 'all';
  if(isRepo) {
    const toDelete = [];
    status.deleted.forEach(i => {
      if(i.indexOf('src/images') !== -1) {
        toDelete.push(i);
      }
    });
    status.renamed.forEach(i => {
      if(i.indexOf('src/images') !== -1) {
        toDelete.push(i);
      }
    });
    const toUpdate = [];
    status.not_added.forEach(i => {
      if(i.indexOf('src/images') !== -1) {
        toUpdate.push(i);
      }
    });
    status.modified.forEach(i => {
      if(i.indexOf('src/images') !== -1) {
        toUpdate.push(i);
      }
    });
    changedfiles = {
      toDelete,
      toUpdate,
    }
  }
  if(updateall) {
    changedfiles = 'all';
  }

  // Get data URIs for changed/new/renamed files, or all files
  const {uris, fileNameToVarName} = convertDir(imgpath, scsspath, changedfiles);
  Object.keys(uris).forEach(filepath => {
    const scssfilename = process.cwd() + '/' + scsspath + '_IMG_' + path.basename(filepath).replace(/\.(png|jpg|jpeg|gif|svg)/, '.scss');
    const scssvarname = path.basename(filepath).replace(/\.(png|jpg|jpeg|gif|svg)/, '');
    fs.writeFile(
      scssfilename,
      `\$${scssvarname}: '${uris[filepath]}';`,
      function(err) {
        if(err) {
          return console.log(err);
        }
    });
  });

  bundlecss.scssImportStatement(fileNameToVarName);
  bundlecss.scssReplaceFilenamesWithVars(fileNameToVarName);

};
