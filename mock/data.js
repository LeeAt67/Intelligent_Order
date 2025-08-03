import Mock from "mockjs";

// 图片数据生成函数
const getImages = (page, pageSize = 10) => {
  return Array.from({ length: pageSize }, (_, i) => ({
    // 唯一的索引
    id: `${page}-${i}`,
    height: Mock.Random.integer(100, 300),
    url: Mock.Random.image("300x200", Mock.Random.color(), "#fff", "img"),
  }));
};

// 菜品数据生成函数
const getDishesData = () => {
  const categories = [
    { id: "1", name: "热菜" },
    { id: "2", name: "凉菜" },
    { id: "3", name: "汤品" },
    { id: "4", name: "主食" },
    { id: "5", name: "饮品" },
    { id: "6", name: "甜品" },
  ];

  // 预定义菜品
  const dishNames = {
    1: ["宫保鸡丁", "红烧肉", "糖醋里脊", "回锅肉", "麻婆豆腐", "鱼香肉丝"],
    2: ["凉拌黄瓜", "皮蛋豆腐", "凉拌木耳"],
    3: ["西湖牛肉羹", "冬瓜排骨汤", "紫菜蛋花汤"],
    4: ["蛋炒饭", "牛肉面", "扬州炒饭"],
    5: ["鲜榨橙汁", "柠檬蜂蜜茶", "绿豆汤"],
    6: ["提拉米苏", "红豆冰", "芒果布丁"],
  };

  // 生成菜品数据
  const dishes = {};
  categories.forEach((category) => {
    const categoryId = category.id;
    const names = dishNames[categoryId] || [];

    dishes[categoryId] = names.map((name, index) => ({
      id: parseInt(`${categoryId}${index + 1}`),
      name,
      price: Mock.Random.integer(10, 50), // 随机价格 12-50 元
      image: Mock.Random.image("300x200", Mock.Random.color(), "#fff", name),
      desc: Mock.Random.csentence(8, 15), // 随机描述
      category: categoryId,
    }));
  });

  return { categories, dishes };
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
  // 菜单分类接口
  {
    url: "/api/menu/categories",
    method: "get",
    timeout: 500,
    response: () => {
      const { categories } = getDishesData();
      return {
        code: 0,
        data: categories,
        msg: "success",
      };
    },
  },
  // 菜品列表接口
  {
    url: "/api/menu/dishes",
    method: "get",
    timeout: 800,
    response: ({ query }) => {
      const { dishes } = getDishesData();
      const categoryId = query.categoryId;

      if (categoryId) {
        // 返回指定分类的菜品
        return {
          code: 0,
          data: dishes[categoryId] || [],
          msg: "success",
        };
      } else {
        // 返回所有菜品
        return {
          code: 0,
          data: dishes,
          msg: "success",
        };
      }
    },
  },
];
