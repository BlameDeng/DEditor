type EventHubCallback = (data?: any) => void;
/**
 * 用于发布订阅的工具类
 */
export class EventHub {
  private events = new Map<string, Set<EventHubCallback>>();

  /**
   * 发布
   * @param eventName 事件名
   * @param data 载荷
   */
  public emit = (eventName: string, data?: any) => {
    if (this.events.has(eventName)) {
      this.events.get(eventName)!.forEach(cb => {
        cb(data);
      });
    }
  };

  /**
   * 订阅
   * @param 事件名
   * @param 回调
   */
  public subscribe = (eventName: string, cb: EventHubCallback) => {
    if (this.events.has(eventName)) {
      this.events.get(eventName)!.add(cb);
    } else {
      const set = new Set<EventHubCallback>();
      set.add(cb);
      this.events.set(eventName, set);
    }
  };

  /**
   * 取消订阅
   */
  public unsubscribe = (eventName: string, cb: EventHubCallback) => {
    if (this.events.has(eventName)) {
      const set = this.events.get(eventName);
      if (set && set.has(cb)) {
        set.delete(cb);
      }
    }
  };
}
