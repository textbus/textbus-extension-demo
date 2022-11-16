import { Attribute, Commander, Component, Formatter } from '@textbus/core'
import { AttributeLoader, ComponentLoader, FormatLoader } from '@textbus/platform-browser'
import {
  alertComponent,
  alertComponentLoader,
  audioComponent,
  audioComponentLoader, blockBackgroundColorFormatLoader,
  blockBackgroundColorFormatter,
  blockComponent, blockComponentLoader,
  blockquoteComponent,
  blockquoteComponentLoader, boldFormatLoader,
  boldFormatter,
  boldTool,
  cleanTool,
  codeFormatLoader,
  codeFormatter, colorFormatLoader,
  colorFormatter,
  colorTool,
  componentsTool, defaultGroupTool,
  dirFormatLoader, dirFormatter, Editor,
  EditorOptions,
  fontFamilyFormatLoader, fontFamilyFormatter,
  fontFamilyTool,
  fontSizeFormatLoader, fontSizeFormatter,
  fontSizeTool,
  formatPainterTool,
  headingComponent, headingComponentLoader,
  headingTool,
  historyBackTool,
  historyForwardTool,
  imageCardComponent, imageCardComponentLoader, imageComponent,
  imageComponentLoader,
  imageTool, insertParagraphAfterTool,
  insertParagraphBeforeTool,
  italicFormatLoader, italicFormatter, italicTool,
  jumbotronComponent,
  jumbotronComponentLoader,
  katexComponent,
  katexComponentLoader,
  letterSpacingFormatLoader,
  letterSpacingFormatter,
  lineHeightFormatLoader,
  lineHeightFormatter, linkFormatLoader,
  linkFormatter,
  LinkJumpTipPlugin,
  linkTool, listComponent,
  listComponentLoader,
  olTool,
  paragraphComponent,
  paragraphComponentLoader,
  preComponent,
  preComponentLoader,
  stepComponent,
  stepComponentLoader,
  strikeThroughFormatLoader,
  strikeThroughFormatter,
  strikeThroughTool,
  subscriptFormatLoader,
  subscriptFormatter, superscriptFormatLoader, superscriptFormatter,
  tableAddTool,
  tableComponent,
  tableComponentLoader, tableRemoveTool,
  textAlignFormatLoader,
  textAlignFormatter,
  textAlignTool,
  textBackgroundColorFormatLoader,
  textBackgroundColorFormatter,
  textBackgroundTool, textIndentFormatLoader,
  textIndentFormatter,
  textIndentTool,
  timelineComponent,
  timelineComponentLoader,
  todolistComponent,
  todolistComponentLoader,
  Toolbar,
  ToolFactory,
  ulTool,
  underlineFormatLoader,
  underlineFormatter,
  underlineTool,
  unlinkTool, verticalAlignFormatLoader,
  verticalAlignFormatter,
  videoComponent, videoComponentLoader,
  wordExplainComponent, wordExplainComponentLoader
} from '@textbus/editor';
import { testComponent } from './src/components/test/test.component';

export const defaultComponentLoaders: ComponentLoader[] = [
  imageCardComponentLoader,
  todolistComponentLoader,
  katexComponentLoader,
  wordExplainComponentLoader,
  timelineComponentLoader,
  stepComponentLoader,
  alertComponentLoader,
  jumbotronComponentLoader,
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
];

export const defaultFormatLoaders: FormatLoader<any>[] = [
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
  linkFormatLoader,
  textBackgroundColorFormatLoader,
  verticalAlignFormatLoader,
]

export const defaultAttributeLoaders: AttributeLoader<any>[] = [
  blockBackgroundColorFormatLoader,
  textAlignFormatLoader,
  textIndentFormatLoader,
  dirFormatLoader
]

export const defaultComponents: Component[] = [
  audioComponent,
  blockComponent,
  blockquoteComponent,
  headingComponent,
  imageComponent,
  listComponent,
  paragraphComponent,
  preComponent,
  tableComponent,
  videoComponent,
  imageCardComponent,
  todolistComponent,
  katexComponent,
  wordExplainComponent,
  timelineComponent,
  stepComponent,
  alertComponent,
  jumbotronComponent
]
export const defaultFormatters: Formatter<any>[] = [
  boldFormatter,
  italicFormatter,
  colorFormatter,
  fontFamilyFormatter,
  fontSizeFormatter,
  letterSpacingFormatter,
  lineHeightFormatter,
  strikeThroughFormatter,
  subscriptFormatter,
  superscriptFormatter,
  underlineFormatter,
  codeFormatter,
  linkFormatter,
  textBackgroundColorFormatter,
  verticalAlignFormatter,
]

export const defaultAttributes: Attribute<any>[] = [
  blockBackgroundColorFormatter,
  textAlignFormatter,
  textIndentFormatter,
  dirFormatter,
]

import '@textbus/editor/bundles/textbus.min.css'

export const defaultOptions: EditorOptions = {
  editingStyleSheets: [
    `[textbus-document=true] [style*=color]:not([style*=background-color])
     [textbus-document=true] a {color: inherit;}
     [textbus-document=true] a {text-decoration: underline; color: #449fdb; cursor: text;}
     [textbus-document=true] {line-height: 1.5}`
  ],
  components: defaultComponents,
  formatters: defaultFormatters,
  componentLoaders: defaultComponentLoaders,
  formatLoaders: defaultFormatLoaders,
  attributes: defaultAttributes,
  attributeLoaders: defaultAttributeLoaders
}

export const defaultTools: ToolFactory[][] = [
  [historyBackTool, historyForwardTool],
  [defaultGroupTool],
  [componentsTool],
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
  [formatPainterTool],
  [cleanTool]
]

export function createEditor(options: EditorOptions = {}) {
  return new Editor({
    plugins: [
      () => new Toolbar(defaultTools),
      () => new LinkJumpTipPlugin()
    ],
    ...defaultOptions,
    ...options
  })
}


const editor = createEditor()
editor.mount(document.getElementById('editor')!)

const btn = document.getElementById('insertTextComponent')!

btn.addEventListener('click', () => {
  const commander = editor.get(Commander)

  commander.insert(testComponent.createInstance(editor, {
    state: {
      borderColor: '#f00'
    }
  }))
})

// editor.onChange.subscribe(() => {
//   console.log(editor.getContents())
// })

