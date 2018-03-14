<template>
  <div id="tipDetail_wrapper">
    <h1>{{ noticeTitle }}</h1>
    <p v-html="noticeContent"></p>
    <p style="text-align: right;">壹盐双创运营团队</p>
    <router-link :to="{path:'/tip',query:{title:'平台公告'}}">查看公告列表>></router-link>
  </div>
</template>

<script type="text/ecmascript-6">
    import {getNoticeDetail} from '@/service/getData'

    export default {
      data() {
          return {
            noticeId:'',
            noticeContent:'',
            noticeTitle:''
          };
      },
      async beforeMount(){
        this.noticeId = this.$route.query.noticeId;
      },
      mounted() {
        getNoticeDetail(this.noticeId).then(res =>{
          this.noticeContent = res.noticeContent;
          this.noticeTitle = res.noticeTitle;
        })
      },
      methods: {},
      components: {}
    }
</script>

<style lang="scss">

  #tipDetail_wrapper{
    font-size: 0;
    padding: 0.95rem 0.75rem;
    h1{
      width: 100%;
      margin: 0 auto;
      font-size: 0.7rem;
      color: #333;
      line-height: 1.25rem;
      text-align: center;
      /*padding-bottom: 0.75rem;*/
      /*overflow:hidden;*/
      /*text-overflow:ellipsis;*/
      /*display:-webkit-box;*/
      /*-webkit-box-orient:vertical;*/
      /*-webkit-line-clamp:1;*/
    }
    p{
      font-size: 0.65rem;
      color: #999;
      line-height: 0.75rem;
      margin: 0.75rem 0;
    }
    img{
      width:100%;
    }
    a{
      font-size: .7rem;
      /*position: absolute;*/
      width:89%;
      /*bottom: 1rem;*/
      text-align: center;
      padding-left: 4.5rem;
      color: #647076;
    }
  }

</style>
