<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <span class="title font-weight-high">Air Gyaan (logo)</span>
      </div>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-bottom-navigation color="primary" app>
      <v-btn to="/">
        <span>Home</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn to="/explore">
        <span>Explore</span>
        <v-icon>mdi-search-web</v-icon>
      </v-btn>

      <!-- <v-btn to="/nearby">
          <span>Nearby</span>
          <v-icon>mdi-map-marker</v-icon>
        </v-btn> -->

      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            class="mx-2 rounded-circle d-inline-block"
            color="cyan accent-2"
            elevation="6"
            rounded
            x-large
            fab
            top
            center
            absolute
          >
            <v-icon large>mdi-plus</v-icon>
          </v-btn>
        </template>
        
        <v-card class="pa-md-7 mx-lg-auto" id="rounded-card">
          <h2>
          New Post!
        </h2>

          <template>
            <div>
              <tiptap-vuetify
                v-model="content"
                :extensions="extensions"
                placeholder="Write something …(max 250 words!)"
              />
            </div>
          </template>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Post!
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-btn to="/profile">
        <span>Notifs</span>
        <v-icon>mdi-bell-ring</v-icon>
      </v-btn>

      <v-btn to="/profile">
        <span>Me</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

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
  History,
} from "tiptap-vuetify";
export default {
  name: "Airgyaan",
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
      HardBreak,
    ],
    content: "",
    dialog: false,
    maxLength: 250,
    remainingChars: 250,
    reachZero: 0,
    activeBtn: 0,
    showNav: true,
  }),
};
</script>
