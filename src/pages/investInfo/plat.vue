<template>
  <div id="plat_wrapper">
    <ul>
      <li>
        <h1>注册壹盐双创账户</h1>
        <div class="platform_item_word">
          <img src="../../assets/guide/ptoprate_1.png" alt="">
          <p>在壹盐双创网站yiyanstart.com首页或下载壹盐双创APP后，通过手机号码快速注册账户，登录网站、APP。您也可以使用微信号和QQ号实现登录。</p>
        </div>
      </li>
      <li style="background: #fbfbfb;">
        <h1>认证合格投资人</h1>
        <div class="platform_item_word">
          <img src="../../assets/guide/ptoprate_2.png" alt="">
          <p>在壹盐双创网站首页右上方点击“账户名——个人资料——投资人认证”，或者在壹盐双创APP首页底端点击“我的——投资人认证”，进入壹盐双创合格投资人认证页面，提交相关信息，等待通过认证成为壹盐双创合格投资人。</p>
        </div>
      </li>
      <li>
        <h1>查看感兴趣的项目进行投资</h1>
        <div class="platform_item_word">
          <img src="../../assets/guide/ptoprate_3.png" alt="">
          <p>您可在壹盐双创网站、APP上浏览感兴趣的项目情况，还可以参加项目路演，了解项目详细信息，并就有关情况与融资人等进一步沟通。</p>
        </div>
      </li>
      <li style="background: #fbfbfb;">
        <h1>项目退出</h1>
        <div class="platform_item_word">
          <img src="../../assets/guide/ptoprate_4.png" alt="">
          <p>项目如采取IPO、并购、或其股东回购等退出方式，则投资人可退出项目，获取投资收益。但项目也可能发生破产清算等失败情况，则投资人会承受损失。再次提醒各位，投资有风险，决策需谨慎。</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {};
        },
        mounted() {
        },
        methods: {},
        components: {}
    }
</script>

<style lang="scss">
  @import 'src/style/mixin';

  #plat_wrapper{
    font-size: 0;
    ul{
      li{
        padding: 0.75rem;
        @include border-1px(#f3f3f3);
        h1{
          font-size: 0.6rem;
          line-height: 1rem;
          font-weight: 600;
          text-align: center;
          color: #333;
        }
        .platform_item_word{
          padding-top: 0.4rem;
          img{
            display: inline-block;
            width:28%;
            vertical-align: middle;
          }
          p{
            vertical-align: middle;
            width:72%;
            padding-left: 6%;
            display: inline-block;
            line-height: 0.7rem;
            font-size: 0.5rem;
            color: #666;
            text-align: justify;
          }
        }
      }
    }
  }
</style>
