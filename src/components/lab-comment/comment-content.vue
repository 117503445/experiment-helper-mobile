<template>
  <view class="comment-content">
    <!-- 评论区head部分 -->
    <view class="comment-header">
      <text>评论</text>
      <text>{{ number }}</text>
    </view>

    <!-- 评论区用户添加评论部分 -->
    <view class="comment-navi">
      <view class="comment-icon"><image mode="aspectFill" :src="avatar" alt=""></image></view>
      <view class="comment-input">
        <input
          type="text"
          placeholder="说说你知道的实验内幕"
          placeholder-class="input-placeholder"
          v-model="commit"
          @confirm="addComment()"
        />
      </view>
    </view>

    <!-- 评论区详细评论信息部分 -->
    <view class="comment-info" v-if="number > 0">
      <Comment-item
        class="comment-info-item"
        v-for="item in comment"
        :key="item.id"
        :id="item.id"
        :content="item.content"
        :feature="item.isFeatured"
        :like.sync="item.isLiked"
        :author="item.authorNickName"
        :avatar="item.authorAvatar"
        :number.sync="item.likeNum"
        :name="name"
      ></Comment-item>
    </view>

    <!-- 评论区查看更多评论部分 -->
    <view class="comment-more" v-if="number > 0">
      <text @click="showComment()">
        <text>查看全部评论</text>
        <text class="right-arrow"></text>
      </text>
    </view>
  </view>
</template>

<script>
import CommentItem from './../../components/lab-comment/comment-item.vue';

export default {
  name: 'LabComment',

  components: {
    /**
     * 一级评论组件
     */
    CommentItem
  },

  props: {
    /**
     * 实验名称
     * @type {string}
     */
    name: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      /**
       * token
       * @type {string}
       */
      token: null,

      /**
       * 评论用户输入内容
       * @type {string}
       */
      commit: '',

      /**
       * 用户头像
       * @type {string}
       */
      avatar: '../../static/default-icon.png',

      /**
       * 用户昵称
       * @type {string}
       */
      nickname: '',

      /**
       * 评论总数量
       * @type {number}
       */
      number: 0,

      /**
       * 评论详细内容
       * @type {Array<Comment>}
       */
      comment: []
    };
  },

  methods: {
    /**
     * @function
     * @description 点击查看全部评论
     * @description   跳转至问题详情页
     * @returns {void}
     */
    showComment() {
      uni.navigateTo({
        url: `./../../pages/comment-index/comment-index?experimentName=${this.name}`
      });
    },

    /**
     * @function
     * @async
     * @description 用户添加评论
     * @returns {void}
     */
    async addComment() {
      // 检测评论是否为空
      const content = this.commit.trim();
      if (content.length === 0) {
        uni.showToast({
          title: '评论不可为空！',
          icon: 'error',
          duration: 2000
        });
        return;
      }

      // 检测是否已有token
      if (!this.token) {
        this.$emit('login');
      }

      // 提交评论
      try {
        const { res: data } = await uni.request({
          url: `https://experiment-helper.be.wizzstudio.com/api/experiment/${
            this.name
          }/discussionPost`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            token: 'Bearer ' + this.token
          },
          data: {
            content: this.commit
          }
        });
        if (res.code === 0) {
          uni.showToast({
            title: '评论成功！',
            icon: 'success',
            duration: 2000
          });

          // （请求成功）更新评论数量
          ++this.number;
        } else {
          throw new Error();
        }
      } catch (e) {
        console.error(e);
        uni.showToast({
          title: '评论失败！',
          icon: 'error',
          duration: 2000
        });
      }
    },

    /**
     * @function
     * @async
     * @description 请求获取评论数据
     * @returns {void}
     */
    async getComment() {
      try {
        const [, { data: res }] = await uni.request({
          url: `https://experiment-helper.be.wizzstudio.com/api/experiment/${
            this.name
          }/discussionOverview`,
          method: 'GET',
          header: {
            'Content-Type': 'application/json',
            token: 'Bearer ' + this.token
          }
        });
        if (res.code === 0) {
          const { Number: number, topDisscussions: comments } = res.data;
          this.number = number;
          this.comment = comments;
        } else {
          throw new Error();
        }
      } catch (e) {
        console.error(e);
        uni.showToast({
          title: '网络异常！',
          icon: 'error',
          duration: 2000
        });
      }
    },

    /**
     * @function
     * @async
     * @description 登录，抛给外层lab页面处理
     * @returns {void}
     */
    handleLogin() {
      this.$emit('login');
    }
  },

  beforeMount() {
    try {
      this.token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDI4Mzk5ODMsImlhdCI6MTY0MjIzNTE4MywidXNlciI6eyJpZCI6MSwiY3JlYXRlZEF0IjoiMjAyMS0wMy0xNCAxMzoyOToyNCIsInVwZGF0ZWRBdCI6IjIwMjItMDEtMTMgMTc6NTk6MDciLCJkZWxldGVkQXQiOiIiLCJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIkMmEkMTIkbWlFM3hFcFNrTERJS0ZKMFpPTWtzZVJqeWpsS3liejV0RmZNTU5HY1lMTk5veVdTaEN4SHUiLCJhdmF0YXIiOiIifX0.suC_-fgGaAiMP4ZPjtwpHpeclfFOOkh5JX3kNHkVjEw';
      // this.token = uni.getStorageSync('token');
      const bbbbb = uni.base64ToArrayBuffer(this.token);
      console.log(bbbbb);
    } catch (e) {
      console.error(e);
    }

    try {
      this.avatar = uni.getStorageSync('avatar');
      this.nickname = uni.getStorageSync('nickname');
    } catch (e) {
      console.error(e);
    }

    this.getComment();
  }
};
</script>

