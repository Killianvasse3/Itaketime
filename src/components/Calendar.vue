<template>
  <div>
    <div id="nav">
      <div>
        <img id="burger" src="../assets/burger.png" alt="menu burger" />
      </div>
      <VueClock />
      <div>
        <img id="logo" src="../assets/logo_take.png" alt="logo I take time" />
      </div>
    </div>
    <div class="home">
      <div class="wrapper">
        <div class="two">
          <v-sheet dark height="95%" width="100%">
            <v-toolbar style="background-color: #1E1E1E;whith: 100%;" flat>
              <v-btn color="primary" class="mr-4" @click="dialog = true" dark>
                New Event
              </v-btn>
              <v-btn
                outlined
                class="mr-4"
                color="grey darken-2"
                @click="setToday"
              >
                Today
              </v-btn>
              <v-btn fab text small color="grey darken-2" @click="prev">
                <v-icon small>
                  mdi-chevron-left
                </v-icon>
              </v-btn>
              <v-btn fab text small color="grey darken-2" @click="next">
                <v-icon small>
                  mdi-chevron-right
                </v-icon>
              </v-btn>
              <v-toolbar-title v-if="$refs.calendar">
                {{ $refs.calendar.title }}
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-menu bottom right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    outlined
                    color="grey darken-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <span>{{ typeToLabel[type] }}</span>
                    <v-icon right>
                      mdi-menu-down
                    </v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="type = 'day'">
                    <v-list-item-title>Day</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'week'">
                    <v-list-item-title>Week</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'month'">
                    <v-list-item-title>Month</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = '4day'">
                    <v-list-item-title>4 days</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-toolbar>
          </v-sheet>
        </div>
        <div class="three">
          <div class="calendar-examples">
            <v-row class="fill-height">
              <v-col class="d-flex" cols="12">
                <v-sheet
                  height="465"
                  width="85%"
                  style="margin-left: 11%;"
                  dark
                >
                  <v-date-picker
                    no-title
                    v-model="date"
                    full-width
                    :events="minievents"
                    :event-color="eventcolor"
                    readonly
                  ></v-date-picker>
                </v-sheet>
              </v-col>
            </v-row>
          </div>
          <div class="trai2"></div>
          <youtube :video-id="VODid" :player-vars="playerVars" @playing="playing"></youtube>
        </div>
        <div class="four">
          <div class="calendar-examples">
            <v-row class="fill-height">
              <v-col>
                <v-dialog v-model="dialog" max-width="500">
                  <v-container>
                    <v-form @submit.prevent="addEvent">
                      <v-text-field
                        v-model="name"
                        type="text"
                        label="event name (required)"
                      ></v-text-field>
                      <v-text-field
                        v-model="details"
                        type="text"
                        label="detail"
                      ></v-text-field>
                      <v-text-field
                        v-model="start"
                        type="datetime-local"
                        label="start (required)"
                      ></v-text-field>
                      <v-text-field
                        v-model="end"
                        type="datetime-local"
                        label="end (required)"
                      ></v-text-field>
                      <v-text-field
                        v-model="color"
                        type="color"
                        label="color (click to open color menu)"
                      ></v-text-field>
                      <v-btn
                        type="submit"
                        color="primary"
                        class="mr-4"
                        @click.stop="dialog = false"
                      >
                        Create Event
                      </v-btn>
                    </v-form>
                  </v-container>
                </v-dialog>
                <v-sheet height="795" dark>
                  <v-calendar
                    ref="calendar"
                    v-model="focus"
                    color="primary"
                    :events="events"
                    :event-color="getEventColor"
                    :type="type"
                    @click:event="showEvent"
                    @click:more="viewDay"
                    @click:date="viewDay"
                  ></v-calendar>
                  <v-menu
                    v-model="selectedOpen"
                    :close-on-content-click="false"
                    :activator="selectedElement"
                    offset-x
                  >
                    <v-card color="grey lighten-4" min-width="350px" flat>
                      <v-toolbar :color="selectedEvent.color" dark>
                        <v-btn @click="deleteEvent(selectedEvent.id)" icon>
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                        <v-toolbar-title
                          v-html="selectedEvent.name"
                        ></v-toolbar-title>
                        <v-spacer></v-spacer>
                      </v-toolbar>
                      <v-card-text>
                        <form v-if="currentlyEditing !== selectedEvent.id">
                          {{ selectedEvent.details }}
                        </form>
                        <form v-else>
                          <textarea-autosize
                            v-model="selectedEvent.details"
                            type="text"
                            style="whidth: 100%"
                            :min-height="100"
                            placeholder="add note"
                          ></textarea-autosize>
                        </form>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn
                          text
                          color="secondary"
                          @click="selectedOpen = false"
                        >
                          Close
                        </v-btn>
                        <v-btn
                          text
                          v-if="currentlyEditing !== selectedEvent.id"
                          @click.prevent="editEvent(selectedEvent)"
                        >
                          Edit
                        </v-btn>
                        <v-btn
                          text
                          v-else
                          @click.prevent="updateEvent(selectedEvent)"
                        >
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-menu>
                </v-sheet>
              </v-col>
            </v-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueClock from "@dangvanthanh/vue-clock";
