/*
 * Flexchat Message
 * --------------
 * element: <flexchat-message message=""></flexchat-message>
 * properties: Message { text: string, uid: string }
 */
export function messageComponent() {
  return {
    bindings: { message: '=' },
    controller: () => {},
    templateUrl: 'message.html'
  }
}