<style lang="less" scoped>
.comment-content {
  width: 100%;
  height: auto;
  padding: 25rpx 0;

  // 评论区head部分
  .comment-header {
    width: 100%;
    height: 2em;
    margin: 0 25rpx;

    font-size: 30rpx;
    font-weight: 600;
    line-height: 2em;
    text-align: left;

    text {
      margin: 0 5rpx;

      &:first-child {
        letter-spacing: 1rpx;
      }

      &:last-child {
        letter-spacing: -1rpx;
      }
    }
  }

  // 用户添加评论部分
  .comment-navi {
    width: calc(100% - 50rpx);
    height: 3em;
    margin: 0 25rpx;

    box-sizing: border-box;

    font-size: 25rpx;

    display: flex;
    justify-content: center;
    align-items: center;

    .comment-icon {
      width: 12.5%;
      height: 75rpx;

      image {
        width: 75rpx;
        height: 75rpx;
        border-radius: 50%;
      }
    }

    .comment-input {
      width: 87.5%;
      height: 75rpx;
      padding: 0 25rpx;
      box-sizing: border-box;

      font-size: 25rpx;

      display: flex;
      justify-content: center;
      align-items: center;

      input {
        width: 100%;
        height: 55rpx;
        margin: 10rpx 0;
        padding: 0 10rpx;

        box-sizing: border-box;

        font-size: 25rpx;
        line-height: 100%;
        text-align: left;
        letter-spacing: 1rpx;

        border-radius: 15rpx;
        border: 1rpx solid #ccc;

        &::placeholder {
          color: #aaa;
          font-size: 25rpx;
          letter-spacing: 1rpx;
        }

        &:focus {
          box-shadow: 0 0 5rpx #ccc;
        }
      }
    }
  }

  // 评论信息部分
  .comment-info {
    .comment-info-item {
      margin: 5rpx 0;
    }
  }

  // 查看更多评论响应部分
  .comment-more {
    text-align: center;
    line-height: 2em;
    color: #aaa;

    .right-arrow {
      display: inline-block;
      margin-left: 10rpx;

      width: 8px;
      height: 8px;
      border-top: 2px solid #ccc;
      border-right: 2px solid #ccc;
      transform: rotate(45deg);
    }
  }
}
</style>