import { db } from "@/main";
export default {
  components: { VueClock },
  data: () => ({
    today: new Date().toISOString().substr(0, 10),
    focus: new Date().toISOString().substr(0, 10),
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days",
    },
    name: null,
    details: null,
    start: null,
    end: null,
    color: "#1976D2",
    currentlyEditing: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    dialog: false,
    minievents: [],
    playerVars: {
      autoplay: 1
    },
    VideoId: null,
    VODid: {},
    idVOD: [
        'X3-Bw31fI2s',
        'DWcJFNfaw9c',
        'hx1omESNUIE',
        'D-FIfQ5bINo',
        '9sk0ROz6TVE',
        'CX45pYvxDiA',
        '68ugkg9RePc',
        'XCiDuy4mrWU',
        'gy1B3agGNxw',
        'bAVTn14kdyg',
      ],
  }),
  mounted() {
    this.getEvents();
    this.pushVODid();
  },
  computed: {
    player() {
      return this.$refs.youtube.player
    }
  },
  methods: {
    playing() {
      console.log('we are watching!!!')
    },
    async getEvents() {
      let snapshot = await db.collection("calEvent").get();
      let events = [];
      let minievents = [];
      snapshot.forEach((doc) => {
        let appData = doc.data();
        appData.id = doc.id;
        events.push(appData);
        minievents.push(doc.data().start.substring(0, 10));
      });
      this.minievents = minievents;
      this.events = events;
      this.VideoId = Math.floor(Math.random() * (this.idVOD.length));
      this.VODid = this.idVOD[this.VideoId];
      console.log(this.VODid)
    },
    async addEvent() {
      if (this.name && this.start && this.end) {
        await db.collection("calEvent").add({
          name: this.name,
          details: this.details,
          start: this.start,
          end: this.end,
          color: this.color,
        });
        this.getEvents();
        this.name = "";
        this.details = "";
        this.start = "";
        this.end = "";
        this.color = "#1976D2";
      } else {
        alert("Name, start and end date are required");
      }
    },
    async updateEvent(ev) {
      await db
        .collection("calEvent")
        .doc(this.currentlyEditing)
        .update({
          details: ev.details,
        });
      this.selectedOpen = false;
      this.currentlyEditing = null;
    },
    async deleteEvent(ev) {
      await db
        .collection("calEvent")
        .doc(ev)
        .delete();

      this.selectedOpen = false;
      this.getEvents();
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    editEvent(ev) {
      this.currentlyEditing = ev.id;
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
  },
};
</script>

<style>
div .v-main__wrap {
  background-color: #303030 !important;
}
iframe {
  width: 90%;
  max-width: 650px;
  margin-left: 20px;
  height: 45%;
}
div .clock[data-v-91068ba8] {
  background: none !important;
  border: solid 1px #6e7378 !important;
  display: flex;
  margin-top: 7px;
  margin-bottom: 7px !important;
}
div .clock__hours[data-v-91068ba8] {
  border-right: none !important;
  font-size: 1.4rem !important;
}
div .clock__minutes[data-v-91068ba8] {
  border-right: none !important;
  font-size: 1.4rem !important;
}
div .clock__seconds[data-v-91068ba8] {
  font-size: 1.4rem !important;
}
div .clock__hourtime[data-v-91068ba8] {
  font-size: 0.6rem !important;
}
div .v-date-picker-table {
  height: 400px !important;
}
div table {
  height: 400px !important;
}
div .v-picker__body {
  background-color: #1f1f1f !important;
}
div .v-btn--fab.v-size--small {
  width: 30px !important;
  height: 30px !important;
}
div .theme--dark.v-sheet {
  background-color: none !important;
}
div .v-calendar-weekly__head-weekday {
  border-right: none !important;
}
div .theme--dark.v-calendar-events {
  border: none !important;
}
div .theme--dark.v-calendar-weekly .v-calendar-weekly__day {
  border: none !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #303030;
}
#nav {
  display: flex;
  justify-content: space-around;
  background-color: #303030;
}

