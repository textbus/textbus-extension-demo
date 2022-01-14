import '@textbus/editor/bundles/textbus.min.css'
import {
  audioComponentLoader,
  blockBackgroundColorFormatLoader,
  blockComponentLoader,
  blockquoteComponentLoader, boldFormatLoader,
  boldTool,
  cleanTool, codeFormatLoader, colorFormatLoader,
  colorTool,
  createEditor, defaultGroupTool,
  dirFormatLoader,
  EditorOptions, fontFamilyFormatLoader, fontFamilyTool,
  fontSizeFormatLoader, fontSizeTool, headingComponentLoader,
  headingTool,
  historyBackTool,
  historyForwardTool, imageComponentLoader,
  imageTool, insertParagraphAfterTool,
  insertParagraphBeforeTool,
  italicFormatLoader,
  italicTool,
  letterSpacingFormatLoader, lineHeightFormatLoader,
  linkFormatLoader,
  LinkJumpTipPlugin,
  linkTool,
  listComponentLoader,
  olTool,
  paragraphComponentLoader,
  preComponentLoader,
  strikeThroughFormatLoader,
  strikeThroughTool,
  subscriptFormatLoader,
  superscriptFormatLoader,
  tableAddTool,
  tableComponentLoader,
  tableRemoveTool, textAlignFormatLoader,
  textAlignTool,
  textBackgroundColorFormatLoader,
  textBackgroundTool,
  textIndentFormatLoader,
  textIndentTool,
  Toolbar,
  ulTool,
  underlineFormatLoader, underlineTool, unlinkTool, verticalAlignFormatLoader, videoComponentLoader
} from '@textbus/editor';

import { alertComponentLoader } from './src/components/alert/alert.component';
import { alertTool } from './src/components/alert/alert.tool';
import { gridTool } from './src/components/grid/grid.tool';
import { gridComponentLoader } from './src/components/grid/grid.component';

const options: EditorOptions = {
  componentLoaders: [
    gridComponentLoader,
    alertComponentLoader,

    audioComponentLoader,
    blockComponentLoader,
    blockquoteComponentLoader,
    headingComponentLoader,
    imageComponentLoader,
    listComponentLoader,
    paragraphComponentLoader,
    preComponentLoader,
    tableComponentLoader,
    videoComponentLoader,
  ],
  formatLoaders: [
    boldFormatLoader,
    italicFormatLoader,
    colorFormatLoader,
    fontFamilyFormatLoader,
    fontSizeFormatLoader,
    letterSpacingFormatLoader,
    lineHeightFormatLoader,
    strikeThroughFormatLoader,
    subscriptFormatLoader,
    superscriptFormatLoader,
    underlineFormatLoader,
    codeFormatLoader,
    blockBackgroundColorFormatLoader,
    linkFormatLoader,
    textBackgroundColorFormatLoader,
    textAlignFormatLoader,
    textIndentFormatLoader,
    verticalAlignFormatLoader,
    dirFormatLoader
  ],
  plugins: [
    new Toolbar([
      [historyBackTool, historyForwardTool],
      [defaultGroupTool],
      [headingTool],
      [boldTool, italicTool, strikeThroughTool, underlineTool],
      [olTool, ulTool],
      [fontSizeTool, textIndentTool],
      [colorTool, textBackgroundTool],
      [insertParagraphBeforeTool, insertParagraphAfterTool],
      [fontFamilyTool],
      [linkTool, unlinkTool],
      [imageTool],
      [textAlignTool],
      [tableAddTool, tableRemoveTool],
      [cleanTool],

      [alertTool, gridTool]
    ]),
    new LinkJumpTipPlugin()
  ],
  content: document.getElementById('template')?.innerHTML
}

const editor = createEditor(document.getElementById('editor')!, options)


window['editor'] = editor

// editor.onChange.subscribe(() => {
//   console.log(editor.getContents())
// })
