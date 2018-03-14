<template>
  <div class="input">
    <input type="tel"  maxlength="1" class="ipt" id="beginBtn">
    <input type="tel"  maxlength="1" class="ipt">
    <input type="tel"  maxlength="1" class="ipt">
    <input type="tel"  maxlength="1" class="ipt">
    <input type="tel"  maxlength="1" class="ipt">
    <input type="tel"  maxlength="1" class="ipt">
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {

      };
    },
    mounted() {
      var ARR = [];
      var _self = this;
      (function (window, document) {
        var active = 0,
          inputBtn = document.querySelectorAll('.ipt');
        for (var i = 0; i < inputBtn.length; i++) {
          inputBtn[i].addEventListener('click', function () {
            inputBtn[active].focus();
          }, false);
          inputBtn[i].addEventListener('focus', function () {
            this.addEventListener('keyup', listenKeyUp, false);
          }, false);
          inputBtn[i].addEventListener('blur', function () {
            this.removeEventListener('keyup', listenKeyUp, false);
          }, false);
        }

        /**
         * 监听键盘的敲击事件
         */
        function listenKeyUp() {
          var beginBtn = document.querySelector('#beginBtn');
//          console.log(window.event.keyCode);
//          console.log(this.value);
//          if(window.event.keyCode == 8){
//            ARR.pop();
//            if (active > 0) {
//              active -= 1;
//            }
//            inputBtn[active].focus();
//          }else
            if (!isNaN(this.value) && this.value.length != 0) {
              if (active < 5) {
                active += 1;
              }
              inputBtn[active].focus();
              ARR[active] = this.value;
              this.value = '*';

          } else if (this.value.length == 0) {
            if (active > 0) {
              active -= 1;
            }
            inputBtn[active].focus();
          }

          _self.$emit("payData",ARR);

          if (active >= 4) {
            var _value = inputBtn[active].value;
            if (beginBtn.className == 'begin-no' && !isNaN(_value) && _value.length != 0) {
              beginBtn.className = 'begin';
              beginBtn.addEventListener('click', function () {
                calculate.begin();
              }, false);
            }
          } else {
            if (beginBtn.className == 'begin') {
              beginBtn.className = 'begin-no';
            }
          }
        }
      })(window, document);
    },
    methods: {},
    components: {}
  }
</script>

<style lang="scss" scoped>
  .input {
    display: flex;
    input {
      flex: 0 0 1.75rem;
      -webkit-flex:0 0 1.75rem;
      border: 1px solid #E3E3E3;
      -webkit-appearance: none;
      width: 1.75rem;
      height: 1.75rem;
      outline:none;
      font-family: inherit;
      font-size: 28px;
      font-weight: inherit;
      text-align: center;
      line-height: 2.1rem;
      color: #c2c2c2;
      margin-right: 0.5rem;
      background: rgba(255,255,255,0);
    }
    /*&:last-child {*/
    /*border-right: 1px solid #E3E3E3;*/
    /*}*/
  }
</style>
