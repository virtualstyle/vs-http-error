# vs-http-error
## virtualStyle Browser Error Display

This package builds a single file HTML page with all assets included as data uris. The idea is to have a nice 404 page (amongst other error statuses), without any dependencies that might themselves 404. It's all just the single file. Just `yarn imgdata src/images/ src/scss/ 1` to build all the data URI SCSS files, then `yarn build`. The end result will be /dist/error.html. Note that error.css and error.js are inside the /dist directory as well, but are already embedded in the HTML and these files are only there to make reruns with `yarn buildhtml` possible. They can be removed with `yarn cleanup`.
