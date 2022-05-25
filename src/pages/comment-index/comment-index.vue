<template>
  <view class="comment-index">
    <!-- 评论区标题 -->
    <view class="comment-title"><text>全部评论</text></view>

    <!-- 评论页head -->
    <view class="comment-head">
      <view class="number">评论 {{ number }}</view>
      <view class="check" @click="switchCommentStatus">
        <view :data-type="true" :class="{ select: cType }">默认</view>
        <view :data-type="false" :class="{ select: !cType }">最新</view>
      </view>
    </view>

    <!-- 评论区内容 -->
    <comment-item-main
      v-for="item in comments"
      :key="item.id"
      :id="item.id"
      :content="item.content"
      :feature="item.isFeatured"
      :like="item.isLiked"
      :author="item.authorNickName"
      :avatar="item.authorAvatar"
      :number="item.likeNum"
      :name="name"
    >
      <template #child v-if="item.Childs && item.Childs.disscussions">
        <comment-item
          style="padding: 25rpx 0;"
          v-for="it in item.Childs.disscussions"
          :key="it.id"
          :id="it.id"
          :content="it.content"
          :feature="it.isFeatured"
          :like="it.isLiked"
          :author="it.authorNickName"
          :avatar="it.authorAvatar"
          :number="it.likeNum"
          :from="true"
        ></comment-item>
      </template>
    </comment-item-main>

    <!-- 评论输入条 -->
    <view class="comment-input">
      <input
        type="text"
        maxlength="200"
        v-model="commit"
        placeholder="说说你知道的实验内幕吧!"
        placeholder-class="ph"
      />
      <button @click="commitComment">发布</button>
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
      comments: [],

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
     * @param {TouchEvent} e
     * @returns {void}
     */
    switchCommentStatus(e) {
      const { type } = e.target.dataset;
      this.cType = type;
      this.getComment();
    },

    /**
     * @function
     * @description 提交评论
     * @returns {void}
     */
    commitComment() {
      console.log('commit-comment');
    },

    async getComment() {
      try {
        const [, { data: res }] = await uni.request({
          url: `https://experiment-helper.be.wizzstudio.com/api/experiment/${
            this.name
          }/discussionDetail?sortStrategy=${this.cType ? '默认' : '最新'}`,
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-urlencoded',
            token: 'Bearer ' + this.token
          },
          data: {}
        });

        if (res.code === 0) {
          const { Number: number, disscussions: comments } = res.data;
          this.number = number;
          this.comments = comments;
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
    }
  },
  onLoad(option) {
    const { experimentName: name } = option;
    this.name = name;

    this.getComment();
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
