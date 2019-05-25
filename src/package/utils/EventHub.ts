type EventHubCallback = (data?: any) => void;

/**
 * 用于发布订阅的工具类
 */
export class EventHub {
  private events: Map<string, Set<EventHubCallback>> = new Map();

  /**
   * 发布
   * @param eventName 事件名
   * @param data 载荷
   */
  public emit = (eventName: string, data?: any): void => {
    if (this.events.has(eventName)) {
      this.events.get(eventName)!.forEach(cb => {
        cb(data);
      });
    }
  };

  /**
   * 订阅
   * @param eventName 事件名
   * @param cb 回调
   */
  public subscribe = (eventName: string, cb: EventHubCallback): void => {
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
   * @param eventName 事件名
   * @param cb 回调
   */
  public unsubscribe = (eventName: string, cb: EventHubCallback): void => {
    if (this.events.has(eventName)) {
      const set = this.events.get(eventName);
      if (set && set.has(cb)) {
        set.delete(cb);
      }
    }
  };
}
