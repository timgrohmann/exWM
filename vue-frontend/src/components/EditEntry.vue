<template>
  <div>
    <h1>Eintrag berarbeiten</h1>
     <v-text-field placeholder="Überschrift" v-model="item.headline" solo></v-text-field>
    <v-textarea
      placeholder="Beitragstext"
      v-model="item.body"
      solo
      @input="tag_text(item.body)"
    ></v-textarea>
    <v-combobox
      v-model="item.keyword"
      label="Schlagwörter"
      chips
      prepend-icon="local_offer"
      append-icon
      solo
      multiple
      hide-no-data
      :items="[]"
    >
      <template v-slot:selection="data">
        <v-chip
          :selected="data.selected"
          label
          @click="remove(data.item)"
          color="primary lighten-3"
        >
          <strong>{{ data.item }}</strong>&nbsp;
        </v-chip>
      </template>
    </v-combobox>
     <v-card class="mb-2" v-if="filteredUnusedTags.length != 0">
      <v-card-text>
        <p class="subheading">entfernte Schlagwörter</p>
        <v-chip
          v-for="st in filteredUnusedTags"
          :key="st"
          @click="item.keyword.push(st)"
          color="red lighten-3"
        >
          <strong>{{ st }}</strong>&nbsp;
        </v-chip>
      </v-card-text>
    </v-card>
    <v-card>
    <v-card class="mb-2" v-if="filteredTags.length != 0">
      <v-card-text>
        <p class="subheading">Tag-Vorschläge aus dem Beitragstext</p>
        <v-chip
          v-for="st in filteredTags"
          :key="st"
          @click="item.keyword.push(st)"
          color="deep-purple lighten-4"
        >
          <strong>{{ st }}</strong>&nbsp;
        </v-chip>
      </v-card-text>
    </v-card>
    <v-card-text>
        <p class="subheading">Bereits verwendete Tags</p>
        <v-chip
          v-for="st in filteredAllTags"
          :key="st"
          @click="item.keyword.push(st)"
          color="green lighten-3"
        >
          <strong>{{ st }}</strong>&nbsp;
        </v-chip>
      </v-card-text>
    </v-card>
    <div class="text-xs-center">
      <v-btn large color="primary" v-on:click="updateEntry">Aktualisieren</v-btn>
    </div>
  </div>
</template>

<script>
import data from "../data"

export default {
  props: {
    uuid: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
       item: {keyword: []},
       unusedTags: [],
       suggested_tags: [],
       all_tags: []
    }
  },
  watch: {
    uuid() {
      this.refresh()
    }
  },
  mounted() {
    data.getAllTags(tags => {
      this.all_tags = tags
    })
    this.refresh()
  },
  computed: {
    filteredUnusedTags() {
      return this.unusedTags.filter(
        x => !this.item.keyword.includes(x) && !this.suggested_tags.includes(x)
      )
    },
    filteredTags() {
      return this.suggested_tags.filter(
        x => !this.item.keyword.includes(x) && !this.all_tags.includes(x)
      )
    },
    filteredAllTags() {
      return this.all_tags.filter(
        x => !this.item.keyword.includes(x) && !this.unusedTags.includes(x)
      )
    },
    helpfulTags() {
      return this.item.keyword.filter(
        x => !this.unusedTags.includes(x)
      )
    }
  },
  methods: {
    refresh() {
      data.findByUUID(this.uuid, (error, data) => {
        console.log(data)
        this.item = data
        this.unusedTags = this.unusedTags.concat(data.keyword)
      })
    },
    tag_text(t){
      console.log('body::', t)
      data.tag_text(t)
      this.suggested_tags = data.tags_text
    },
    remove(item) {
      this.item.keyword.splice(this.item.keyword.indexOf(item), 1)
      this.item.keyword = [...this.item.keyword]
    },
    updateEntry() {
      data.updateEntryText(this.item, this.item.headline, this.item.body, this.item.keyword, err => {
        if (err) {
          console.log(err)
        }
      })
      data.evaluate_tags(helpfulTags,filteredUnusedTags)
      this.item.keyword
          .filter(x => !this.all_tags.includes(x))
          .forEach(tag => {
            data.insertNewTag(tag, error => {
              if (error) {
                console.log("Error while adding new keywords", error)
              }
            })
          })
      this.$router.push({name: 'DetailPage', params: {id: this.item.uuid}})
    }
  }
}
</script>
