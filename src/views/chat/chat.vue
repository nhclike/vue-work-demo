/*消息聊天模板*/
<template>
<div class="container-message">
    <div class="header">
        <div class="title">消息聊天</div>
    </div>
    <div class="container-body">
        <div class="chat-title">
            <ul>
                <li class="published" >
                    <i></i>
                    已发表
                    <span id="publishedNum">0</span>
                    人
                </li>


                <li class="unpublished">
                    <i></i>
                    未发表
                    <span id="unpublishedNum">0</span>
                    人
                </li>

               <li class="detail">查看详情</li>
            </ul>

        </div>

        <!-- 聊天面板 -->
        <div class="chat-area">
            <!-- 上方信息区域 -->
            <div class="chat-content">
                <div class="chat-list">
                   <div class="chat-right">
                    <div>
                        <p>
                            <i>2010-2-2 10:00:00</i>
                            <b>张三</b>
                        </p>
                        <div class="msg">收到</div>
                    </div>
                    <span><img src="@/assets/images/icon/icon-person.png" alt=""></span>
                </div>
                    <div class="chat-left">
                        <span><img src="@/assets/images/icon/icon-person.png" alt=""></span>
                        <div>
                            <p>
                                <b>张三</b>
                                <i>2010-2-2 10:00:00</i>

                            </p>
                            <div class="msg">大幅度</div>

                        </div>
                    </div>
                    <div class="chat-right">
                        <div>
                            <p>
                                <i>2010-2-2 10:00:00</i>
                                <b>张三</b>
                            </p>
                            <div class="msg">afaaaaaa辅导辅导费对方答复地方的负担地方的负担对方答复的辅导辅导费对方答复地方afaaaaaa辅导辅导费对方答复地方的负担地方的负担对方答复的辅导辅导费对方答复地方afaaaaaa辅导辅导费对方答复地方的负担地方的负担对方答复的辅导辅导费对方答复地方afaaaaaa辅导辅导费对方答复地方的负担地方的负担对方答复的辅导辅导费对方答复地方afaaaaaa辅导辅导费对方答复地方的负担地方的负担对方答复的辅导辅导费对方答复地方afaaaaaa辅导辅导费对方答复地方的负担地方的负担对方答复的辅导辅导费对方答复地方</div>
                        </div>
                        <span><img src="@/assets/images/icon/icon-person.png" alt=""></span>
                    </div>
                    <div class="chat-left">
                        <span><img src="@/assets/images/icon/icon-person.png" alt=""></span>
                        <div>
                            <p>
                                <b>张三</b>
                                <i>2010-2-2 10:00:00</i>

                            </p>
                            <div class="msg">收到是多少多撒大声地撒大声地收到收到撒大声地收到所多收到是多少多撒大声地撒大声地收到收到撒大声地收到所多收到是多少多撒大声地撒大声地收到收到撒大声地收到所多</div>

                        </div>
                    </div>
                </div>
            </div>


                <div class="chat-send">

                    <div class="inputBox">
                            <div class="chooseBox">
                                <span>参会人员</span>
                                <select class="form-control" name="attendMember" id="attendMember">
                                    <option value="">参会人</option>
                                </select>
                                <button class="finishBtn">完成</button>

                        <textarea rows="2" placeholder="" id="content" name="content"></textarea>
                    </div>
                    <div class="action">
                        <button type="button" class="publishBtn">发表</button>
                    </div>
                </div>
        </div>
    </div>
    </div>
</div>

</template>

<script>
export default {

};
</script>

