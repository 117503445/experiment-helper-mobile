<template>
  <view class="comment-item">
    <!-- 评论者头像 -->
    <view class="left-avatar"><image :src="avatar" mode="aspectFill"></image></view>

    <!-- 评论具体内容 -->
    <view class="right-content">
      <!-- 作者 -->
      <view class="author">{{ author }}</view>

      <!-- 评论内容 -->
      <view class="content">{{ content }}</view>

      <!-- 评论foot -->
      <view class="footer">
        <!-- 日期 -->
        <view class="date">2022-04-17</view>
        <!-- 精选与否 -->
        <view class="feature">{{ feature ? '精选评论' : '' }}</view>
        <!-- 点赞 -->
        <view class="like">
          <text :class="['iconfont', like ? 'good' : '']" @click="handleLike()">&#xe673;</text>
          {{ number }}
        </view>
      </view>

      <!-- 二级评论区域插槽 -->
      <slot name="child"></slot>
    </view>
  </view>
</template>

<script>
export default {
  name: 'CommentItem',
  props: {
    /**
     * 评论内容
     * @type {string}
     */
    content: {
      type: String,
      default: ''
    },

    /**
     * 评论是否精选
     * @type {boolean}
     */
    feature: {
      type: Boolean,
      default: false
    },

    /**
     * 评论是否已点赞
     * @type {boolean}
     */
    like: {
      type: Boolean,
      default: false
    },

    /**
     * 评论者昵称
     * @type {string}
     */
    author: {
      type: String,
      default: '匿名用户'
    },

    /**
     * 评论者头像url
     * @type {string}
     */
    avatar: {
      type: String,
      default: ''
    },

    /**
     * 评论喜爱人数
     * @type {number}
     */
    number: {
      type: Number,
      default: 0
    }
  },
  methods: {
    /**
     * @function
     * @description 评论点赞
     * @return {void}
     */
    handleLike() {
      console.log('like');
    }
  }
};
</script>

<style lang="less" scoped>
.comment-item {
  width: 100%;
  height: auto;
  padding: 25rpx 10rpx;
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: flex-start;

  @font-face {
    font-family: 'iconfont';
    src: url('./../../fonts/iconfont.ttf?t=1650868828727') format('truetype');
  }

  // 评论者头像
  .left-avatar {
    width: 15%;
    height: auto;

    display: flex;
    justify-content: center;
    align-items: center;

    image {
      width: 80rpx;
      height: 80rpx;

      border-radius: 50%;
    }
  }

  // 评论详细内容
  .right-content {
    width: 85%;
    height: auto;
    padding: 0 25rpx;

    font-size: 25rpx;

    // 评论作者
    .author {
      font-weight: bold;
      letter-spacing: 1rpx;
    }

    // 评论内容
    .content {
      margin: 10rpx 0;
      box-sizing: border-box;

      max-height: 3em;

      overflow: hidden;
      display: -webkit-box;

      text-align: left;
      line-height: 1.5em;
      text-overflow: ellipsis;
      letter-spacing: 1rpx;
      word-wrap: break-word;
      word-break: break-all;
      white-space: normal;
      overflow: hidden;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    // 评论foot部分
    .footer {
      display: flex;
      justify-content: center;
      align-items: center;

      padding: 0 25rpx 0 0;

      // 日期
      .date {
        flex: 1;

        color: #aaa;
      }
      // 精选评论
      .feature {
        flex: 1;

        color: steelblue;
        text-align: center;
      }
      // 点赞
      .like {
        flex: 2;

        font-size: 30rpx;
        color: #aaa;
        text-align: right;

        .iconfont {
          font-family: 'iconfont' !important;
          // font-size: 16px;
          font-style: normal;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;

          font-size: 35rpx;
          padding: 0 10rpx;
        }

        // 已点赞
        .good {
          color: blue;
        }
      }
    }
  }
}
</style>
