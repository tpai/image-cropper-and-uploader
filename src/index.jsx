/* global document File */

import React, { Component } from 'react';
import { render } from 'react-dom';
import Cropper from 'react-cropper';
import getSignedUrl from 'libs/s3Upload';
import dataURLtoBlob from 'blueimp-canvas-to-blob';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            src: '',
            url: 'http://placehold.it/300x300',
            loading: false,
        };
        this.crop = this.crop.bind(this);
        this.uploadClick = this.uploadClick.bind(this);
    }
    crop() {
        this.setState({
            src: this.cropper.getCroppedCanvas().toDataURL(),
        });
    }
    uploadClick() {
        const blob = dataURLtoBlob(this.state.src);
        this.setState({ loading: true });
        getSignedUrl(
            new File(
                [blob],
                `emma${new Date().getTime()}.png`,
                { type: 'image/png' }
            ),
            url => {
                this.setState({
                    url,
                    loading: false,
                });
            }
        );
    }
    render() {
        return (
            <div>
                <div className="col-lg-12">
                    <h4>Origin</h4>
                    <Cropper
                      ref={cropper => { this.cropper = cropper; }}
                      src="http://fengyuanchen.github.io/cropper/img/picture.jpg"
                      style={{ height: 400, width: '100%' }}
                      guides={false}
                      crop={this.crop}
                      autoCrop
                    />
                </div>
                <div className="col-lg-6">
                    <h4>Preview</h4>
                    <img src={this.state.src} height="300" alt="preview" />
                </div>
                <div className="col-lg-6">
                    <h4>Uploaded</h4>
                    <div className="form-group">
                        <img src={this.state.url} height="300" alt="uploaded" />
                    </div>
                    <div className="form-group">
                        <input type="text" value={this.state.url} className="form-control" readOnly />
                    </div>
                </div>
                <div className="col-lg-12">
                    <button
                      className="btn btn-primary"
                      onClick={this.uploadClick}
                      disabled={this.state.loading}
                    >Upload</button>
                </div>
            </div>
        );
    }
}

render(<Main />, document.getElementById('react'));
