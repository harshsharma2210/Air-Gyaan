<template>
  <div class="editor">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="menubar">

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <icon name="bold" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <icon name="italic" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          <icon name="strike" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <icon name="underline" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
          <icon name="code" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.paragraph() }"
          @click="commands.paragraph"
        >
          <icon name="paragraph" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          H1
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          H2
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          H3
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <icon name="ul" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <icon name="ol" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          <icon name="quote" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code_block() }"
          @click="commands.code_block"
        >
          <icon name="code" />
        </button>

        <button
          class="menubar__button"
          @click="commands.horizontal_rule"
        >
          <icon name="hr" />
        </button>

        <button
          class="menubar__button"
          @click="commands.undo"
        >
          <icon name="undo" />
        </button>

        <button
          class="menubar__button"
          @click="commands.redo"
        >
          <icon name="redo" />
        </button>

      </div>
    </editor-menu-bar>

    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script>
import Icon from './Icon'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
} from 'tiptap-extensions'
export default {
  components: {
    EditorContent,
    EditorMenuBar,
    Icon,
  },
  data() {
    return {
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
        ],
        content: `
          <h2>
            Hi there,
          </h2>
          <p>
            this is a very <em>basic</em> example of tiptap.
          </p>
          <pre><code>body { display: none; }</code></pre>
          <ul>
            <li>
              A regular list
            </li>
            <li>
              With regular items
            </li>
          </ul>
          <blockquote>
            It's amazing 👏
            <br />
            – mom
          </blockquote>
        `,
      }),
    }
  },
  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>
