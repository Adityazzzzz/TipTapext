import { Node } from '@tiptap/core';

const Footnote = Node.create({
  name: 'footnote',
  group: 'inline',
  inline: true,
  atom: true,

  addAttributes() {
    return {
      id:{default:()=>`footnote-${Date.now()}`}, content:{default:''}
    };
  },

  parseHTML() {
    return[
      {tag:'footnote'}
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['footnote', HTMLAttributes, 0];
  },

  addCommands() {
    return{
      setFootnote:(attributes)=>({commands})=>{
        return commands.insertContent({
          type: this.name,
          attrs: attributes,
        });
      },
    };
  },
});

export default Footnote;
