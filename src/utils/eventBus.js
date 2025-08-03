/**
 * @file 全局事件总线工具
 * @description 基于mitt库的轻量级事件总线，用于组件间通信
 * @author LeeAt67
 * @created 2025-08-03
 * @mobile 移动端优化的事件处理，支持Toast消息传递
 * @dependencies mitt
 */

// === 第三方库导入 ===
import mitt from "mitt";

/**
 * 全局事件总线实例
 * @type {Object}
 * @description 基于mitt的事件发布订阅中心，用于组件间解耦通信
 * @mobile 适用于移动端页面切换、状态同步等场景
 * @usage
 * - eventBus.emit('event', data) - 发布事件
 * - eventBus.on('event', handler) - 订阅事件
 * - eventBus.off('event', handler) - 取消订阅
 * @example
 * // 发布事件
 * eventBus.emit('userLogin', { userId: 123 });
 *
 * // 订阅事件
 * eventBus.on('userLogin', (data) => {
 *   console.log('用户登录:', data.userId);
 * });
 */
export const eventBus = mitt();

/**
 * 显示Toast消息的便捷方法
 * @function showToast
 * @param {string} message - 要显示的消息内容
 * @param {string} [type="success"] - 消息类型：success | error | warning | info
 * @param {number} [duration=2000] - 显示持续时间（毫秒）
 * @description 封装Toast消息显示，统一项目中的提示信息样式
 * @mobile
 * - 移动端适配的消息提示
 * - 自动适应屏幕尺寸
 * - 支持触摸关闭
 * @usage 替代直接调用eventBus.emit，提供更简洁的API
 * @example
 * // 成功提示
 * showToast('操作成功！');
 *
 * // 错误提示
 * showToast('网络连接失败', 'error', 3000);
 *
 * // 警告提示
 * showToast('请先登录', 'warning');
 */
export const showToast = (message, type = "success", duration = 2000) => {
  // 通过事件总线发布toast事件，由Toast组件监听处理
  eventBus.emit("toast", { message, type, duration });
};
