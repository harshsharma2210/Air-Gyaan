<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          create Post
        </v-btn>

      </template>
      <v-card class="pa-md-7 mx-lg-auto" id="rounded-card">
        <template>
          <div>
            <h2 class="mb-3">
              New Post!
            </h2>

            <tiptap-vuetify v-model="content" :extensions="extensions" placeholder="Write something …"/>
          </div>
        </template>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Post!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<style lang="css">
#rounded-card{
    border-radius: 30px;
}
</style>

<script>
import {
  TiptapVuetify,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History
} from 'tiptap-vuetify'
export default {
  components: { TiptapVuetify },
  data: () => ({
    extensions: [
      History,
      Blockquote,
      Link,
      Underline,
      Strike,
      Italic,
      ListItem,
      BulletList,
      OrderedList,
      Bold,
      Code,
      HorizontalRule,
      Paragraph,
      HardBreak
    ],
    content: '',
    dialog: false,
    max: 250
  })
}
</script>
