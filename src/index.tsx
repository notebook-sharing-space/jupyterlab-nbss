import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { ReactWidget, showDialog, ToolbarButton } from '@jupyterlab/apputils';
import {
  DocumentRegistry
} from '@jupyterlab/docregistry';
import { INotebookModel, NotebookPanel } from '@jupyterlab/notebook';
import { DisposableDelegate, IDisposable } from '@lumino/disposable';
import * as React from 'react';
import { useState } from 'react';




interface NotebookShare {
  notebook: INotebookModel,
  filename: string,
  enableAnnotations: boolean,
  enableDiscovery: boolean
}
const uploadCommand = (share: NotebookShare) => {

  let formData = new FormData();
  formData.append('notebook', new File(
    [JSON.stringify(share.notebook.toJSON())],
    share.filename
  ));
  formData.append('enable-annotations', String(share.enableAnnotations));
  formData.append('enable-discovery', String(share.enableDiscovery));

  return new Promise<string>((resolve, reject) => {
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
      } else {
        response.json().then(data => {
          resolve(data.url)
        }).catch(err => {
          // setErrorMessage(String(err));
          // setIsUploading(false)
        })
      }
    }).catch(err => {
      // setErrorMessage(String(err))
      // setIsUploading(false)
    })

  })
}

interface UploadInterfaceProps {
  notebookPanel: NotebookPanel
}

const UploadInterface = (props: UploadInterfaceProps) => {
  const [enableDiscovery, setEnableDiscovery] = useState(false);
  const [enableAnnotations, setEnableAnnotations] = useState(false);
  const [shareUrl, setShareUrl] = useState(null);

  return <div>
    <form style={{ display: "flex", flexDirection: "column" }}>
      <label style={{ marginBottom: "16px" }}>
        <input type="checkbox" checked={!enableDiscovery} onChange={(ev) => setEnableDiscovery(!ev.target.checked)} />
      Hide from search engines
    </label>
      <label>
        <input type="checkbox" checked={enableAnnotations} onChange={(ev) => setEnableAnnotations(ev.target.checked)} />
      Allow viewer annotations
    </label>
    </form>
    <div style={{ marginTop: "32px" }}>
      <button className="jp-Dialog-button jp-mod-styled jp-mod-accept" style={{ float: "right" }} onClick={() => {
        const share: NotebookShare = {
          notebook: props.notebookPanel.model,
          filename: props.notebookPanel.title.label,
          enableDiscovery: enableDiscovery,
          enableAnnotations: enableAnnotations
        }
        uploadCommand(share).then((url) => {
          setShareUrl(url)
        });
      }}>Upload</button>
    </div>
  </div>
}

export class UploadDialogBody extends ReactWidget {
  notebookPanel: NotebookPanel;

  constructor(notebookPanel: NotebookPanel) {
    super();
    this.notebookPanel = notebookPanel;
  }

  render(): JSX.Element {
    return <UploadInterface notebookPanel={this.notebookPanel} />
  }
}

/**
 * A notebook widget extension that adds a button to the toolbar.
 */
export class ButtonExtension implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel> {

  createNew(panel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>): IDisposable {
    let button = new ToolbarButton({
      className: 'myButton',
      iconClass: 'fa fa-fast-forward',
      onClick: () => {
        showDialog({
          title: "Share notebook",
          body: new UploadDialogBody(panel),
          buttons: []
        })
      },
      tooltip: 'Run All'
    });

    panel.toolbar.insertItem(-1, 'shareToNotebookSharingSpace', button);
    return new DisposableDelegate(() => {
      button.dispose();
    });
  }
}

const extension: JupyterFrontEndPlugin<void> = {
  id: 'commands',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    app.docRegistry.addWidgetExtension('Notebook', new ButtonExtension());
  }
};

export default extension;