#nav a {
  font-weight: bold;
  color: #aefffc;
}

#burger {
  width: 2.8%;
  padding: 0.4%;
}

#logo {
  width: 5%;
  margin-left: 85%;
  padding: 0.3%;
}
.wrapper {
  background-color: #303030;
  transform: translate(-0.1%);
  display: grid;
  grid-template-columns: repeat(100, 1%);
  grid-gap: 4px;
  grid-auto-rows: minmax(5px, auto);
}
.two {
  display: flex;
  padding-left: 2%;
  grid-column: 13 / 84;
  grid-row: 1 / 8;
  border-radius: 15px;
  background-color: #202020;
  border: solid 1px #6e7378;
}
.trai {
  border: solid 1px #aefffc;
  height: 70%;
  margin-bottom: auto;
  margin-top: auto;
  margin-left: 2%;
}
.trai2 {
  border: solid 1px #aefffc;
  width: 76%;
  height: 0%;
  margin-left: 15%;
  margin-bottom: 5%;
}
.trai3 {
  border: solid 2px #0fb14a;
  width: 0%;
  height: 13px;
  margin-left: 10%;
  margin-right: 5%;
}
.event {
  display: flex;
  margin-top: 5%;
}
.titlecat {
  display: flex;
  justify-content: space-around;
  margin-top: 2%;
  margin-left: 4%;
}
.titlecat h1 {
  margin-bottom: auto;
  margin-top: auto;
  font-size: 80%;
  color: #ffffff;
}
.titlecal {
  display: flex;
  justify-content: space-around;
  margin-top: 2%;
  margin-left: 4%;
}
.titlecal h1 {
  margin-bottom: auto;
  margin-top: 3%;
  font-size: 80%;
  color: #ffffff;
}
.namecat {
  display: flex;
  flex-direction: column;
}
.namecat p {
  color: #ffffff;
  font-size: 85%;
}
.couleur1 {
  margin-left: 20%;
  height: 19px;
  width: 7%;
  border-radius: 5px;
  background-color: #0fb14a;
}
.couleur2 {
  margin-left: 20%;
  height: 19px;
  width: 7%;
  border-radius: 5px;
  background-color: #0f68b1;
}
.couleur3 {
  margin-left: 20%;
  height: 19px;
  width: 7%;
  border-radius: 5px;
  background-color: #a1b10f;
}
.couleur4 {
  margin-left: 20%;
  height: 19px;
  width: 7%;
  border-radius: 5px;
  background-color: #960fb1;
}
.couleur5 {
  margin-left: 20%;
  height: 19px;
  width: 7%;
  border-radius: 5px;
  background-color: #3db10f;
}
.couleur6 {
  margin-left: 20%;
  height: 19px;
  width: 7%;
  border-radius: 5px;
  background-color: #0f99b1;
}
.couleur7 {
  margin-left: 20%;
  height: 19px;
  width: 7%;
  border-radius: 5px;
  background-color: #eeda29;
}
.chaque {
  display: flex;
  margin-top: 5%;
  margin-bottom: 1.1%;
}
.chaque p {
  margin-left: 10%;
}
.gtrai {
  border: solid 1px #aefffc;
  height: 70%;
  margin-bottom: auto;
  margin-top: auto;
  margin-left: 2%;
  margin-right: 1.5%;
}
.date {
  display: flex;
}
.date svg {
  color: #aefffc;
}
.date p {
  transform: translate(250%, 40%);
  font-size: 120%;
  color: #aefffc;
}
.search {
  display: flex;
  margin-bottom: auto;
  margin-top: auto;
  border: solid 1px #aefffc;
  width: 70%;
  height: 70%;
  border-radius: 11px;
}
.search p {
  margin-bottom: auto;
  margin-top: auto;
  margin-left: 2%;
  text-align: left;
  color: #aefffc;
}
#numj {
  color: #aefffc;
}
#text {
  margin-bottom: auto;
  margin-top: 1.4%;
  margin-left: 1%;
  margin-right: 1%;
  font-size: 90%;
  color: #aefffc;
}
.two h1 {
  margin-bottom: auto;
  margin-top: auto;
  font-size: 140%;
  color: #aefffc;
}
.logue {
  margin-bottom: auto;
  margin-top: auto;
  margin-left: 2%;
  color: #ffffff;
}
.logue2 {
  margin-bottom: auto;
  margin-top: auto;
  margin-left: 2%;
  height: 50%;
  color: #aefffc;
}
.three {
  transform: translate(-10%);
  grid-column: 1 / 14;
  grid-row: 1 / 99;
  border-radius: 15px;
  background-color: #202020;
  border: solid 1px #6e7378;
}
.navcal h1 {
  margin-bottom: auto;
  margin-top: auto;
  font-size: 80%;
  color: #aefffc;
}
.navcal {
  display: flex;
  margin-left: 30%;
  grid-row: 1 / 10;
}
.navcal p {
  margin-left: 5%;
  margin-bottom: auto;
  margin-top: auto;
  font-size: 55%;
  color: #aefffc;
}
.four {
  grid-column: 13 / 84;
  grid-row: 8 / 99;
  border-radius: 11px;
  padding-top: 1%;
  padding-left: 1%;
  padding-right: 2%;
  border: solid 1px #6e7378;
  background-color: #202020;
}
.col {
  max-height: 100%;
}

