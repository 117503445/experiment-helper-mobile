<template>
  <view class="comment-index">
    <!-- 评论区标题 -->
    <view class="comment-title"><text>全部评论</text></view>

    <!-- 评论页head -->
    <view class="comment-head">
      <view class="number">评论 {{ number }}</view>
      <view class="check" @click="switchCommentStatus()">
        <view :class="{ select: cType }">默认</view>
        <view :class="{ select: !cType }">最新</view>
      </view>
    </view>

    <!-- 评论区内容 -->
    <comment-item-main
      v-for="item in comment"
      :key="item.id"
      :content="item.content"
      :feature="item.isFeatured"
      :like="item.isLiked"
      :author="item.authorNickName"
      :avatar="item.authorAvatar"
      :number="item.likeNum"
      :name="name"
    >
      <template #child v-if="item.childDisscussions && item.childDisscussions.disscussions">
        <comment-item
          style="padding: 25rpx 0;"
          v-for="it in item.childDisscussions.disscussions"
          :key="it.id"
          :content="it.content"
          :feature="it.isFeatured"
          :like="it.isLiked"
          :author="it.authorNickName"
          :avatar="it.authorAvatar"
          :number="it.likeNum"
        ></comment-item>
      </template>
    </comment-item-main>

    <!-- 评论输入条 -->
    <view class="comment-input">
      <input
        type="text"
        v-model="commit"
        placeholder="说说你知道的实验内幕吧!"
        placeholder-class="ph"
      />
      <button @click="commitComment()">发布</button>
    </view>
  </view>
</template>

<script>
import CommentItemMain from './../../components/lab-comment/comment-item0.vue';
import CommentItem from './../../components/lab-comment/comment-item.vue';

export default {
  components: {
    CommentItemMain,
    CommentItem
  },
  data() {
    return {
      /**
       * 评论类型
       * - true 默认
       * - false 最新
       * @type {boolean}
       */
      cType: true,

      /**
       * 实验名称
       * @type {string}
       */
      name: '',

      /**
       * 评论内容
       * @type {Array<Comment>}
       */
      comment: [
        {
          id: 1,
          content: '转动惯量是惯性大小的量度',
          likeNum: 45,
          isFeatured: true,
          isLiked: false,
          authorId: 1,
          authorNickName: 'fouuu',
          authorAvatar: './../../static/default-icon.png',
          childDisscussions: {
            remainNumber: 6,
            disscussions: [
              {
                id: 3,
                content: '学会使用智能计时计数器测量时间',
                likeNum: 18,
                isFeatured: false,
                isLiked: false,
                authorId: 3,
                authorNickName: 'rngchongchong',
                authorAvatar: './../../static/default-icon.png',
                replyId: 1,
                replyAuthor: 'fouuu'
              }
            ]
          }
        },
        {
          id: 2,
          content: '学习原理和方法',
          likeNum: 18,
          isFeatured: true,
          isLiked: false,
          authorId: 2,
          authorNickName: '你的大弟',
          authorAvatar: './../../static/default-icon.png'
        }
      ],

      /**
       * 评论数量
       * @type {number}
       */
      number: 18,

      /**
       * 用户输入评论
       * @type {string}
       */
      commit: ''
    };
  },
  methods: {
    /**
     * @function
     * @description 切换评论状态
     * @returns {void}
     */
    switchCommentStatus() {
      console.log('switch-status');
    },

    /**
     * @function
     * @description 提交评论
     * @returns {void}
     */
    commitComment() {
      console.log('commit-comment');
    }
  },
  onLoad(option) {
    const { experimentName: name } = option;
    this.name = name;
  }
};
</script>

<style lang="less" scoped>
.comment-index {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;

  position: relative;

  // 评论区标题
  .comment-title {
    width: 100%;
    height: 2em;

    font-size: 30rpx;
    font-weight: bold;
    line-height: 2em;
    text-align: center;
    letter-spacing: 1rpx;
  }

  // 评论页head
  .comment-head {
    width: 100%;
    height: 2.5em;
    padding: 0rpx 20rpx;

    box-sizing: border-box;

    display: flex;
    justify-content: center;
    align-items: center;

    .number {
      flex: 3;

      font-weight: bold;
      letter-spacing: -1rpx;
    }

    .check {
      flex: 1;

      width: auto;
      height: 2.2em;
      padding: 0.1em 0.2em;

      display: flex;
      justify-content: center;
      align-items: center;

      background-color: #ddd;
      border-radius: 1000rpx;

      font-size: 28rpx;

      view {
        flex: 1;

        text-align: center;
        line-height: 2em;
        font-weight: 500;
      }

      .select {
        background-color: white;
        border-radius: 1000rpx;

        height: 2em;
      }
    }
  }

  .comment-input {
    width: 100vw;
    height: auto;

    position: fixed;
    bottom: 0;
    left: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 28rpx;

    border-top: 1rpx solid #ccc;

    input {
      width: 80%;
      padding: 0 15rpx;

      .ph {
        color: #ccc;
        font-size: 28rpx;
      }
    }

    button {
      width: 20%;

      background-color: transparent;
      border: none;
      outline: none;

      color: steelblue;
      font-size: 30rpx;
      letter-spacing: 1rpx;

      &::after {
        border: none;
      }
    }
  }
}
</style>
