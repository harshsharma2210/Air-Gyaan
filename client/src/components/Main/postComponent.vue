<template>
  <v-card class="mx-auto" color="primary" dark max-width="1000">
    <v-card-title>
      <v-icon large left>mdi-twitter</v-icon>
      <span class="title font-weight-light text-capitalize" color="secondary">{{content.catagory}}</span>
    </v-card-title>

    <v-card-text
      class="headline font-weight-bold"
    >"Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."{{content.name}}</v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="font-weight-light text-capitalize">{{content.createdBy.name}}</v-list-item-title>
        </v-list-item-content>

        <v-row align="center" justify="end">
          <v-icon class="mr-1">mdi-heart</v-icon>
          <span class="subheading mr-2">{{content.info.like}}</span>
          <span class="mr-1">·</span>
          <v-icon class="mr-1">mdi-share-variant</v-icon>
          <span class="subheading">45</span>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "post",
  props: {
    content: {
      type: Object,
    },
  },
  data: () => ({}),
};
</script>
