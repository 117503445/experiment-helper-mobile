<script>
export default {
  onLaunch: function () {
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
  beforeMounted: function () {
    console.log("App Load");
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
a {
  text-decoration: none;
  color: black;
  margin: 0;
  padding: 0;
}
@font-face {
  font-family: "Linearicons-Free";
  src: url("./fonts/Linearicons-Free.eot?w118d");
  src: url("./fonts/Linearicons-Free.eot?#iefixw118d") format("embedded-opentype"),
    url("./fonts/Linearicons-Free.woff2?w118d") format("woff2"), url("fonts/Linearicons-Free.woff?w118d") format("woff"),
    url("./fonts/Linearicons-Free.ttf?w118d") format("truetype"),
    url("./fonts/Linearicons-Free.svg?w118d#Linearicons-Free") format("svg");
  font-weight: normal;
  font-style: normal;
}

/*每个页面公共css */
</style>
