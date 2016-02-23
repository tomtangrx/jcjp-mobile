import React, {
  StyleSheet,
} from 'react-native';
var excellent_color = "#5294C9";
var weak_color = "rgba(208, 87, 55, 1)";
var good_color = "#7DB06F";
var new_color = "rgba(170, 170, 170, 1)";
var oblivion_color = "rgba(238, 175, 45, 1)";
var oblivion_deep = "rgba(201, 139, 10, 1)";
var chapter_color = "rgba(101, 158, 199, 1)";

export default {
  heading: StyleSheet.create({
    1: {
      fontSize: 20,
      padding:5
    },
    2: {
      fontSize: 11,
      padding: 10,
      paddingBottom: 1,
      paddingTop: 1,
      borderBottomWidth: 1,
      borderColor: "#DDD",
      
    }

  }),
  navigator: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F5F0EB"
    }
  }),
  item: StyleSheet.create({
    green: {
      backgroundColor: "#7BB16C",
      color: "#FFF",
      fontSize: 12,
      padding: 5,
      flexDirection:'column',
    },
    red: {
      backgroundColor: "#d05737",
      color: "#FFF",
      fontSize: 12,
      padding: 5,
      flexDirection:'column',
    }
  }),
  backgroundColors: StyleSheet.create({
    bg_new: {
      backgroundColor: new_color
    },
    bg_weak: {
      backgroundColor: weak_color
    },
    bg_good: {
      backgroundColor: good_color
    },
    bg_excellent: {
      backgroundColor: excellent_color
    },
    bg_oblivion: {
      backgroundColor: oblivion_color
    },
    bg_chapter: {
      backgroundColor: chapter_color
    },
    bg_lose: {
      backgroundColor: "#fff9f9"
    },
    bg_draw: {
      backgroundColor: "#fffaf0"
    }
  }),
  container: StyleSheet.create({
    main: {
      marginTop: 20,
      flex: 1,
      backgroundColor: "#F5F0EB"
    },
    tab: {
      flex: 1,
    }
  }),
  lessons: StyleSheet.create({
    chapterContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      flex: 1
    },
    chapterItem: {
      padding: 3,
      paddingBottom: 0,
      paddingTop: 15,
      margin: 10,
      marginBottom: 0,
      width: 55,
      height: 46,
      backgroundColor: '#EEE',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 0,
      borderColor: '#DDD',
        
    }
  }),
  practice: StyleSheet.create({
    answerResultItem: {
      marginRight: 5,
      padding: 5
    },
    answerResult: {
      flexWrap: 'wrap', 
      alignItems: 'flex-start',
      flexDirection:'row',
      padding: 10

    },
    questionSetView: {
      borderWidth: 1,
      borderColor: "#DDD",
      backgroundColor: "#EEE"
    },
    questionView: {
      borderWidth: 1,
      borderColor: "#DDD",
      padding: 10,
      margin: 5,
      backgroundColor: "white"

    },
    question: {
      flex: 1,
      margin: 5,
      borderColor: "#DDD",
      fontSize: 30
    },
    optionView: {
      margin: 5,
      marginTop: 0,
      padding: 10,
      paddingTop: 15,
      paddingBottom: 15,
      borderWidth: 1,
      borderColor: "#DDD",
      backgroundColor: "white"
    },
    optionText: {
      fontSize: 15

    },
    encounterView: {
      marginTop: 5,

    }
  })
};

