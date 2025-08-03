import Mock from "mockjs";

const getImages = (page, pageSize = 10) => {
  return Array.from({ length: pageSize }, (_, i) => ({
    // 唯一的索引
    id: `${page}-${i}`,
    height: Mock.Random.integer(100, 300),
    url: Mock.Random.image("300x200", Mock.Random.color(), "#fff", "img"),
  }));
};

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
  {
    url: "/api/images",
    method: "get",
    timeout: 1000,
    response: ({ query }) => {
      const page = Number(query.page) || 1;
      return {
        code: 0,
        data: getImages(page),
      };
    },
  },
];
