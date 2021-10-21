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

/*每个页面公共css */
</style>
