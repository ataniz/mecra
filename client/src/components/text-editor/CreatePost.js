import React, { useState } from 'react';
import { DraftailEditor } from 'draftail';
import { EditorState } from 'draft-js';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin';
import './CreatePost.css';
import 'draft-js/dist/Draft.css';
import 'draftail/dist/draftail.css';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import 'draft-js-side-toolbar-plugin/lib/plugin.css';

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;
const sideToolbarPlugin = createSideToolbarPlugin();
const { SideToolbar } = sideToolbarPlugin;
const plugins = [inlineToolbarPlugin, sideToolbarPlugin];

const CreatePost = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  return (
    <div className="CreatePost">
      <DraftailEditor
        editorState={editorState}
        onChange={setEditorState}
        placeholder="Sevgi kelebekleri..."
        plugins={plugins}
      />
      <InlineToolbar />
      <SideToolbar />
    </div>
  );
};

export default CreatePost;

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       editorState: EditorState.createEmpty(),
//     };
//     this.changeState = this.changeState.bind(this);
//   }
//   changeState(state) {
//     this.setState({
//       editorState: state,
//     });
//   }
//   render() {
//     return (
//       <div className="App">
//         <DraftailEditor
//           editorState={this.state.editorState}
//           onChange={this.changeState}
//           placeholder="Tell your story..."
//           plugins={plugins}
//         />
//         <InlineToolbar />
//         <SideToolbar />
//       </div>
//     );
//   }
// }
// export default App;
