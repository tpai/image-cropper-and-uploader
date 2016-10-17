/* global document XMLHttpRequest alert */

export default function getSignedUrl(file, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/put-s3?file-name=${file.name}&file-type=${file.type}`);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                uploadFile(file, response.signedRequest, () => {
                    cb(response.url);
                });
            } else {
                alert('Could not get signed URL.');
            }
        }
    };
    xhr.send();
}

function uploadFile(file, signedRequest, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                cb();
            } else {
                alert('Could not upload file.');
            }
        }
    };
    xhr.send(file);
}
