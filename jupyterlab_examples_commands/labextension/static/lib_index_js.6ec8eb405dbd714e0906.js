(self["webpackChunk_jupyterlab_examples_commands"] = self["webpackChunk_jupyterlab_examples_commands"] || []).push([["lib_index_js"],{

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UploadDialogBody": () => (/* binding */ UploadDialogBody),
/* harmony export */   "ButtonExtension": () => (/* binding */ ButtonExtension),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/disposable */ "webpack/sharing/consume/default/@lumino/disposable");
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_disposable__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);




const uploadCommand = (share) => {
    let formData = new FormData();
    formData.append('notebook', new File([JSON.stringify(share.notebook.toJSON())], share.filename));
    formData.append('enable-annotations', String(share.enableAnnotations));
    formData.append('enable-discovery', String(share.enableDiscovery));
    return new Promise((resolve, reject) => {
        fetch('http://localhost:8000/api/notebook', {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (!response.ok) {
                // response.text().then(text => setErrorMessage(text))
                // setIsUploading(false)
            }
            else {
                response.json().then(data => {
                    resolve(data.url);
                }).catch(err => {
                    // setErrorMessage(String(err));
                    // setIsUploading(false)
                });
            }
        }).catch(err => {
            // setErrorMessage(String(err))
            // setIsUploading(false)
        });
    });
};
const UploadInterface = (props) => {
    const [enableDiscovery, setEnableDiscovery] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const [enableAnnotations, setEnableAnnotations] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    return react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", null,
        react__WEBPACK_IMPORTED_MODULE_2__.createElement("form", { style: { display: "flex", flexDirection: "column" } },
            react__WEBPACK_IMPORTED_MODULE_2__.createElement("label", { style: { marginBottom: "16px" } },
                react__WEBPACK_IMPORTED_MODULE_2__.createElement("input", { type: "checkbox", checked: !enableDiscovery, onChange: (ev) => setEnableDiscovery(!ev.target.checked) }),
                "Hide from search engines"),
            react__WEBPACK_IMPORTED_MODULE_2__.createElement("label", null,
                react__WEBPACK_IMPORTED_MODULE_2__.createElement("input", { type: "checkbox", checked: enableAnnotations, onChange: (ev) => setEnableAnnotations(ev.target.checked) }),
                "Allow viewer annotations")),
        react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", { style: { marginTop: "32px" } },
            react__WEBPACK_IMPORTED_MODULE_2__.createElement("button", { className: "jp-Dialog-button jp-mod-styled jp-mod-accept", style: { float: "right" }, onClick: () => {
                    const share = {
                        notebook: props.notebookPanel.model,
                        filename: props.notebookPanel.title.label,
                        enableDiscovery: enableDiscovery,
                        enableAnnotations: enableAnnotations
                    };
                    uploadCommand(share).then((url) => {
                        alert(url);
                    });
                } }, "Upload")));
};
class UploadDialogBody extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ReactWidget {
    constructor(notebookPanel) {
        super();
        this.notebookPanel = notebookPanel;
    }
    render() {
        return react__WEBPACK_IMPORTED_MODULE_2__.createElement(UploadInterface, { notebookPanel: this.notebookPanel });
    }
}
/**
 * A notebook widget extension that adds a button to the toolbar.
 */
class ButtonExtension {
    createNew(panel, context) {
        let button = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ToolbarButton({
            className: 'myButton',
            iconClass: 'fa fa-fast-forward',
            onClick: () => {
                (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                    title: "Share notebook",
                    body: new UploadDialogBody(panel),
                    buttons: []
                });
            },
            tooltip: 'Run All'
        });
        panel.toolbar.insertItem(-1, 'shareToNotebookSharingSpace', button);
        return new _lumino_disposable__WEBPACK_IMPORTED_MODULE_1__.DisposableDelegate(() => {
            button.dispose();
        });
    }
}
const extension = {
    id: 'commands',
    autoStart: true,
    activate: (app) => {
        app.docRegistry.addWidgetExtension('Notebook', new ButtonExtension());
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (extension);


/***/ })

}]);
//# sourceMappingURL=lib_index_js.6ec8eb405dbd714e0906.js.map