.day {
  color: #aefffc;
  text-align: left;
  font-size: 80%;
  margin-top: 0.5%;
  display: grid;
  grid-gap: 4.5px;
  border-radius: 11px;
  height: 100%;
  grid-template-columns: repeat(7, 14%);
  grid-auto-rows: minmax(1px, auto);
}
.days {
  display: grid;
  font-size: 90%;
  text-align: left;
  grid-gap: 4.5px;
  border-radius: 11px;
  grid-template-columns: repeat(7, 14%);
  grid-auto-rows: minmax(145px, auto);
}
.day2 {
  color: #aefffc;
  transform: translate(13%);
  text-align: left;
  font-size: 70%;
  margin-top: 0.5%;
  display: grid;
  grid-template-columns: repeat(7, 12.4%);
  grid-auto-rows: minmax(1px, auto);
}
.days2 {
  display: grid;
  transform: translate(13%);
  font-size: 70%;
  text-align: left;
  grid-gap: 4.5px;
  grid-template-columns: repeat(7, 11%);
  grid-auto-rows: minmax(80px, 1%);
}

.un {
  padding-left: 5%;
  border-radius: 15px;
  color: #ffffff;
}
.ung {
  padding-left: 5%;
  border-radius: 15px;
  color: #ffffff60;
}
.und {
  padding-left: 5%;
  border-radius: 15px;
  color: #da6446;
}
.ungd {
  padding-left: 5%;
  border-radius: 15px;
  color: #da644660;
}
.uno {
  padding-left: 5%;
  border-radius: 15px;
  color: #ffffff;
  border: solid 1px #0fb14a;
}
.uno2 {
  padding-left: 5%;
  border-radius: 5px;
  color: #ffffff;
  border: solid 1px #0fb14a;
}
.una {
  padding-left: 5%;
  border-radius: 15px;
  color: #ffffff;
}
.aujour {
  width: 12px;
  padding-left: 2%;
  border-radius: 4px;
  background-color: #0fb14a;
}
.aujour2 {
  width: 9px;
  padding-left: 6%;
  border-radius: 4px;
  background-color: #0fb14a;
}
.jour {
  border-radius: 15px;
}
.jour1 {
  border-radius: 15px;
  color: #da6446;
}
.date-examples {
  display: flex;
}
</style>