<style>
*{margin:0;padding:0;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-text-size-adjust:100%;-moz-text-size-adjust:100%;text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-touch-callout:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}:focus{outline:none}:after,:before{-webkit-box-sizing:border-box;box-sizing:border-box}html{font-family:Inter;font-size:18px;color:#000;line-height:1.5}body{margin:0}a{color:inherit}blockquote,h1,h2,h3,ol,p,pre,ul{margin:1rem 0}blockquote:first-child,h1:first-child,h2:first-child,h3:first-child,ol:first-child,p:first-child,pre:first-child,ul:first-child{margin-top:0}blockquote:last-child,h1:last-child,h2:last-child,h3:last-child,ol:last-child,p:last-child,pre:last-child,ul:last-child{margin-bottom:0}h1,h2,h3{line-height:1.3}.button{font-weight:700;display:-webkit-inline-box;display:inline-flex;background:transparent;border:0;color:#000;padding:.2rem .5rem;margin-right:.2rem;border-radius:3px;cursor:pointer;background-color:rgba(0,0,0,.1)}.button:hover{background-color:rgba(0,0,0,.15)}.message{background-color:rgba(0,0,0,.05);color:rgba(0,0,0,.7);padding:1rem;border-radius:6px;margin-bottom:1.5rem;font-style:italic}.editor{position:relative;max-width:30rem;margin:0 auto 5rem}.editor__content{overflow-wrap:break-word;word-wrap:break-word;word-break:break-word}.editor__content *{caret-color:currentColor}.editor__content pre{padding:.7rem 1rem;border-radius:5px;background:#000;color:#fff;font-size:.8rem;overflow-x:auto}.editor__content pre code{display:block}.editor__content p code{padding:.2rem .4rem;border-radius:5px;font-size:.8rem;font-weight:700;background:rgba(0,0,0,.1);color:rgba(0,0,0,.8)}.editor__content ol,.editor__content ul{padding-left:1rem}.editor__content li>ol,.editor__content li>p,.editor__content li>ul{margin:0}.editor__content a{color:inherit}.editor__content blockquote{border-left:3px solid rgba(0,0,0,.1);color:rgba(0,0,0,.8);padding-left:.8rem;font-style:italic}.editor__content blockquote p{margin:0}.editor__content img{max-width:100%;border-radius:3px}.editor__content table{border-collapse:collapse;table-layout:fixed;width:100%;margin:0;overflow:hidden}.editor__content table td,.editor__content table th{min-width:1em;border:2px solid #ddd;padding:3px 5px;vertical-align:top;-webkit-box-sizing:border-box;box-sizing:border-box;position:relative}.editor__content table td>*,.editor__content table th>*{margin-bottom:0}.editor__content table th{font-weight:700;text-align:left}.editor__content table .selectedCell:after{z-index:2;position:absolute;content:"";left:0;right:0;top:0;bottom:0;background:rgba(200,200,255,.4);pointer-events:none}.editor__content table .column-resize-handle{position:absolute;right:-2px;top:0;bottom:0;width:4px;z-index:20;background-color:#adf;pointer-events:none}.editor__content .tableWrapper{margin:1em 0;overflow-x:auto}.editor__content .resize-cursor{cursor:ew-resize;cursor:col-resize}.menubar{margin-bottom:1rem;-webkit-transition:visibility .2s .4s,opacity .2s .4s;transition:visibility .2s .4s,opacity .2s .4s}.menubar.is-hidden{visibility:hidden;opacity:0}.menubar.is-focused{visibility:visible;opacity:1;-webkit-transition:visibility .2s,opacity .2s;transition:visibility .2s,opacity .2s}.menubar__button{font-weight:700;display:-webkit-inline-box;display:inline-flex;background:transparent;border:0;color:#000;padding:.2rem .5rem;margin-right:.2rem;border-radius:3px;cursor:pointer}.menubar__button:hover{background-color:rgba(0,0,0,.05)}.menubar__button.is-active{background-color:rgba(0,0,0,.1)}.menubar span.menubar__button{font-size:13.3333px}.menububble{position:absolute;display:-webkit-box;display:flex;z-index:20;background:#000;border-radius:5px;padding:.3rem;margin-bottom:.5rem;-webkit-transform:translateX(-50%);transform:translateX(-50%);visibility:hidden;opacity:0;-webkit-transition:opacity .2s,visibility .2s;transition:opacity .2s,visibility .2s}.menububble.is-active{opacity:1;visibility:visible}.menububble__button{display:-webkit-inline-box;display:inline-flex;background:transparent;border:0;color:#fff;padding:.2rem .5rem;margin-right:.2rem;border-radius:3px;cursor:pointer}.menububble__button:last-child{margin-right:0}.menububble__button:hover{background-color:hsla(0,0%,100%,.1)}.menububble__button.is-active{background-color:hsla(0,0%,100%,.2)}.menububble__form{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center}.menububble__input{font:inherit;border:none;background:transparent;color:#fff}.icon[data-v-2b9db09d]{position:relative;display:inline-block;vertical-align:middle;width:.8rem;height:.8rem;margin:0 .3rem;top:-.05rem;fill:currentColor}.icon__svg[data-v-2b9db09d]{display:inline-block;vertical-align:top;width:100%;height:100%}.icon[data-v-2b9db09d]:first-child{margin-left:0}.icon[data-v-2b9db09d]:last-child{margin-right:0}.icon use>svg circle[data-v-2b9db09d],.icon use>svg g[data-v-2b9db09d],.icon use>svg path[data-v-2b9db09d],.icon use>svg rect[data-v-2b9db09d],body>svg circle[data-v-2b9db09d],body>svg g[data-v-2b9db09d],body>svg path[data-v-2b9db09d],body>svg rect[data-v-2b9db09d],symbol circle[data-v-2b9db09d],symbol g[data-v-2b9db09d],symbol path[data-v-2b9db09d],symbol rect[data-v-2b9db09d]{fill:currentColor;stroke:none}.icon use>svg [d="M0 0h24v24H0z"][data-v-2b9db09d],body>svg [d="M0 0h24v24H0z"][data-v-2b9db09d],symbol [d="M0 0h24v24H0z"][data-v-2b9db09d]{display:none}.navigation[data-v-802d4490]{display:-webkit-box;display:flex;-webkit-box-pack:justify;justify-content:space-between;-webkit-box-align:center;align-items:center;padding:.75rem;background-color:#000;color:#fff;flex-wrap:wrap}.navigation__logo[data-v-802d4490]{display:inline-block;vertical-align:middle;font-size:1.1rem;font-weight:700;margin:0 .5rem 0 0}.navigation__icon[data-v-802d4490]{width:1.5rem;height:1.5rem}.navigation__count[data-v-802d4490]{display:inline-block;vertical-align:middle;margin-top:.3rem}.navigation__link[data-v-802d4490]{display:inline-block;color:hsla(0,0%,100%,.5);text-decoration:none;font-weight:700;font-size:.9rem;padding:.1rem .5rem;border-radius:3px}.navigation__link[data-v-802d4490]:hover{color:#fff;background-color:hsla(0,0%,100%,.1)}.navigation__github-link[data-v-802d4490]{margin-left:.5rem}.hero[data-v-5a80d244]{background-color:#000;color:#fff;text-align:center;padding:3rem 1rem}.hero__inner[data-v-5a80d244]{margin:0 auto;max-width:30rem}.hero__logo[data-v-5a80d244]{width:4rem;height:4rem}.hero__logo path[data-v-5a80d244]{fill:#fff}.subnavigation[data-v-460c8f74]{padding:.5rem;background-color:rgba(0,0,0,.9);color:#fff;text-align:center}@media(min-width:600px){.subnavigation[data-v-460c8f74]{position:-webkit-sticky;position:sticky;top:0;z-index:1000}}.subnavigation__link[data-v-460c8f74]{display:inline-block;color:hsla(0,0%,100%,.5);text-decoration:none;font-weight:700;font-size:.9rem;padding:.1rem .5rem;border-radius:3px}.subnavigation__link[data-v-460c8f74]:hover{color:#fff;background-color:hsla(0,0%,100%,.1)}.subnavigation__link.is-exact-active[data-v-460c8f74]{color:#fff;background-color:hsla(0,0%,100%,.2)}.page__content{padding:4rem 1rem}.page__footer{text-align:center;margin-bottom:2rem}.page__source-link{display:inline-block;text-decoration:none;text-transform:uppercase;font-weight:700;font-size:.8rem;background-color:rgba(0,0,0,.1);color:#000;border-radius:5px;padding:.2rem .5rem}
</style>