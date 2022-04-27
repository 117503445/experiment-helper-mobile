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
        :content="item.content"
        :feature="item.isFeatured"
        :like="item.isLiked"
        :author="item.authorNickName"
        :avatar="item.authorAvatar"
        :number="item.likeNum"
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
     * 评论单条模块
     * @type {Component}
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
       * 评论总数量
       * @type {number}
       */
      number: 18,

      /**
       * 评论详细内容
       * @type {Array<Comment>}
       */
      comment: [
        {
          id: 1,
          content: '转动惯量是惯性大小的量度',
          likeNum: 45,
          isFeatured: true,
          isLiked: true,
          authorId: 1,
          authorNickName: 'fouuu',
          authorAvatar: '../../static/default-icon.png'
        },
        {
          id: 2,
          content:
            '学习原理和方法学习原理和方法学习原理和方法学习原理和方法学习原理和方法学习原理和方法学习原理和方法学习原理和方法学习原理和方法学习原理和方法学习原理和方法学习原理和方法学习原理和方法',
          likeNum: 18,
          isFeatured: true,
          isLiked: false,
          authorId: 2,
          authorNickName: '你的大弟',
          authorAvatar: '../../static/default-icon.png'
        }
      ]
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
      console.log('showcomment');
      uni.navigateTo({
        url: `./../../pages/comment-index/comment-index?experimentName=${this.name}`
      });
    },

    /**
     * @function
     * @description 用户添加评论
     * @returns {void}
     */
    addComment() {
      console.log('addcomment');
    }
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
