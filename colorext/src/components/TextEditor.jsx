import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ChromePicker } from 'react-color';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Footnote from './footnote'; 
import css from './TextEditor.module.css';


const TextEditor = () => {
//Basics
  const [color, setColor] = useState('Black');
  const [showColorPicker, setShowColorPicker] = useState(false);

  const [footnotes, setFootnotes] = useState([]); 
  const [footnoteCounter, setFootnoteCounter] = useState(1);


  const editor = useEditor({
    extensions: [StarterKit, TextStyle, Color, Footnote],
    content: '<p>Select text and change its color!</p>',
  });
  const toolbarItems = [{command: 'setFootnote', label: 'Add Footnote'}];


//1
  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
    if (editor) {
      editor.chain().focus().setColor(newColor.hex).run();
    }
    setShowColorPicker(false);
  };


//2.Function to add a footnote
  const addFootnote = () => {
    const newFootnote = {
      id: footnoteCounter,
      content: `Footnote content for ${footnoteCounter}`,
    };
    editor.commands.setFootnote(newFootnote);
    setFootnotes((prevFootnotes) => [...prevFootnotes, newFootnote]);
    setFootnoteCounter(footnoteCounter + 1);
  };


//3.Function to update the content of an existing footnote
  const updateFootnoteContent = (id, newContent) => {
    setFootnotes((prevFootnotes) =>
      prevFootnotes.map((footnote) =>
        footnote.id === id ? { ...footnote, content: newContent } : footnote
      )
    );
  };


//4. MenuBar component to control the toolbar
  const MenuBar = ({ editor }) => {
    if (!editor) return null;
    return (
      <div >
        {toolbarItems.map((item)=>(
          <button className={`${css['menubar']}`} key={item.label} onClick={addFootnote}>{item.label}</button>
        ))}
      </div>
    );
  };


  return (
    <div className={`${css['container']}`} >
      <center><h2>Text Editor with Color Picker</h2></center> {/* Heading */}

      <div className={`${css['colorpicker']}`} >
        {/* Button for color picking */}
        <button onClick={() => setShowColorPicker((current) => !current)}  
          style={{
            padding: '5px 10px',
            border: '3px solid #ccc',
            backgroundColor: color,
            color: '#fff',
            cursor: 'pointer',
            borderRadius: '5px',
          }}
        >
          Choose Color
        </button>

        {/* Color picker */}
        {showColorPicker && (<ChromePicker color={color} onChange={handleColorChange} />)}

        {/* Function call for ADD footnotes */}
        <MenuBar editor={editor} />
      </div>
      
      <div className={`${css['editor']}`}> <EditorContent editor={editor}/> </div>  {/* Text Area */}


      {/* List of footnotes */}
      <div className={`${css['footstack']}`}>
        <h3>Footnotes:</h3>
        <ul> 
          {footnotes.map((footnote) => (
            <li key={footnote.id}>
              <div className={`${css['footnote1']}`}>
                <strong>Footnote {footnote.id}:</strong>
                <textarea value={footnote.content}  onChange={(e)=>updateFootnoteContent(footnote.id,e.target.value)}   rows="4" cols="50" className={`${css['footnote2']}`} />
              </div>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
};

export default TextEditor;
