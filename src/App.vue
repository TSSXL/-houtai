<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
  .pager{
    width:100%;
    margin: 40px auto;
    text-align: center;
  }
body,html,#app{
    height: 100%;
    padding: 0;
    margin: 0;
    min-width: 1366px;
  font-family: Source Sans Pro,Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
}
  .el-form-item__content{
    width:100%;
    margin-left: 0 !important;
  }
p{
  margin: 0;
  padding: 0;
}
.btns{
  text-align: center;
}
  .gg{
    width:100%;
  }
  .ggs .item{
    width:100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .ggs .item .l{
    width:5%;
  }
  .ggs .item .l i{
    font-size: 20px;
    cursor: pointer;
  }
  .ggs .item .r{
    width:93%;
  }
  .ggs .item .r .oItem{
    width:100%;
    display: flex;
    flex-direction: row;
    margin-bottom: 30px;
    align-items: center;
  }
  .ggs .item .r .oItem .s2{
    margin-left: 20px;
  }
  .el-form-item{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
</style>
