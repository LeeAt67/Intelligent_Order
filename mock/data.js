import Mock from "mockjs";

export default [
  {
    url: "/api/banners",
    method: "get",
    timeout: 2000,
    response: (req, res) => {
      const randomData = Mock.mock({
        title: "@ctitle(5,10)",
        subtitle: "@ctitle(5,15)",
        image: [
          {
            alt: "@ctitle(5,10)",
            url: "https://img.yzcdn.cn/vant/cat.jpeg",
          },
          {
            url: "@image(300x200,@color,#fff,图片)",
            alt: "@ctitle(5,10)",
          },
          {
            url: "@image(300x200,@color,#fff,图片)",
            alt: "@ctitle(5,10)",
          },
          {
            url: "@image(300x200,@color,#fff,图片)",
            alt: "@ctitle(5,10)",
          },
        ],
      });
      return {
        code: 0,
        data: randomData,
        msg: "success",
      };
    },
  },
];
