<template>
  <div id="newPeople_wrapper">
    <div class="newPeople_container">
      <div class="newPeople_title">
        <h5>更多回报<span class="icon_lx"></span>更多选择<span class="icon_lx"></span>更加专业</h5>
        <h3>引爆PE投资的革命</h3>
        <h3>全国性新四板股权投资—双创板</h3>
        <img src="../../assets/guide/line.png" alt="">
        <ul>
          <li>当一个新兴商业模式诞生的时候，如何判断行业的领先性和优异性？</li>
          <li>如何更有效的寻找价值洼地？</li>
          <li>当所有人都看到产业红利时，如何避免蜂拥而至带来的风险？</li>
          <li>在挑选投资项目时，我们需要经验和眼光独具，才能取得属于少部分人的胜利！</li>
        </ul>
      </div>

      <div class="newPeople_item_yy">
        <h1 class="">为什么选择壹盐双创</h1>
        <div class="pt_con">
          <img src="../../assets/guide/new_icon_1.png" alt="">
          <h2 class="">投资期限更短</h2>
          <p class="">投资期限平均1-3年</p>
        </div>
        <div class="pt_con">
          <img src="../../assets/guide/new_icon_2.png" alt="">
          <h2 class="">成长性更好</h2>
          <p class="">投资处于种子轮的初创项目</p>
        </div>
        <div class="pt_con">
          <img src="../../assets/guide/new_icon_3.png" alt="">
          <h2 class="">投资更简单放心</h2>
          <p class="">从项目筛选到项目退出，壹盐双创全程为您服务，从投前、投中、投后采用“全程跟进、严格管控、透明交易”的管理模式，帮助您完成投资认购到退出的流程。</p>
        </div>
      </div>

      <div class="newPeople_item">
        <h1 class="">关于投资，这些你必须知道</h1>
        <h2 class="">投资期限和回报</h2>
        <p class="">股权投资是指投资人购买公司股权，成为公司的股东，以获取它未来的多种收益。
          在国内传统的VC/PE投资可获得高额收益，专业机构运作的非公开股权投资期限较长，通常为3-7年，通过壹盐双创平台进行双创板投资的项目成功周期较短，为1-3年，处于种子轮直投阶段，一旦企业创业成功进入IPO将会产生企业价值的巨大飞跃，同样投资一家企业，股权投资切入时机越早，成长空间越大。</p>
        <h3>VC/PE-backed IPO回报：上市后20日回报境内市场显著高于境外市场</h3>
        <img src="../../assets/guide/new_table_1.png" alt="">
        <img src="../../assets/guide/new_table_2.png" alt="">
        <div class="key_word">
          <h4>关键发现</h4>
          <div>
            <h5>PE市场：PE投资额攀升至6000亿，PE对经济影响力逐渐在提高</h5>
            <dl>
              <dt>市场表现：</dt>
              <dd>1、PE投资活跃度不减。2016年PE市场共发生投资案例3390起，涉及投资额6014.13亿元人民币</dd>
              <dd>2、投资回报表现良好。
                在退出收益方面，IPO内部收益率（IRR）为55.8%，投资回报倍数中位数为3.24倍</dd>
            </dl>
          </div>
        </div>
        <h2 class="">认识风险</h2>
        <p class="">股权投资是一项高收益高风险的投资方式，你在获得高额回报的同时，也要清晰的认识到您投资的是处于初期的价值洼地，任何项目都不能保证100%的成功。比如产品众筹的平均成功率有30-50%，股权的则会更低。这来自于个人投资者错误的估值风险、面临的公司经营风险、宏观市场风险、欺诈风险、退出风险、管理风险等。而专业的金融人士和机构比如PE型（管理）和FA（撮合）型平台操作将会大大降低这种风险。</p>
        <h2 class="item_title">如何降低投资风险</h2>
        <p class="item_sub_title">我们建议您的黄金投资逻辑是：</p>
        <ul id="decreaseRisk">
          <li>投资于赛道 而非赛手</li>
          <li>投别人投不到的早期项目</li>
          <li>分散投资，平衡风险</li>
          <li>在专业权威的平台上选项目</li>
          <li>有领投跟投机构联合背书</li>
        </ul>
      </div>

      <div class="newPeople_item_invest">
        <h1 class="">如何进行投资</h1>
        <img src="../../assets/guide/new_table_4.png" alt="">
      </div>

    </div>
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

  #newPeople_wrapper{
    padding: 0.75rem 0 0;
    font-size: 0;
    .newPeople_container{
      .newPeople_title{
        padding: 0 0.55rem 1.1rem;
        text-align: center;
        @include border-1px(#f3f3f3);
        h5{
          font-size: 0.5rem;
          color: #000;
          line-height: 0.95rem;
          .icon_lx{
            display: inline-block;
            margin: 0 0.35rem;
            @include wh(0.15rem,0.15rem);
            background: #cbab70;
            transform: rotate(45deg);
            vertical-align: middle;
          }
        }
        h3{
          font-size: 0.75rem;
          color: #cbab70;
          line-height: 1rem;
        }
        img{
          padding: 0.3rem 0;
          width:40%;
        }
        ul{
          li{
            font-size:0.47rem;
            color: #333;
            line-height: 0.65rem;
          }
        }
      }
      .newPeople_item_yy{
        text-align: center;
        padding: 0.8rem 0.55rem 0.5rem;
        background: #fbfbfb;
        @include border-1px(#f3f3f3);
        h1{
          font-size: 0.65rem;
          color:#333;
          line-height: 1rem;
          padding-bottom: 1.1rem;
        }
        .pt_con{
          padding-bottom: 0.65rem;
          img{
            width: 10%;
            padding: 0.4rem 0;
          }
          h2{
            font-size: 0.55rem;
            line-height:0.8rem;
            color: #666;
          }
          p{
            font-size: 0.5rem;
            line-height: 0.75rem;
            color: #999;
            padding: 0 1.6rem 0.65rem;
          }
        }
      }
      .newPeople_item{
        padding: 0.75rem 0.55rem 0;
        @include border-1px(#f3f3f3);
        h1{
          font-size: 0.65rem;
          color:#333;
          line-height: 1rem;
          padding-bottom: 1.1rem;
          text-align: center;
        }
        h2{
          font-size: 0.55rem;
          color:#666;
          line-height: 0.75rem;
        }
        p{
          font-size: 0.5rem;
          color: #999;
          line-height: 0.65rem;
          padding-bottom: 0.5rem;
        }
        h3{
          font-size: 0.45rem;
          color: #333;
          font-weight: 600;
          line-height: 0.75rem;
        }
        img{
          width:100%;
          padding: 0 0.5rem 0.8rem;
          box-sizing: border-box;
        }
        .key_word{
          h4{
            font-size: 0.45rem;
            color: #000;
            font-weight: 600;
            text-align: center;
            position: relative;
            padding-bottom: 0.9rem;
            &::before{
              content: '';
              position: absolute;
              width: 0;
              height: 0;
              border-left: 2.1rem solid transparent;
              border-right: 2.1rem solid transparent;
              border-top: 0.65rem solid #f3f3f3;
              z-index: -1;
              left: 5.4rem;
              top: 0.2rem;
            }
          }
          div{
            border: 1px solid #dec9a1;
            padding: 0.6rem;
            border-radius: 5px;
            margin-bottom: 0.5rem;
            h5{
              font-size: 0.45rem;
              font-weight: 600;
              line-height: 0.75rem;
              color: #333;
            }
            dl{
              padding-top: 0.45rem;
              font-size: 0.4rem;
              line-height:0.65rem;
              dt{
                color: #333;
                font-weight: 400;
              }
              dd{
                color: #666;
              }
            }
          }
        }
        .item_title{
          padding-top: 1.2rem;
          font-size: 0.6rem;
          line-height: 1rem;
          color: #666;
        }
        .item_sub_title{
          line-height: 0.95rem;
          font-size: 0.5rem;
          color: #999;
          padding-bottom: 0.25rem;
        }
        #decreaseRisk{
          padding-bottom: 1rem;
          li{
            display: inline-block;
            width:50%;
            font-size: 0.5rem;
            color: #666;
            line-height: 1.5rem;
            padding-left: 1rem;
          }
        }
      }
      .newPeople_item_invest{
        text-align: center;
        padding: 0.8rem 0.55rem 0.5rem;
        background: #fbfbfb;
        h1{
          font-size: 0.65rem;
          color:#333;
          line-height: 1rem;
          padding-bottom: 1.1rem;
        }
        img{
          width: 80%;
        }
      }


    }
  }
</style>