<style scoped lang='less'>
@chat-send-height:150px;
ul{
  margin: 0;
  li{
    list-style: none;
  }
}
.container-message{
  width: 100%;
  height: 100%;
  padding: 0 15px;
  position: relative;
  // top:0;
  // left:0;
  // right: 0;
  // bottom: 0;
  .header{
    height: 60px;
    line-height: 60px;
    .title{
      font-size: 20px;
      color: #696969;
    }
  }
  .container-body{
    width: 100%;

    height: calc(100% - 75px);
    border: 1px solid #ddd;
    .chat-title{
      height: 30px;
      background: #e2e2e2;

      ul{
        overflow: hidden;
        position: relative;
        li{
          float: left;
          height: 30px;
          line-height: 30px;
          padding: 0 10px;
          font-size: 14px;
          cursor: pointer;
          i{
            width: 5px;
            height: 5px;
            border-radius: 5px;
            display: inline-block;
            margin-right: 5px;
            margin-bottom: 4px;
          }
          &.published{
            color: #1cbd23;
            i{
              background: #1cbd23;
            }
          }
          &.unpublished{
            color: #ec4646;
            i{
              background: #ec4646;
            }
          }
          &.detail{
            color: #8b8b8b;
            i{
              background: #8b8b8b;
            }
          }

        }
      }

    }
    .chat-area{
      background: #f9f9f9;
      position: relative;
      width: 100%;
      height: calc(100% - 30px);
      .chat-content{
        position: absolute;
        top:0;
        bottom: @chat-send-height;
        left: 10px;
        right: 10px;
        overflow-y: scroll;
      }
      .chat-send{
        position: absolute;
        bottom: 0;
        height: @chat-send-height;
        width: 100%;
        border: 1px solid #ddd;
        background: #fff;
        .inputBox{
          height: 100%;
          .chooseBox{
            height: 45px;
            width: 100%;
            flex: 0 0 40px;
            display: block;
            padding: 5px;
            box-sizing: border-box;
            border-bottom: 1px solid #ddd;
            .form-control{
              height: 34px;
            }
            &:after{
              content: "";
              display: block;
              clear: both;
            }
            span{
              font-size: 16px;
              color: #00a0e9;
              float: left;
              display: block;
              margin: 0 10px;
              height: 30px;
              line-height: 30px;
            }
            select{
              float: left;
              width: 150px;

            }
            button.finishBtn{
              padding: 2px 20px;
              color: #fff;
              background: #159cfe;
              border-radius: 5px;
              font-size: 17px;
              border: 1px solid #159cfe;
              float: right;
            }
          }
          textarea {
            display: block;
            margin:0;
            height: calc(100% - 40px);
            width:100%;
            font-size:16px;
            background-color: #fff;
            border:none;
            color:#000;
          }
        }
        .action{
          position: absolute;
          bottom: 5px;
          right: 5px;
          .publishBtn{
            padding: 2px 20px;
            color: #fff;
            background: #159cfe;
            border-radius: 5px;
            font-size: 18px;
            border: 1px solid #159cfe;
          }
        }


      }
    }
  }

}

div.publishMember{
  position: absolute;
  top:90px;
  left: 40px;
  background: #ddd;
  max-height: 400px;
  overflow-y: auto;
  li{
    float: none;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    font-size: 14px;
    cursor: pointer;
  }
}
div.unpublishedMember{
  position: absolute;
  top:90px;
  left: 140px;
  background: #ddd;
  max-height: 400px;
  overflow-y: auto;
  li{
    float: none;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    font-size: 14px;
    cursor: pointer;
  }
}
div.chat-left {
  text-align:left;
  margin: 10px auto;

  span{
    max-width: 60px;
    font-weight:normal;
    font-size:18px;
    color:#999;
    overflow: hidden;
    float: left;
  }
  &>div {
    display: inline-block;
    width: calc(100% - 60px);
    p{
      font-size: 16px;
      color: #a7b7c5;
      padding-left: 10px;
      i{
        font-style: normal;
      }
      b{
        font-weight: normal;
      }
    }
    .msg{
      max-width: 90%;
      position: relative;
      float: left;
      padding: 6px;
      color: #fff;
      font-size: 18px;
      margin: 0 20px 0 10px;
      border-radius: 10px;
      background-color: #42aefc;
      box-shadow: inset 0 0 1px #42aefc;
      vertical-align: top;
      &:before{
        content:"";
        position: absolute;
        left: -5px;
        top: 4px;
        width: 0;
        height: 0;
        border-top: solid transparent;
        border-right: 10px solid #42aefc;
        border-bottom: 4px solid transparent;
      }
    }

  }
}

div.chat-right {
  text-align:right;
  margin: 10px auto;
  span{
    max-width: 60px;
    font-weight:normal;
    font-size:14px;
    color:#999;
    overflow: hidden;
    float: right;
  }
  &>div{
    display: inline-block;
    width: calc(100% - 60px);
    p{
      font-size: 16px;
      color: #a7b7c5;
      padding-left: 10px;

      i{
        font-style: normal;
      }
      b{
        font-weight: normal;
      }
    }
    .msg{
      max-width: 90%;
      position:relative;
      float: right;
      padding: 6px;
      font-size: 18px;
      margin:0 10px 0 12px;
      text-align:left;
      border-radius:10px;
      color:#fff;
      box-shadow: inset 0 0 1px #48d800;
      background-color:#48d800;
      vertical-align: top;
      word-break: break-all;
      &:before {
        content:"";
        position: absolute;
        right: -5px;
        top: 4px;
        width: 0;
        height: 0;
        border-top: solid transparent;
        border-left: 10px solid #48d800;
        border-bottom: 4px solid transparent;
      }
    }

  }
}



</style>
